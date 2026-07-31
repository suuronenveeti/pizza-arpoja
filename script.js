const pizzataytteet = [
   "Ananas", "Banaani", "Broileri", "Fetajuusto", "Herkkusieni", 
   "Jalapeno", "Jauheliha", "Juusto", "Jäävuorisalaatti", "Kananmuna", 
   "Katkarapu", "Kebabliha", "Kermakastike", "Kurkku", "Maissi", 
   "Mozzarellajuusto", "Oliivi", "Paprika", "Parsa", "Pekoni", 
   "Pepperonimakkara", "Pizzasuikale", "Ranskalaiset", "Salami", 
   "Simpukka", "Sinihomejuusto", "Sipuli", "Tomaatti", "Tonnikala", 
   "Tulinen kastike", "Vihreä pepperoni", "Suolakurkku", "BBQ-kastike", "Punasipuli"
];

const juomat = [
   "Jäävesi", "Cola virvoitusjuoma", "Appelsiini virvoitusjuoma", "Sitrus virvoitusjuoma", "Vichy"
];

let animaatioKaynnissa = false;

// Alkuperäinen sekoitusfunktio (luo kopion ja sekoittaa)
function sekoitaTaulukko(array) {
   const kopio = [...array];
   for (let i = kopio.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
   }
   return kopio;
}

// Funktio, jota HTML-painike kutsuu
function generoiPizza() {
   if (animaatioKaynnissa) return;
   animaatioKaynnissa = true;

   const listaElementti = document.getElementById('tayteLista');
   const mausteElementti = document.getElementById('mausteOsuus');
   const juomaListaElementti = document.getElementById('juomaLista');
   
   // Näytetään molemmat tulosalueet
   document.getElementById('tulosAlue').style.display = 'block';
   document.getElementById('juomaAlue').style.display = 'block';
   
   // Alustetaan mausteosio valmiiksi animaation ajaksi
   mausteElementti.style.display = 'block';
   mausteElementti.innerHTML = '<h2>Mausteet:</h2><ul id="mausteLista"></ul>';
   const mausteListaElementti = document.getElementById('mausteLista');

   // Arvotaan lopulliset tulokset valmiiksi heti alussa
   const lopullisetTaytteet = sekoitaTaulukko(pizzataytteet).slice(0, 4);
   
   const lopullisetMausteet = [];
   if (Math.random() < 0.5) lopullisetMausteet.push("Oregano");
   if (Math.random() < 0.5) lopullisetMausteet.push("Valkosipuli");

   const lopullinenJuoma = juomat[Math.floor(Math.random() * juomat.length)];

   let kierrokset = 0;
   const maksimiKierrokset = 10;

   // Yhteinen animaatio kaikelle
   const animaatioInterval = setInterval(() => {
     kierrokset++;

     // --- TÄYTTEET ---
     const nykyisetTaytteet = (kierrokset === maksimiKierrokset) 
       ? lopullisetTaytteet 
       : sekoitaTaulukko(pizzataytteet).slice(0, 4);

     listaElementti.innerHTML = '';
     nykyisetTaytteet.forEach(t => {
       const li = document.createElement('li');
       li.textContent = t;
       listaElementti.appendChild(li);
     });

     // --- MAUSTEET JA JUOMA ANIMATION AIKANA ---
     if (kierrokset < maksimiKierrokset) {
       // Vilkutetaan mausteita
       const valiaikaisetMausteet = [];
       if (Math.random() < 0.5) valiaikaisetMausteet.push("Oregano");
       if (Math.random() < 0.5) valiaikaisetMausteet.push("Valkosipuli");
       
       mausteListaElementti.innerHTML = '';
       valiaikaisetMausteet.forEach(m => {
         const li = document.createElement('li');
         li.textContent = m;
         mausteListaElementti.appendChild(li);
       });
       
       // Varmistetaan tasan 2 riviä pitämään tilaa vain animaation AJAKSI
       while (mausteListaElementti.children.length < 2) {
         const li = document.createElement('li');
         li.innerHTML = '&nbsp;';
         li.style.listStyleType = 'none';
         mausteListaElementti.appendChild(li);
       }

       // Vilkutetaan juomaa listassa animaation aikana
       juomaListaElementti.innerHTML = '';
       const satunnainenJuoma = juomat[Math.floor(Math.random() * juomat.length)];
       const liJuoma = document.createElement('li');
       liJuoma.textContent = satunnainenJuoma;
       juomaListaElementti.appendChild(liJuoma);

     } else {
       // --- VIIMEINEN KIERROS: Lukitaan lopulliset tulokset ---
       clearInterval(animaatioInterval);
       
       if (lopullisetMausteet.length > 0) {
         // Jos mausteita tuli, luodaan puhdas lista ILMAN ylimääräisiä tyhjiä rivejä
         mausteElementti.innerHTML = '<h2>Mausteet:</h2><ul id="mausteLista"></ul>';
         const lopullinenMausteLista = document.getElementById('mausteLista');
         
         lopullisetMausteet.forEach(m => {
           const li = document.createElement('li');
           li.textContent = m;
           lopullinenMausteLista.appendChild(li);
         });
       } else {
         // Jos mausteita ei tullut, korvataan koko sisältö pelkällä otsikolla ilman tyhjiä rivejä
         mausteElementti.innerHTML = '<h2>Ei mausteita</h2>';
       }

       // Lukitaan lopullinen juoma listaan ja poistetaan animaation aikaiset hyppelyt
       juomaListaElementti.innerHTML = '';
       const liLopullinenJuoma = document.createElement('li');
       liLopullinenJuoma.textContent = lopullinenJuoma;
       juomaListaElementti.appendChild(liLopullinenJuoma);
       
       animaatioKaynnissa = false;
     }
   }, 100);
}

// Teemanvaihto (tiivistetty nuolifunktioksi, toimii täysin samalla tavalla)
document.addEventListener("DOMContentLoaded", () => {
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
});
