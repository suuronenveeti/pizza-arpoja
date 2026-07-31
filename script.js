const pizzataytteet = [
  "Ananas", "Banaani", "Broileri", "Fetajuusto", "Herkkusieni", 
  "Jalopeno", "Jauheliha", "Juusto", "Jäävuorisalaatti", "Kananmuna", 
  "Katkarapu", "Kebabliha", "Kermakastike", "Kurkku", "Maissi", 
  "Mozarellajuusto", "Oliivi", "Paprika", "Parsa", "Pekoni", 
  "Pepperonimakkara", "Pizzasuikale", "Ranskalaiset", "Salami", 
  "Simpukka", "Sinihomejuusto", "Sipuli", "Tomaatti", "Tonnikala", 
  "Tulinen kastike", "Vihreä pepperoni"
];

let animaatioKaynnissa = false;

function generoiPizza() {
  if (animaatioKaynnissa) return;
  animaatioKaynnissa = true;

  const listaElementti = document.getElementById('tayteLista');
  const mausteElementti = document.getElementById('mausteOsuus');
  
  document.getElementById('tulosAlue').style.display = 'block';
  
  // Näytetään mausteosio ja asetetaan alkuperäinen otsikko animaation ajaksi
  mausteElementti.style.display = 'block';
  mausteElementti.innerHTML = '<h2>Mausteet:</h2><ul id="mausteLista"></ul>';
  const mausteListaElementti = document.getElementById('mausteLista');

  let tayteKierrokset = 0;
  const maksimiKierrokset = 10;

  // --- Vaihe 1: Päätäytteiden arvonta (10 kierrosta) ---
  const tayteInterval = setInterval(() => {
    tayteKierrokset++;

    const sekoitetut = [...pizzataytteet].sort(() => 0.5 - Math.random());
    const valitutTaytteet = sekoitetut.slice(0, 4);
    
    listaElementti.innerHTML = '';
    valitutTaytteet.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      listaElementti.appendChild(li);
    });

    if (tayteKierrokset === maksimiKierrokset) {
      clearInterval(tayteInterval);
      
      // --- Vaihe 2: Mausteiden arvonta (10 kierrosta) ---
      let mausteKierrokset = 0;
      let valitutMausteet = [];
      
      const mausteInterval = setInterval(() => {
        mausteKierrokset++;
        
        valitutMausteet = [];
        if (Math.random() < 0.5) valitutMausteet.push("Oregano");
        if (Math.random() < 0.5) valitutMausteet.push("Valkosipuli");
        
        mausteListaElementti.innerHTML = '';
        
        if (valitutMausteet.length > 0) {
          valitutMausteet.forEach(m => {
            const li = document.createElement('li');
            li.textContent = m;
            mausteListaElementti.appendChild(li);
          });
        }

        // Kun mausteetkin on arvottu 10 kertaa, animaatio loppuu
        if (mausteKierrokset === maksimiKierrokset) {
          clearInterval(mausteInterval);
          
          // Jos lopputulokseen ei tullut mausteita, korvataan koko sisältö otsikolla "Ei mausteita"
          if (valitutMausteet.length === 0) {
            mausteElementti.innerHTML = '<h2>Ei mausteita</h2>';
          }
          
          animaatioKaynnissa = false;
        }
      }, 100);
    }
  }, 100);
}

// Teemanvaihto kun sivu on latautunut
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("theme-toggle");

    if (btn) {
        btn.addEventListener("click", function() {
            document.documentElement.classList.toggle("dark-mode");
            
            if (document.documentElement.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
});
