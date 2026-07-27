function karticaDogadjaja(dogadjaj){
  let naslov = dogadjaj.title[jezik]
  if(!naslov){ naslov = dogadjaj.title.sr }

  let html = ""
  html += '<div class="col-12 col-md-4">'
  html += '  <article class="event-card">'
  html += '    <span class="event-ic"><i class="bi bi-calendar-event"></i></span>'
  html += '    <h3 class="event-title">' + naslov + '</h3>'
  html += '    <button class="event-link" type="button" data-event="' + dogadjaj.id + '">'
  html +=        prevedi("events.more") + ' <i class="bi bi-arrow-right"></i></button>'
  html += '  </article>'
  html += '</div>'
  return html
}

function prikaziDogadjaj(id){
  let dogadjaj = null
  for(let i = 0; i < DATA.events.length; i++){
    if(DATA.events[i].id == id){
      dogadjaj = DATA.events[i]
    }
  }
  if(dogadjaj == null){ return }

  let naslov = dogadjaj.title[jezik] || dogadjaj.title.sr
  let mesto = dogadjaj.location[jezik] || dogadjaj.location.sr
  let mesec = dogadjaj.date.m[jezik] || dogadjaj.date.m.sr
  let kada = dogadjaj.date.d + ". " + mesec
  if(dogadjaj.time){
    kada = kada + " · " + dogadjaj.time
  }
  let opis = ""
  if(dogadjaj.desc){
    opis = dogadjaj.desc[jezik] || dogadjaj.desc.sr
  }

  $("#eventModalTitle").text(naslov)

  let telo = ""
  telo += '<ul class="modal-meta">'
  telo += '  <li><i class="bi bi-calendar-event"></i> <span>' + kada + '</span></li>'
  telo += '  <li><i class="bi bi-geo-alt"></i> <span>' + mesto + '</span></li>'
  telo += '</ul>'
  if(opis){
    telo += '<p class="modal-desc">' + opis + '</p>'
  }
  $("#eventModalBody").html(telo)

  let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("eventModal"))
  modal.show()
}

function karticaPartnera(partner){
  let opis = partner.tag[jezik] || partner.tag.sr
  let spoljni = (partner.url && partner.url != "#")

  let html = ""
  html += '<div class="col-12 col-sm-6 col-lg-3">'
  html += '  <a class="partner-card ac-' + partner.accent + '" href="' + partner.url + '"'
  if(spoljni){
    html += ' target="_blank" rel="noopener"'
  }
  html += '>'
  html += '    <span class="partner-name">' + partner.name
  if(spoljni){
    html += ' <i class="bi bi-box-arrow-up-right"></i>'
  }
  html += '</span>'
  html += '    <span class="partner-tag">' + opis + '</span>'
  html += '  </a>'
  html += '</div>'
  return html
}

function prikaziPocetnu(){
  let htmlDogadjaji = ""
  for(let i = 0; i < DATA.events.length; i++){
    htmlDogadjaji += karticaDogadjaja(DATA.events[i])
  }
  $("#eventsRow").html(htmlDogadjaji)

  let htmlNove = ""
  let brojNovih = 0
  for(let i = 0; i < DATA.games.length; i++){
    if(DATA.games[i].isNew && brojNovih < 4){
      htmlNove += karticaIgreHTML(DATA.games[i])
      brojNovih = brojNovih + 1
    }
  }
  $("#newGamesRow").html(htmlNove)

  let igre = DATA.games.slice()
  igre.sort(function(a, b){
    let pa = prosekOcena(a.id)
    let pb = prosekOcena(b.id)
    if(pb.prosek != pa.prosek){
      return pb.prosek - pa.prosek 
    }
    return pb.broj - pa.broj 
  })
  let htmlTop = ""
  for(let i = 0; i < 3; i++){
    htmlTop += karticaIgreHTML(igre[i], i + 1)
  }
  $("#topRatedRow").html(htmlTop)

  let htmlPartneri = ""
  for(let i = 0; i < DATA.partners.length; i++){
    htmlPartneri += karticaPartnera(DATA.partners[i])
  }
  $("#partnersRow").html(htmlPartneri)
}

$(document).ready(function(){

  ubaciPocetneOcene()      
  pokreniJezik()            
  prikaziPocetnu()           
  azurirajPrikaz = prikaziPocetnu   

  $(document).on("click", "[data-event]", function(){
    prikaziDogadjaj($(this).attr("data-event"))
  })

  $("#newsletterForm").on("submit", function(e){
    e.preventDefault()

    let mejl = $("#newsletterEmail").val()
    if(mejl){ mejl = mejl.trim() }

    let regexMejl = /^\w+@\w+\.\w+$/

    if(regexMejl.test(mejl)){
      $("#newsletterEmail").removeClass("invalid")
      $("#newsletterMsg").removeClass("err").addClass("ok").text(prevedi("news.ok"))
      $("#newsletterEmail").val("")
    } else {
      $("#newsletterEmail").addClass("invalid")
      $("#newsletterMsg").removeClass("ok").addClass("err").text(prevedi("news.err"))
    }
  })

})
