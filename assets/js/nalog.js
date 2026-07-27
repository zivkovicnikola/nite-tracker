function prikaziKorpu(){
  let korpa = dohvatiKorpu()

  let idevi = []
  for(let id in korpa){
    if(nadjiIgru(id) != null){
      idevi.push(id)
    }
  }

  if(idevi.length == 0){
    $("#cartFull").prop("hidden", true)
    $("#cartEmpty").prop("hidden", false)
    return
  }
  $("#cartEmpty").prop("hidden", true)
  $("#cartFull").prop("hidden", false)

  let ukupno = 0
  let html = ""
  for(let i = 0; i < idevi.length; i++){
    let id = idevi[i]
    let igra = nadjiIgru(id)
    let kolicina = korpa[id]
    let cenaStavke = igra.price * kolicina
    ukupno = ukupno + cenaStavke

    html += '<div class="cart-row" data-id="' + igra.id + '">'
    html += '  <a class="cart-cover grp-' + igra.group + '" href="' + urlIgre(igra.id) + '"><i class="bi bi-dice-5"></i></a>'
    html += '  <div class="cart-info">'
    html += '    <a class="cart-name" href="' + urlIgre(igra.id) + '">' + igra.name + '</a>'
    html += '    <span class="grp-tag grp-' + igra.group + '">' + prevedi("grp." + igra.group) + '</span>'
    html += '    <span class="cart-unit">' + formatCena(igra.price) + '</span>'
    html += '  </div>'
    html += '  <div class="cart-qty">'
    html += '    <button class="qty-btn" type="button" data-act="dec" data-id="' + igra.id + '">&minus;</button>'
    html += '    <input class="qty-input" type="text" value="' + kolicina + '" data-id="' + igra.id + '">'
    html += '    <button class="qty-btn" type="button" data-act="inc" data-id="' + igra.id + '">+</button>'
    html += '  </div>'
    html += '  <span class="cart-line">' + formatCena(cenaStavke) + '</span>'
    html += '  <button class="cart-remove" type="button" data-act="remove" data-id="' + igra.id + '"><i class="bi bi-trash3"></i></button>'
    html += '</div>'
  }

  $("#cartList").html(html)
  $("#cartTotal").text(formatCena(ukupno))
}

function formatDatumVreme(ts){
  let d = new Date(ts)
  let lokal = "sr-RS"
  if(jezik == "en"){ lokal = "en-GB" }
  return d.toLocaleDateString(lokal) + " · " + d.toLocaleTimeString(lokal, { hour: "2-digit", minute: "2-digit" })
}

function prikaziPorudzbine(){
  let porudzbine = dohvatiPorudzbine()

  if(porudzbine.length == 0){
    $("#ordersEmpty").prop("hidden", false)
    $("#ordersList").html("")
    return
  }
  $("#ordersEmpty").prop("hidden", true)

  let html = ""
  for(let i = 0; i < porudzbine.length; i++){
    let p = porudzbine[i]

    let broj = "" + p.no
    while(broj.length < 4){ broj = "0" + broj }

    let stavke = ""
    for(let j = 0; j < p.items.length; j++){
      let s = p.items[j]
      stavke += '<li><span class="oi-name">' + s.name + ' <span class="oi-qty">&times; ' + s.qty + '</span></span>'
      stavke += '<span class="oi-price">' + formatCena(s.price * s.qty) + '</span></li>'
    }

    html += '<article class="order-card">'
    html += '  <div class="order-head">'
    html += '    <span class="order-no">' + prevedi("account.order") + ' #' + broj + '</span>'
    html += '    <span class="order-date">' + formatDatumVreme(p.ts) + '</span>'
    html += '  </div>'
    html += '  <ul class="order-items">' + stavke + '</ul>'
    html += '  <div class="order-foot">'
    html += '    <span class="order-foot-label">' + prevedi("account.orderTotal") + '</span>'
    html += '    <span class="order-total">' + formatCena(p.total) + '</span>'
    html += '  </div>'
    html += '</article>'
  }

  $("#ordersList").html(html)
}

function prikaziNalog(){
  prikaziKorpu()
  prikaziPorudzbine()
}

$(document).ready(function(){

  pokreniJezik()
  prikaziNalog()
  azurirajPrikaz = prikaziNalog

  $("#cartList").on("click", ".qty-btn, .cart-remove", function(){
    let id = $(this).attr("data-id")
    let akcija = $(this).attr("data-act")
    let trenutno = dohvatiKorpu()[id]
    if(trenutno == null){ trenutno = 0 }

    if(akcija == "inc"){
      postaviKolicinu(id, trenutno + 1)
    } else if(akcija == "dec"){
      postaviKolicinu(id, trenutno - 1)
    } else if(akcija == "remove"){
      izbaciIzKorpe(id)
    }

    osveziKorpu()
    prikaziKorpu()
  })

  $("#cartList").on("change", ".qty-input", function(){
    let id = $(this).attr("data-id")
    let unos = $(this).val()

    let samoCifre = unos.replace(/[^0-9]/g, "")
    let broj = parseInt(samoCifre, 10)

    if(isNaN(broj)){
      broj = dohvatiKorpu()[id]
      if(broj == null){ broj = 1 }
    }
    postaviKolicinu(id, broj)   
    osveziKorpu()
    prikaziKorpu()
  })

  $("#checkoutBtn").on("click", function(){
    let porudzbina = zavrsiKupovinu()
    if(porudzbina == null){ return }

    osveziKorpu()
    prikaziKorpu()       
    prikaziPorudzbine()  

    $("#checkoutMsg").html('<i class="bi bi-check-circle-fill"></i> ' + prevedi("account.checkoutDone"))
    $("#checkoutMsg").prop("hidden", false)

    setTimeout(function(){
      $("#checkoutMsg").prop("hidden", true)
    }, 6000)
  })

})
