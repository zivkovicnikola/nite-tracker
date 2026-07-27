import math
import os
import time
import urllib.request

LAT = 44.8053
LON = 20.4793

POLUPRECNIK_M = 750

NIVOI = [14, 15, 16, 17, 18]

IZLAZ = os.path.join("assets", "vendor", "map-tiles")

ZAGLAVLJE = {"User-Agent": "NITE-TRACKER-studentski-projekat/1.0"}

def koord_u_plocicu(lat, lon, z):
    """Pretvori geografske koordinate u broj pločice (x, y) za dati zum z."""
    n = 2 ** z
    x = int((lon + 180.0) / 360.0 * n)
    lat_rad = math.radians(lat)
    y = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
    return x, y


def main():
    d_lat = POLUPRECNIK_M / 111320.0
    d_lon = POLUPRECNIK_M / (111320.0 * math.cos(math.radians(LAT)))
    lat_min = LAT - d_lat
    lat_max = LAT + d_lat
    lon_min = LON - d_lon
    lon_max = LON + d_lon

    ukupno = 0
    preuzeto = 0
    greske = 0

    for z in NIVOI:
        x1, y1 = koord_u_plocicu(lat_max, lon_min, z)
        x2, y2 = koord_u_plocicu(lat_min, lon_max, z)
        x_od, x_do = min(x1, x2), max(x1, x2)
        y_od, y_do = min(y1, y2), max(y1, y2)

        for x in range(x_od, x_do + 1):
            for y in range(y_od, y_do + 1):
                ukupno += 1
                folder = os.path.join(IZLAZ, str(z), str(x))
                if not os.path.exists(folder):
                    os.makedirs(folder)
                putanja = os.path.join(folder, str(y) + ".png")

                if os.path.exists(putanja):
                    continue

                url = "https://tile.openstreetmap.org/" + str(z) + "/" + str(x) + "/" + str(y) + ".png"
                zahtev = urllib.request.Request(url, headers=ZAGLAVLJE)
                try:
                    odgovor = urllib.request.urlopen(zahtev, timeout=20)
                    podaci = odgovor.read()
                    izlazni_fajl = open(putanja, "wb")
                    izlazni_fajl.write(podaci)
                    izlazni_fajl.close()
                    preuzeto += 1
                    print("OK   z=" + str(z) + " x=" + str(x) + " y=" + str(y))
                    time.sleep(0.1)   
                except Exception as e:
                    greske += 1
                    print("GRESKA z=" + str(z) + " x=" + str(x) + " y=" + str(y) + "  (" + str(e) + ")")

    print("")
    print("Gotovo!")
    print("Ukupno pločica:", ukupno, " | novo preuzeto:", preuzeto, " | greske:", greske)
    if greske == 0:
        print("Mapa sada radi i bez interneta. ")
    else:
        print("Neke pločice nisu preuzete — pokreni skriptu ponovo (preuzece samo te koje fale).")


if __name__ == "__main__":
    main()
