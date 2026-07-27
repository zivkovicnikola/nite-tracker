var FOLDER_SLIKA = "assets/img/gallery/"

var SLIKE_PRODAVNICE = []
for(let i = 1; i <= 9; i++){
  SLIKE_PRODAVNICE.push("prodavnica-" + i + ".jpg")
}

var FOTKE_IGARA = [
  { fajl: "foto-catan.jpg",             naziv: "Catan" },
  { fajl: "foto-terraforming-mars.jpg", naziv: "Terraforming Mars" },
  { fajl: "foto-codenames.jpg",         naziv: "Codenames" },
  { fajl: "foto-exploding-kittens.jpg", naziv: "Exploding Kittens" },
  { fajl: "foto-telestrations.jpg",     naziv: "Telestrations" },
  { fajl: "foto-ticket-to-ride.jpg",    naziv: "Ticket to Ride" },
  { fajl: "foto-carcassonne.jpg",       naziv: "Carcassonne" },
  { fajl: "foto-scythe.jpg",            naziv: "Scythe" },
  { fajl: "foto-dixit.jpg",             naziv: "Dixit" }
]

var VIDEI = [
  { id: "E6bkz02rl1Q", slicica: "foto-catan.jpg",          kljucNaslova: "gallery.vidCatan" },
  { id: "x9TqnCN5c8w", slicica: "foto-ticket-to-ride.jpg", kljucNaslova: "gallery.vidTtr" },
  { id: "sy0AnMDcap0", slicica: "foto-codenames.jpg",      kljucNaslova: "gallery.vidCodenames" },
  { id: "R1qh-lhxy9s", slicica: "foto-carcassonne.jpg",    kljucNaslova: "gallery.vidCarcassonne" }
]


function plocicaSlike(fajl, opis, naslov){
  let html = ""
  html += '<button type="button" class="gitem" data-full="' + FOLDER_SLIKA + fajl + '" data-cap="' + naslov + '">'
  html += '  <img loading="lazy" src="' + FOLDER_SLIKA + fajl + '" alt="' + opis + '">'
  html += '</button>'
  return html
}

function prikaziProdavnicu(){
  let oznaka = prevedi("nav.gallery.store")
  let html = ""
  for(let i = 0; i < SLIKE_PRODAVNICE.length; i++){
    html += plocicaSlike(SLIKE_PRODAVNICE[i], "NITE-TRACKER — " + oznaka + " " + (i + 1), "")
  }
  $("#storeGrid").html(html)
}

function prikaziIgre(){
  let html = ""
  for(let i = 0; i < FOTKE_IGARA.length; i++){
    let f = FOTKE_IGARA[i]
    html += plocicaSlike(f.fajl, f.naziv, f.naziv)
  }
  $("#gamesGrid").html(html)
}

function prikaziVideo(){
  let html = ""
  for(let i = 0; i < VIDEI.length; i++){
    let v = VIDEI[i]
    let naslov = prevedi(v.kljucNaslova)
    html += '<a class="vitem" href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener">'
    html += '  <span class="vthumb">'
    html += '    <img loading="lazy" src="' + FOLDER_SLIKA + v.slicica + '" alt="' + naslov + '">'
    html += '    <span class="vplay"><i class="bi bi-play-fill"></i></span>'
    html += '  </span>'
    html += '  <span class="vtitle">' + naslov + '</span>'
    html += '</a>'
  }
  $("#videoGrid").html(html)
}

function prikaziGaleriju(){
  prikaziProdavnicu()
  prikaziIgre()
  prikaziVideo()
}

$(document).ready(function(){

  pokreniJezik()
  prikaziGaleriju()
  azurirajPrikaz = prikaziGaleriju

  $(document).on("click", ".gitem", function(){
    let puna = $(this).attr("data-full")
    let opis = $(this).attr("data-cap")
    $("#lightboxImg").attr("src", puna).attr("alt", opis)
    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("lightboxModal"))
    modal.show()
  })

})
