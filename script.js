const pizzataytteet = [
  "Ananas", "Anjovis", "Aurinkokuivattu tomaatti", "Avokado", "Banaani", 
  "BBQ-kastike", "Chili", "Extrajuusto", "Feta", "Halloumijuusto", 
  "Herkkusieni", "Härkäpapuvalmiste", "Ilmakuivattu kinkku", "Jalapeno", "Jauheliha", 
  "Jokirapu", "Jäävuorisalaatti", "Kana", "Kananmuna", "Kantarelli", 
  "Kapris", "Katkarapu", "Kebab", "Kermakastike", "Kinkku", 
  "Leipäjuusto", "Lohi", "Maissi", "Mozzarella", "Muikku", 
  "Naudanliha", "Oliivi", "Paprika", "Parsa", "Pekoni", 
  "Pepperoni", "Persikka", "Pesto", "Punasipuli", "Ranskalaiset", 
  "Rucola", "Salami", "Savuporo", "Simpukka", "Sinihomejuusto", 
  "Sipuli", "Smetana", "Suolakurkku", "Suolapähkinä", "Tomaatti", 
  "Tonnikala", "Tuore herkkusieni", "Tulinen kastike", "Valkosipuli", "Vihreä pepperoni", 
  "Vuohenjuusto"
];

const juomat = [
   "Jäävesi", "Cola-virvoitusjuoma", "Appelsiinivirvoitusjuoma", "Sitrusvirvoitusjuoma", "Vichy"
];

let pizzaAnimaatioKaynnissa = false;
let juomaAnimaatioKaynnissa = false;

function sekoitaTaulukko(array) {
   const kopio = [...array];
   for (let i = kopio.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [kopio[i], kopio[j]] = [kopio[j], kopio[i]];
   }
   return kopio;
}

function generoiPizza(maara) {
   if (pizzaAnimaatioKaynnissa) return;
   pizzaAnimaatioKaynnissa = true;

   const listaElementti = document.getElementById('tayteLista');
   document.getElementById('tulosAlue').style.display = 'block';

   const lopullisetTaytteet = sekoitaTaulukko(pizzataytteet).slice(0, maara);
   let kierrokset = 0;
   const maksimiKierrokset = 10;

   const pizzaInterval = setInterval(() => {
     kierrokset++;

     const nykyisetTaytteet = (kierrokset === maksimiKierrokset) 
       ? lopullisetTaytteet 
       : sekoitaTaulukko(pizzataytteet).slice(0, maara);

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

// Teemanvaihto alustetaan heti kun skripti ladataan
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
