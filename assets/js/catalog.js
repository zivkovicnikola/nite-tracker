function grupaIzSlug(slug){
  if(slug == "porodicne"){ return "family" }
  if(slug == "strateske"){ return "strategy" }
  if(slug == "zabavne"){ return "party" }
  return null
}
function slugIzGrupe(grupa){
  if(grupa == "family"){ return "porodicne" }
  if(grupa == "strategy"){ return "strateske" }
  if(grupa == "party"){ return "zabavne" }
  return "all"
}

var izabranaGrupa = null   
var pojamPretrage = ""
var nacinSortiranja = "az"
var cenovniOpseg = "all"

function napraviListu(){
  let lista = []

  for(let i = 0; i < DATA.games.length; i++){
    let igra = DATA.games[i]

    if(izabranaGrupa != null && igra.group != izabranaGrupa){
      continue
    }
    
    if(pojamPretrage != ""){
      let naziv = igra.name.toLowerCase()
      if(naziv.indexOf(pojamPretrage.toLowerCase()) == -1){
        continue
      }
    }

    if(cenovniOpseg != "all"){
      let delovi = cenovniOpseg.split("-")
      let min = parseInt(delovi[0]), max = parseInt(delovi[1])
      if(igra.price < min || igra.price > max){ continue }
    }

    lista.push(igra)
  }

 
  lista.sort(function(a, b){
    if(nacinSortiranja == "za"){
      return b.name.localeCompare(a.name)
    }
    if(nacinSortiranja == "priceAsc"){
      return a.price - b.price
    }
    if(nacinSortiranja == "priceDesc"){
      return b.price - a.price
    }
    if(nacinSortiranja == "rating"){
      let pa = prosekOcena(a.id)
      let pb = prosekOcena(b.id)
      if(pb.prosek != pa.prosek){
        return pb.prosek - pa.prosek
      }
      return pb.broj - pa.broj
    }
    if(nacinSortiranja == "ratingDown"){
      let pa = prosekOcena(a.id)
      let pb = prosekOcena(b.id)
      if(pb.prosek != pa.prosek){
        return pa.prosek - pb.prosek
      }
      return pa.broj - pb.broj
    }
    
    return a.name.localeCompare(b.name)
  })

  return lista
}


function prikaziKatalog(){
  let lista = napraviListu()

  if(lista.length == 0){
    $("#catalogGrid").html("")
    $("#catalogEmpty").prop("hidden", false)
    return
  }
  $("#catalogEmpty").prop("hidden", true)

  let html = ""
  for(let i = 0; i < lista.length; i++){
    html += karticaIgreHTML(lista[i])
  }
  $("#catalogGrid").html(html)
}

function prikaziZaglavlje(){
  if(izabranaGrupa != null){
    $("#catalogTitle").text(prevedi("nav.catalog." + izabranaGrupa))
    $("#catalogSub").text(prevedi("catalog.subGroup"))
  } else {
    $("#catalogTitle").text(prevedi("catalog.all"))
    $("#catalogSub").text(prevedi("catalog.sub"))
  }

  let putanja = ""
  putanja += '<li class="breadcrumb-item"><a href="index.html">' + prevedi("bc.home") + '</a></li>'
  if(izabranaGrupa != null){
    putanja += '<li class="breadcrumb-item"><a href="katalog.html">' + prevedi("nav.catalog") + '</a></li>'
    putanja += '<li class="breadcrumb-item active" aria-current="page">' + prevedi("nav.catalog." + izabranaGrupa) + '</li>'
  } else {
    putanja += '<li class="breadcrumb-item active" aria-current="page">' + prevedi("nav.catalog") + '</li>'
  }
  $("#breadcrumb").html(putanja)
}

function prikaziSveKatalog(){
  prikaziZaglavlje()
  prikaziKatalog()
}

function preuzmiKatalogPdf(){
  if(!window.jspdf || !window.jspdf.jsPDF || !window.NT_FONTS){
    if(jezik == "en"){
      alert("The PDF library is still loading — please try again in a moment.")
    } else {
      alert("PDF biblioteka se jos ucitava — pokusaj ponovo za trenutak.")
    }
    return
  }

  let doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" })

  doc.addFileToVFS("DejaVuSans.ttf", window.NT_FONTS.regular)
  doc.addFont("DejaVuSans.ttf", "DejaVu", "normal")
  doc.addFileToVFS("DejaVuSans-Bold.ttf", window.NT_FONTS.bold)
  doc.addFont("DejaVuSans-Bold.ttf", "DejaVu", "bold")
  doc.setFont("DejaVu", "normal")

  let sirina = doc.internal.pageSize.getWidth()
  let visina = doc.internal.pageSize.getHeight()
  let leva = 40
  let desna = sirina - 40

  let datum = ""
  if(jezik == "en"){
    datum = new Date().toLocaleDateString("en-GB")
  } else {
    datum = new Date().toLocaleDateString("sr-RS")
  }

  doc.setFont("DejaVu", "bold"); doc.setFontSize(20); doc.setTextColor(20, 28, 46)
  doc.text("NITE-TRACKER", leva, 50)
  doc.setFont("DejaVu", "normal"); doc.setFontSize(8); doc.setTextColor(120, 134, 160)
  doc.text("BOARDGAMES ENTERTAINMENT", leva, 63)
  doc.setFontSize(9); doc.setTextColor(90, 100, 120)
  doc.text(prevedi("nav.catalog"), desna, 46, { align: "right" })
  doc.text(datum, desna, 58, { align: "right" })
  doc.setDrawColor(245, 137, 31); doc.setLineWidth(2); doc.line(leva, 73, desna, 73)

  doc.setFont("DejaVu", "bold"); doc.setFontSize(15); doc.setTextColor(20, 28, 46)
  doc.text(prevedi("catalog.all"), leva, 95)
  doc.setFont("DejaVu", "normal"); doc.setFontSize(9); doc.setTextColor(110, 120, 140)
  doc.text(DATA.games.length + " " + prevedi("common.games"), leva, 109)

  let grupe = [
    { kljuc: "family",   boja: [67, 194, 103] },
    { kljuc: "strategy", boja: [61, 123, 240] },
    { kljuc: "party",    boja: [245, 137, 31] }
  ]
  let zaglavljeTabele = [[
    prevedi("pdf.name"), prevedi("pdf.players"), prevedi("pdf.age"),
    prevedi("pdf.time"), prevedi("game.price"), prevedi("pdf.rating")
  ]]

  let y = 128
  for(let g = 0; g < grupe.length; g++){
    let grupa = grupe[g]

    let igreGrupe = []
    for(let i = 0; i < DATA.games.length; i++){
      if(DATA.games[i].group == grupa.kljuc){
        igreGrupe.push(DATA.games[i])
      }
    }
    igreGrupe.sort(function(a, b){ return a.name.localeCompare(b.name) })
    if(igreGrupe.length == 0){ continue }

    doc.setFont("DejaVu", "bold"); doc.setFontSize(12)
    doc.setTextColor(grupa.boja[0], grupa.boja[1], grupa.boja[2])
    doc.text(prevedi("nav.catalog." + grupa.kljuc) + "  (" + igreGrupe.length + ")", leva, y)

    let redovi = []
    for(let i = 0; i < igreGrupe.length; i++){
      let igra = igreGrupe[i]
      let podaci = prosekOcena(igra.id)
      let ocena = "–"
      if(podaci.broj > 0){
        ocena = podaci.prosek.toFixed(1)
      }
      redovi.push([
        igra.name,
        "" + igra.players,
        "" + igra.age,
        igra.time + " " + prevedi("card.min"),
        formatCena(igra.price),
        ocena
      ])
    }

    doc.autoTable({
      head: zaglavljeTabele,
      body: redovi,
      startY: y + 8,
      margin: { left: leva, right: 40 },
      theme: "grid",
      styles: { font: "DejaVu", fontSize: 9, cellPadding: 5, lineColor: [228, 232, 240], lineWidth: 0.5, textColor: [33, 41, 64] },
      headStyles: { font: "DejaVu", fontStyle: "bold", fillColor: [22, 32, 58], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [247, 248, 251] },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 170 },
        1: { halign: "center" }, 2: { halign: "center" },
        3: { halign: "center" }, 4: { halign: "right" }, 5: { halign: "center" }
      }
    })

    y = doc.lastAutoTable.finalY + 26   
  }

  let brojStrana = doc.internal.getNumberOfPages()
  for(let i = 1; i <= brojStrana; i++){
    doc.setPage(i)
    doc.setFont("DejaVu", "normal"); doc.setFontSize(8); doc.setTextColor(150, 158, 175)
    doc.text("© 2026 NITE-TRACKER — Boardgames Entertainment", leva, visina - 24)
    doc.text(i + " / " + brojStrana, desna, visina - 24, { align: "right" })
  }

  doc.save("NITE-TRACKER-katalog.pdf")
}

$(document).ready(function(){

  ubaciPocetneOcene()
  ubaciPocetneKomentare()

  let slug = uzmiParametar("grupa")
  izabranaGrupa = grupaIzSlug(slug)
  let q = uzmiParametar("q")
  if(q != null){ pojamPretrage = q.trim() }

  $("#catalogSearch").val(pojamPretrage)
  $("#filterGroup").val(izabranaGrupa ? slugIzGrupe(izabranaGrupa) : "all")
  $("#sortBy").val(nacinSortiranja)

  pokreniJezik()
  prikaziSveKatalog()
  azurirajPrikaz = prikaziSveKatalog

  $("#sortBy").on("change", function(){
    nacinSortiranja = $(this).val()
    prikaziKatalog()
  })

  $("#filterGroup").on("change", function(){
    let v = $(this).val()
    if(v == "all"){
      window.location.href = "katalog.html"
    } else {
      window.location.href = "katalog.html?grupa=" + v
    }
  })

  $("#catalogSearch").on("input", function(){
    pojamPretrage = $(this).val().trim()
    prikaziKatalog()
  })

  $("#downloadCatalog").on("click", preuzmiKatalogPdf)

  $("#priceRange").on("change", function() {
    cenovniOpseg = $(this).val()
    prikaziKatalog()
  })

})
