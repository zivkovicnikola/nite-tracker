const DATA = {
  games: [

    {
      id:"ticket-to-ride", name:"Ticket to Ride", group:"family",
      price:5490, players:"2–5", age:"8+", time:"45–60", isNew:false,
      baseRatings:[5,4,5,5,4,4,5,4],
      desc:{
        sr:"Gradi železničke pruge preko mape i poveži udaljene gradove pre protivnika.",
        en:"Build train routes across the map and connect distant cities before your rivals."
      },
      baseComments:[
        { name:"Ivana", text:"Lepa ulazna igra, deca i odrasli podjednako uživaju." }
      ]
    },
    {
      id:"carcassonne", name:"Carcassonne", group:"family",
      price:4290, players:"2–5", age:"7+", time:"35–45", isNew:true,
      baseRatings:[5,4,5,4,5,4,4,5],
      desc:{
        sr:"Slažeš pločice i postavljaš svoje meeple da osvojiš puteve, gradove i polja.",
        en:"Lay tiles and place your meeples to claim roads, cities and fields."
      }
    },
    {
      id:"dixit", name:"Dixit", group:"family",
      price:4790, players:"3–6", age:"8+", time:"30", isNew:true,
      baseRatings:[5,4,4,5,4,4,4,5],
      desc:{
        sr:"Igra mašte i asocijacija sa prelepim ilustracijama — pogodi pravu kartu.",
        en:"A game of imagination and clues with beautiful art — guess the right card."
      }
    },

    {
      id:"catan", name:"Catan", group:"strategy",
      price:5990, players:"3–4", age:"10+", time:"60–90", isNew:false,
      baseRatings:[5,5,4,5,5,4,5,4],
      desc:{
        sr:"Naseljavaj ostrvo, skupljaj sirovine i trguj da prvi sagradiš najveće naselje.",
        en:"Settle the island, gather resources and trade to grow the largest settlement first."
      },
      baseComments:[
        { name:"Ana", text:"Klasik koji uvek upali za društvo. Trgovina je najbolji deo." },
        { name:"Stefan", text:"Sreća ume da iznervira, ali zato je uvek napeto." }
      ]
    },
    {
      id:"terraforming-mars", name:"Terraforming Mars", group:"strategy",
      price:8990, players:"1–5", age:"12+", time:"90–120", isNew:false,
      baseRatings:[5,5,5,4,5,5,4,5],
      desc:{
        sr:"Vodi korporaciju koja pretvara Mars u nastanjiv svet — kiseonik, okeani, temperatura.",
        en:"Lead a corporation turning Mars into a habitable world — oxygen, oceans, temperature."
      },
      baseComments:[
        { name:"Marko", text:"Najbolja strateška u kolekciji, partije lete iako traju dugo." },
        { name:"Jelena", text:"Malo teža za naučiti, ali se brzo zaljubiš. Preporuka." }
      ]
    },
    {
      id:"scythe", name:"Scythe", group:"strategy",
      price:9490, players:"1–5", age:"14+", time:"90–115", isNew:true,
      baseRatings:[5,4,5,4,5,4,4,5],
      desc:{
        sr:"Alternativne 1920-e: širi imperiju, upravljaj resursima i mehovima na bojnom polju.",
        en:"An alternate 1920s: expand your empire, manage resources and mechs across the board."
      }
    },

    {
      id:"codenames", name:"Codenames", group:"party",
      price:3290, players:"2–8+", age:"10+", time:"15–30", isNew:false,
      baseRatings:[5,5,4,5,5,4,5,5],
      desc:{
        sr:"Dva tima, jedna reč kao trag — pogodi svoje agente pre suparnika.",
        en:"Two teams, one-word clues — find your agents before the opposing team."
      },
      baseComments:[
        { name:"Nikola", text:"Savršena za veće društvo, smeh zagarantovan." },
        { name:"Mina", text:"Brzo se objasni i odmah svi igraju. Top za žurke." }
      ]
    },
    {
      id:"exploding-kittens", name:"Exploding Kittens", group:"party",
      price:2990, players:"2–5", age:"7+", time:"15", isNew:false,
      baseRatings:[4,4,5,4,4,4,4,5],
      desc:{
        sr:"Brza kartična igra sreće i blefa — izvuci mačku koja eksplodira i ispadaš.",
        en:"A fast card game of luck and bluffing — draw the exploding kitten and you're out."
      }
    },
    {
      id:"telestrations", name:"Telestrations", group:"party",
      price:3790, players:"4–8", age:"12+", time:"30", isNew:true,
      baseRatings:[4,5,4,4,4,4,5,4],
      desc:{
        sr:"Pokvareni telefon na papiru — crtaj, pogađaj i smej se haosu na kraju.",
        en:"Telephone meets sketching — draw, guess and laugh at the chaos at the end."
      }
    }
  ],

  events: [
    {
      id:"ev-catan",
      date:{ d:"12", m:{ sr:"JUL", en:"JUL" } },
      time:"18:00",
      title:{ sr:"Catan — letnji turnir", en:"Catan — summer tournament" },
      location:{ sr:"Klub Kockica, Cara Dušana 45, Beograd", en:"Klub Kockica, Cara Dušana 45, Belgrade" },
      desc:{
        sr:"Takmičenje u Catanu kroz grupnu fazu i finale. Prijave na licu mesta, broj mesta ograničen.",
        en:"A Catan competition with a group stage and finals. Sign up on site, limited seats."
      },
      link:"#"
    },
    {
      id:"ev-night",
      date:{ d:"19", m:{ sr:"JUL", en:"JUL" } },
      time:"20:00",
      title:{ sr:"Noć društvenih igara", en:"Board game night" },
      location:{ sr:"Caffe Meeple, Strahinjića bana 12, Beograd", en:"Caffe Meeple, Strahinjića bana 12, Belgrade" },
      desc:{
        sr:"Otvoreno veče uz desetine igara iz naše kolekcije i druženje do kasno.",
        en:"An open evening with dozens of games from our collection and hangout till late."
      },
      link:"#"
    },
    {
      id:"ev-family",
      date:{ d:"26", m:{ sr:"JUL", en:"JUL" } },
      time:"16:00",
      title:{ sr:"Porodično popodne uz igre", en:"Family games afternoon" },
      location:{ sr:"Dom omladine, Makedonska 22, Beograd", en:"Dom omladine, Makedonska 22, Belgrade" },
      desc:{
        sr:"Popodne za roditelje i decu uz lake porodične igre i male nagrade.",
        en:"An afternoon for parents and kids with light family games and small prizes."
      },
      link:"#"
    }
  ],

  partners: [
    { name:"BoardGameGeek", url:"https://boardgamegeek.com", accent:"blue",
      tag:{ sr:"Najveća baza i recenzije igara", en:"The biggest game database & reviews" } },
    { name:"Asmodee", url:"https://www.asmodee.com", accent:"orange",
      tag:{ sr:"Izdavač i distributer igara", en:"Game publisher & distributor" } },
    { name:"Days of Wonder", url:"https://www.daysofwonder.com", accent:"green",
      tag:{ sr:"Izdavač Ticket to Ride i Dixit", en:"Publisher of Ticket to Ride & Dixit" } },
    { name:"Board Game Arena", url:"https://boardgamearena.com", accent:"blue",
      tag:{ sr:"Igraj društvene igre online", en:"Play board games online" } }
  ]
};
