function ocistiTekst(tekst){
  tekst = "" + tekst
  tekst = tekst.split("&").join("&amp;")
  tekst = tekst.split("<").join("&lt;")
  tekst = tekst.split(">").join("&gt;")
  return tekst
}

var igra = null

var mojaOcena = 0

function prikaziProsek(){
  let podaci = prosekOcena(igra.id)
  $("#gameStars").html(zvezdiceHTML(podaci.prosek))
  if(podaci.broj > 0){
    $("#gameAvg").text(podaci.prosek.toFixed(1))
  } else {
    $("#gameAvg").text("–")
  }
  $("#gameRatingMeta").text("(" + podaci.broj + " " + prevedi("game.reviews") + ")")
}

function napraviZvezdiceZaOcenu(){
  let html = ""
  for(let v = 1; v <= 5; v++){
    html += '<button type="button" class="rate-star" data-val="' + v + '"><i class="bi bi-star"></i></button>'
  }
  $("#rateStars").html(html)
  obojiZvezdice(mojaOcena)
}

function obojiZvezdice(n){
  $("#rateStars .rate-star").each(function(){
    let v = parseInt($(this).attr("data-val"), 10)
    if(v <= n){
      $(this).addClass("on")
      $(this).find("i").attr("class", "bi bi-star-fill")
    } else {
      $(this).removeClass("on")
      $(this).find("i").attr("class", "bi bi-star")
    }
  })
}

function formatDatum(ts){
  let d = new Date(ts)
  if(jezik == "en"){
    return d.toLocaleDateString("en-GB")
  }
  return d.toLocaleDateString("sr-RS")
}

function prikaziKomentare(){
  let lista = dohvatiKomentare(igra.id)
  $("#commentCount").text(lista.length)

  if(lista.length == 0){
    $("#commentList").html('<li class="comment-empty">' + prevedi("game.noComments") + '</li>')
    return
  }

  let html = ""
  for(let i = 0; i < lista.length; i++){
    let k = lista[i]
    let ime = k.ime
    if(!ime || ime.trim() == ""){
      ime = prevedi("game.commentAnon")
    }
    html += '<li class="comment-item">'
    html += '  <div class="comment-head">'
    html += '    <span class="comment-author">' + ocistiTekst(ime) + '</span>'
    html += '    <span class="comment-date">' + formatDatum(k.ts) + '</span>'
    html += '  </div>'
    html += '  <p class="comment-body">' + ocistiTekst(k.tekst) + '</p>'
    html += '</li>'
  }
  $("#commentList").html(html)
}

function prikaziLokalizovano(){
  $("#gameGroupTag").attr("class", "grp-tag grp-" + igra.group).text(prevedi("grp." + igra.group))
  $("#specGroup").text(prevedi("grp." + igra.group))
  $("#specTime").text(igra.time + " " + prevedi("card.min"))

  let opis = igra.desc[jezik]
  if(!opis){ opis = igra.desc.sr }
  $("#gameDesc").text(opis)

  prikaziProsek()
  prikaziKomentare()

  let putanja = ""
  putanja += '<li class="breadcrumb-item"><a href="index.html">' + prevedi("bc.home") + '</a></li>'
  putanja += '<li class="breadcrumb-item"><a href="katalog.html">' + prevedi("nav.catalog") + '</a></li>'
  putanja += '<li class="breadcrumb-item"><a href="katalog.html?grupa=' + slugIzGrupe(igra.group) + '">' + prevedi("nav.catalog." + igra.group) + '</a></li>'
  putanja += '<li class="breadcrumb-item active" aria-current="page">' + ocistiTekst(igra.name) + '</li>'
  $("#breadcrumb").html(putanja)

  document.title = "NITE-TRACKER | " + igra.name

  if(mojaOcena > 0){
    $("#rateHint").text(prevedi("game.rated"))
  } else {
    $("#rateHint").text(prevedi("game.rateHint"))
  }
}

function slugIzGrupe(grupa){
  if(grupa == "family"){ return "porodicne" }
  if(grupa == "strategy"){ return "strateske" }
  if(grupa == "party"){ return "zabavne" }
  return "all"
}

$(document).ready(function(){

  ubaciPocetneOcene()
  ubaciPocetneKomentare()
  pokreniJezik()

  let id = $("body").attr("data-game-id")
  if(!id){
    id = uzmiParametar("id") 
  }
  igra = nadjiIgru(id)

  if(igra == null){
    $("#gameDetail").prop("hidden", true)
    $("#gameNotFound").prop("hidden", false)
    return
  }

  $("#gameDetail").prop("hidden", false)
  $("#gameName").text(igra.name)

  $("#gameCover").html('<img class="cover-photo" src="assets/img/games/' + igra.id + '.jpg" alt="' + igra.name + '">')

  $("#gamePrice").text(formatCena(igra.price))
  $("#specPlayers").text(igra.players)
  $("#specAge").text(igra.age)

  napraviZvezdiceZaOcenu()
  prikaziLokalizovano()
  azurirajPrikaz = prikaziLokalizovano

  $("#rateStars").on("mouseenter", ".rate-star", function(){
    obojiZvezdice(parseInt($(this).attr("data-val"), 10))
  })

  $("#rateStars").on("mouseleave", function(){
    obojiZvezdice(mojaOcena)
  })

  $("#rateStars").on("click", ".rate-star", function(){
    let v = parseInt($(this).attr("data-val"), 10)
    dodajOcenu(igra.id, v)
    mojaOcena = v
    obojiZvezdice(v)
    prikaziProsek()
    $("#rateHint").text(prevedi("game.rated"))
  })
 
  $("#addToCartBtn").on("click", function(){
    dodajUKorpu(igra.id, 1)
    osveziKorpu()
    let dugme = $(this)
    dugme.addClass("added")
    dugme.html('<i class="bi bi-check2"></i> ' + prevedi("card.added"))
    setTimeout(function(){
      dugme.removeClass("added")
      dugme.html('<i class="bi bi-bag-plus"></i> ' + prevedi("card.add"))
    }, 1200)
  })

  $("#commentForm").on("submit", function(e){
    e.preventDefault()
    let ime = $("#commentName").val().trim()
    let tekst = $("#commentText").val().trim()

    if(tekst == ""){
      $("#commentMsg").addClass("err").text(prevedi("game.commentErr"))
      return
    }
    $("#commentMsg").removeClass("err").text("")
    dodajKomentar(igra.id, ime, tekst)
    $("#commentText").val("")
    prikaziKomentare()
  })

})
