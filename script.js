// Täytteet jaettuna kahteen ryhmään
const vegeTaytteet = [
  "Ananas", "Aurinkokuivattu tomaatti", "Avokado", "Banaani", "BBQ-kastike", 
  "Chili", "Extrajuusto", "Feta", "Halloumijuusto", "Herkkusieni", 
  "Härkäpapuvalmiste", "Jalapeno", "Jäävuorisalaatti", "Kananmuna", 
  "Kantarelli", "Kapris", "Kermakastike", "Leipäjuusto", "Maissi", 
  "Mozzarella", "Oliivi", "Paprika", "Parsa", "Persikka", "Pesto", 
  "Punasipuli", "Ranskalaiset", "Rucola", "Sinihomejuusto", "Sipuli", 
  "Smetana", "Suolakurkku", "Suolapähkinä", "Tomaatti", "Tuore herkkusieni", 
  "Tulinen kastike", "Valkosipuli", "Vihreä pepperoni", "Vuohenjuusto"
];

const lihaTaytteet = [
  "Anjovis", "Ilmakuivattu kinkku", "Jauheliha", "Jokirapu", "Kana", 
  "Katkarapu", "Kebab", "Kinkku", "Lohi", "Muikku", "Naudanliha", 
  "Pekoni", "Pepperoni", "Salami", "Savuporo", "Simpukka", "Tonnikala"
];

const juomat = [
   "Jäävesi", "Cola-virvoitusjuoma", "Appelsiinivirvoitusjuoma", "Sitrusvirvoitusjuoma", "Vichy", "Viini", "Olut"
];

let pizzaAnimaatioKaynnissa = false;
let juomaAnimaatioKaynnissa = false;

// Sekoitetaan taulukko satunnaiseen järjestykseen
function sekoitaTaulukko(array) {
   const kopio = [...array];
   for (let i = kopio.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
   }
   return kopio;
}

// Logiikka täytteiden arpomiseen Vege-tilan mukaan
function arvoTasapainotetutTaytteet(maara) {
  const vegeTilaOnPaalla = document.getElementById('vege-cb')?.checked ?? false;

  // 1. Jos Vege-tila on päällä -> Vain kasvistäytteitä
  if (vegeTilaOnPaalla) {
    return sekoitaTaulukko(vegeTaytteet).slice(0, maara);
  }

  // 2. Jos Vege-tila on pois päältä -> Täysin satunnainen pizza kaikista täytteistä
  const kaikkiTaytteet = [...vegeTaytteet, ...lihaTaytteet];
  return sekoitaTaulukko(kaikkiTaytteet).slice(0, maara);
}

function generoiPizza(maara) {
   if (pizzaAnimaatioKaynnissa) return;
   
   const lopullisetTaytteet = arvoTasapainotetutTaytteet(maara);
   pizzaAnimaatioKaynnissa = true;
   
   const listaElementti = document.getElementById('tayteLista');
   document.getElementById('tulosAlue').style.display = 'block';

   let kierrokset = 0;
   const maksimiKierrokset = 10;

   const pizzaInterval = setInterval(() => {
     kierrokset++;

     const nykyisetTaytteet = (kierrokset === maksimiKierrokset) 
       ? lopullisetTaytteet 
       : arvoTasapainotetutTaytteet(maara);

     listaElementti.innerHTML = '';
     nykyisetTaytteet.forEach(t => {
       const li = document.createElement('li');
       li.textContent = t;
       listaElementti.appendChild(li);
     });

     if (kierrokset === maksimiKierrokset) {
       clearInterval(pizzaInterval);
       pizzaAnimaatioKaynnissa = false;
     }
   }, 100);
}

function generoiJuoma() {
   if (juomaAnimaatioKaynnissa) return;
   juomaAnimaatioKaynnissa = true;

   const juomaListaElementti = document.getElementById('juomaLista');
   document.getElementById('juomaAlue').style.display = 'block';

   const lopullinenJuoma = juomat[Math.floor(Math.random() * juomat.length)];
   let kierrokset = 0;
   const maksimiKierrokset = 10;

   const juomaInterval = setInterval(() => {
     kierrokset++;
     juomaListaElementti.innerHTML = '';
     
     if (kierrokset < maksimiKierrokset) {
       const satunnainenJuoma = juomat[Math.floor(Math.random() * juomat.length)];
       const liJuoma = document.createElement('li');
       liJuoma.textContent = satunnainenJuoma;
       juomaListaElementti.appendChild(liJuoma);
     } else {
       clearInterval(juomaInterval);
       const liLopullinenJuoma = document.createElement('li');
       liLopullinenJuoma.textContent = lopullinenJuoma;
       juomaListaElementti.appendChild(liLopullinenJuoma);
       
       juomaAnimaatioKaynnissa = false;
     }
   }, 100);
}

// Teemanvaihto
const btn = document.getElementById("theme-toggle");
if (btn) {
    btn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");
        if (document.documentElement.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

document.getElementById("jaa-nappi")?.addEventListener("click", (e) => {
  const lista = Array.from(document.querySelectorAll("#tayteLista li")).map(li => li.innerText.trim().toLowerCase());
  
  if (lista.length === 0) {
    const alkuperainenTeksti = e.target.innerText;
    e.target.innerText = "Arvo pizza ensin!";
    setTimeout(() => { e.target.innerText = alkuperainenTeksti; }, 2000);
    return;
  }

  // Korvataan viimeinen pilkku "ja"-sanalla
  const taytteet = lista.length > 1 
    ? lista.slice(0, -1).join(", ") + " ja " + lista.slice(-1) 
    : lista;

  // Haetaan juoma vain jos se on oikeasti arvottu listaan
  const juomaElement = document.getElementById("juomaLista")?.querySelector("li")?.innerText.trim();
  let juomaOsa = "";

  if (juomaElement) {
    const juoma = juomaElement.startsWith("Vichy") ? juomaElement : juomaElement.toLowerCase();
    juomaOsa = ` ja juomana ${juoma}`;
  }

  // Muotoillaan viesti dynaamisesti juoman tilan mukaan
  const viesti = `Minun pizzani on ${taytteet}${juomaOsa} | https://suuronenveeti.github.io/pizza-arpoja/`;

  if (navigator.share) {
    navigator.share({ text: viesti });
  } else {
    navigator.clipboard.writeText(viesti).then(() => {
      const alkuperainen = e.target.innerText;
      e.target.innerText = "Kopioitu!";
      setTimeout(() => { e.target.innerText = alkuperainen; }, 1500);
    });
  }
});

