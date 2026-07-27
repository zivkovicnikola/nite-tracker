var PRODAVNICA_LAT = 44.8053
var PRODAVNICA_LNG = 20.4793

function napraviMapu(){
  if(document.getElementById("map") == null){ return }
  if(window.L == undefined){ return }

  var mapa = L.map("map", {
    center: [PRODAVNICA_LAT, PRODAVNICA_LNG],
    zoom: 16,
    minZoom: 14,
    maxZoom: 18,
    scrollWheelZoom: false   
  })

  L.tileLayer("assets/vendor/map-tiles/{z}/{x}/{y}.png", {
    minZoom: 14,
    maxZoom: 18,
    errorTileUrl: "assets/vendor/map-tiles/placeholder.png",
    attribution: "&copy; OpenStreetMap"
  }).addTo(mapa)

  var ikona = L.divIcon({
    className: "map-pin",
    html: '<i class="bi bi-geo-alt-fill"></i>',
    iconSize: [40, 40],
    iconAnchor: [20, 38],
    popupAnchor: [0, -34]
  })

  var adresa = prevedi("footer.addr")
  L.marker([PRODAVNICA_LAT, PRODAVNICA_LNG], { icon: ikona })
    .addTo(mapa)
    .bindPopup("<b>NITE-TRACKER</b><br>" + adresa)

  mapa.on("click", function(){ mapa.scrollWheelZoom.enable() })
  mapa.on("mouseout", function(){ mapa.scrollWheelZoom.disable() })
}


$(document).ready(function(){

  pokreniJezik()

  $("#factGames").text(DATA.games.length)

  napraviMapu()

})
