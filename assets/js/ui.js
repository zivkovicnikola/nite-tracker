function nadjiIgru(id){
  for(let i = 0; i < DATA.games.length; i++){
    if(DATA.games[i].id == id){
      return DATA.games[i]
    }
  }
  return null
}

function urlIgre(id){
  return "igra-" + id + ".html"
}

function uzmiParametar(ime){
  let pretraga = window.location.search  
  if(pretraga.length > 1){
    pretraga = pretraga.substring(1)      
    let parovi = pretraga.split("&")      
    for(let i = 0; i < parovi.length; i++){
      let par = parovi[i].split("=")      
      if(par[0] == ime){
        return decodeURIComponent(par[1].split("+").join(" "))
      }
    }
  }
  return null
}

function formatCena(iznos){
  let tekst = "" + iznos
  let rezultat = ""
  let brojac = 0
  for(let i = tekst.length - 1; i >= 0; i--){
    rezultat = tekst.charAt(i) + rezultat
    brojac = brojac + 1
    if(brojac % 3 == 0 && i > 0){
      rezultat = "." + rezultat
    }
  }
  if(jezik == "en"){
    rezultat = rezultat.split(".").join(",")
    return rezultat + " RSD"
  }
  return rezultat + " din"
}

function zvezdiceHTML(prosek){
  let zaokruzeno = Math.round(prosek)
  let html = '<span class="stars" aria-hidden="true">'
  for(let i = 1; i <= 5; i++){
    if(i <= zaokruzeno){
      html += '<i class="bi bi-star-fill"></i>'
    } else {
      html += '<i class="bi bi-star empty"></i>'
    }
  }
  html += '</span>'
  return html
}

function karticaIgreHTML(igra, rang){
  let podaci = prosekOcena(igra.id)
  let grupaTekst = prevedi("grp." + igra.group)

  let znakNovo = ""
  if(igra.isNew){
    znakNovo = '<span class="badge-new">' + prevedi("badge.new") + '</span>'
  }

  let znakRang = ""
  let dodatnaKlasa = ""
  if(rang){
    znakRang = '<span class="rank rank-' + rang + '">' + rang + '</span>'
    dodatnaKlasa = " top-card"
    if(rang == 1){
      dodatnaKlasa += " is-1"
    }
  }

  let ocenaTekst = "&ndash;"
  if(podaci.broj > 0){
    ocenaTekst = podaci.prosek.toFixed(1) + ' <span class="rev">(' + podaci.broj + ')</span>'
  }

  let html = ""
  html += '<div class="col-12 col-sm-6 col-lg-3">'
  html += '  <article class="game-card' + dodatnaKlasa + '">'
  html += znakRang
  html += '    <a class="game-cover grp-' + igra.group + '" href="' + urlIgre(igra.id) + '">'
  html += '      <span class="cover-title">' + igra.name + '</span>' + znakNovo
  html += '    </a>'
  html += '    <div class="game-body">'
  html += '      <span class="grp-tag grp-' + igra.group + '">' + grupaTekst + '</span>'
  html += '      <h3 class="game-name"><a href="' + urlIgre(igra.id) + '">' + igra.name + '</a></h3>'
  html += '      <div class="rating">' + zvezdiceHTML(podaci.prosek) + ' <span class="rating-num">' + ocenaTekst + '</span></div>'
  html += '      <ul class="stats">'
  html += '        <li><i class="bi bi-people"></i><span class="num">' + igra.players + '</span></li>'
  html += '        <li><i class="bi bi-person"></i><span class="num">' + igra.age + '</span></li>'
  html += '        <li><i class="bi bi-clock"></i><span class="num">' + igra.time + '</span> ' + prevedi("card.min") + '</li>'
  html += '      </ul>'
  html += '      <div class="game-foot">'
  html += '        <span class="price">' + formatCena(igra.price) + '</span>'
  html += '        <button class="btn-add" type="button" data-add="' + igra.id + '">' + prevedi("card.add") + '</button>'
  html += '      </div>'
  html += '    </div>'
  html += '  </article>'
  html += '</div>'
  return html
}

function osveziKorpu(){
  $("#cartCount").text(brojUKorpi())
}

$(document).ready(function(){

  osveziKorpu()

  $(document).on("click", "[data-add]", function(){
    let id = $(this).attr("data-add")
    dodajUKorpu(id, 1)
    osveziKorpu()

    let dugme = $(this)
    let stariTekst = prevedi("card.add")
    dugme.addClass("added")
    dugme.html('<i class="bi bi-check2"></i> ' + prevedi("card.added"))
    setTimeout(function(){
      dugme.removeClass("added")
      dugme.text(stariTekst)
    }, 1200)
  })

  $("#searchForm").on("submit", function(e){
    e.preventDefault()
    let pojam = $("#searchInput").val()
    if(pojam){
      pojam = pojam.trim()
    }
    if(pojam){
      window.location.href = "katalog.html?q=" + encodeURIComponent(pojam)
    } else {
      window.location.href = "katalog.html"
    }
  })

})
