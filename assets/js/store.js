function ntUcitaj(kljuc){
  if(localStorage.getItem(kljuc) == null){
    return null
  }
  return JSON.parse(localStorage.getItem(kljuc))
}

function ntUpisi(kljuc, vrednost){
  localStorage.setItem(kljuc, JSON.stringify(vrednost))
}

function dohvatiKorpu(){
  let korpa = ntUcitaj("nt_cart")
  if(korpa == null){
    korpa = {}
  }
  return korpa
}

function brojUKorpi(){
  let korpa = dohvatiKorpu()
  let ukupno = 0
  for(let id in korpa){
    ukupno = ukupno + korpa[id]
  }
  return ukupno
}

function dodajUKorpu(id, kolicina){
  if(!kolicina){ kolicina = 1 }
  let korpa = dohvatiKorpu()
  if(korpa[id] == null){
    korpa[id] = 0
  }
  korpa[id] = korpa[id] + kolicina
  ntUpisi("nt_cart", korpa)
}

function postaviKolicinu(id, kolicina){
  let korpa = dohvatiKorpu()
  if(kolicina <= 0){
    delete korpa[id]
  } else {
    korpa[id] = kolicina
  }
  ntUpisi("nt_cart", korpa)
}

function izbaciIzKorpe(id){
  postaviKolicinu(id, 0)
}

function dohvatiOcene(){
  let ocene = ntUcitaj("nt_ratings")
  if(ocene == null){
    ocene = {}
  }
  return ocene
}

function dodajOcenu(id, vrednost){
  let ocene = dohvatiOcene()
  if(ocene[id] == null){
    ocene[id] = []
  }
  ocene[id].push(vrednost)
  ntUpisi("nt_ratings", ocene)
}

function ubaciPocetneOcene(){
  let ocene = dohvatiOcene()

  let imaNesto = false
  for(let id in ocene){
    imaNesto = true
  }
  if(imaNesto){
    return
  }

  for(let i = 0; i < DATA.games.length; i++){
    let igra = DATA.games[i]
    if(igra.baseRatings){
      ocene[igra.id] = igra.baseRatings.slice()
    } else {
      ocene[igra.id] = []
    }
  }
  ntUpisi("nt_ratings", ocene)
}

function prosekOcena(id){
  let ocene = dohvatiOcene()
  let niz = ocene[id]
  if(niz == null || niz.length == 0){
    return { prosek: 0, broj: 0 }
  }
  let zbir = 0
  for(let i = 0; i < niz.length; i++){
    zbir = zbir + niz[i]
  }
  return { prosek: zbir / niz.length, broj: niz.length }
}

function dohvatiKomentare(id){
  let svi = ntUcitaj("nt_comments")
  if(svi == null){ svi = {} }

  let niz = svi[id]
  if(niz == null){
    return []
  }
  niz = niz.slice()   
  niz.sort(function(a, b){
    return b.ts - a.ts
  })
  return niz
}

function dodajKomentar(id, ime, tekst){
  let svi = ntUcitaj("nt_comments")
  if(svi == null){ svi = {} }
  if(svi[id] == null){ svi[id] = [] }

  svi[id].push({ ime: ime, tekst: tekst, ts: Date.now() })
  ntUpisi("nt_comments", svi)
}

function ubaciPocetneKomentare(){
  let svi = ntUcitaj("nt_comments")
  if(svi != null){
    return   
  }

  svi = {}
  let pre7Dana = Date.now() - 1000 * 60 * 60 * 24 * 7
  for(let i = 0; i < DATA.games.length; i++){
    let igra = DATA.games[i]
    if(igra.baseComments){
      svi[igra.id] = []
      for(let j = 0; j < igra.baseComments.length; j++){
        let k = igra.baseComments[j]
        svi[igra.id].push({ ime: k.name, tekst: k.text, ts: pre7Dana + j * 1000 * 60 * 60 * 6 })
      }
    }
  }
  ntUpisi("nt_comments", svi)
}

function dohvatiPorudzbine(){
  let niz = ntUcitaj("nt_orders")
  if(niz == null){ niz = [] }
  niz = niz.slice()
  niz.sort(function(a, b){
    return b.ts - a.ts
  })
  return niz
}

function zavrsiKupovinu(){
  let korpa = dohvatiKorpu()

  let stavke = []
  let ukupno = 0
  for(let id in korpa){
    let igra = nadjiIgru(id)
    let cena = 0
    let naziv = id
    let grupa = ""
    if(igra != null){
      cena = igra.price
      naziv = igra.name
      grupa = igra.group
    }
    let kolicina = korpa[id]
    stavke.push({ id: id, name: naziv, group: grupa, price: cena, qty: kolicina })
    ukupno = ukupno + cena * kolicina
  }

  if(stavke.length == 0){
    return null
  }

  let sve = ntUcitaj("nt_orders")
  if(sve == null){ sve = [] }

  let porudzbina = {
    no: sve.length + 1,
    ts: Date.now(),
    items: stavke,
    total: ukupno
  }
  sve.push(porudzbina)
  ntUpisi("nt_orders", sve)

  ntUpisi("nt_cart", {})   
  return porudzbina
}
