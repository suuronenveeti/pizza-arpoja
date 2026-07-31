document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("theme-toggle");

    // Nappi vaihtaa teemaa klikatessa
    if (btn) {
        btn.addEventListener("click", function() {
            // Vaihdetaan luokka html-elementille
            document.documentElement.classList.toggle("dark-mode");
            
            // Tallennetaan tila muistiin
            if (document.documentElement.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
});
