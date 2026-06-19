// Skrypt: próba autoodtwarzania audio, fallback przycisk i kliknięcie aby uruchomić
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-audio");
  const btn = document.getElementById("play-fallback");

  // Funkcja do próby uruchomienia audio i ukrycia przycisku jeśli się uda
  function tryPlay() {
    if (!audio) return;
    // upewnij się, że nie jest wyciszone
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // udane odtwarzanie
        btn.classList.remove("show");
        btn.setAttribute("aria-hidden", "true");
      }).catch((err) => {
        // Autoplay zablokowane — pokaż przycisk
        console.warn("Autoplay zablokowany:", err);
        btn.classList.add("show");
        btn.setAttribute("aria-hidden", "false");
      });
    }
  }

  // Jeśli przeglądarka pozwala, spróbuj uruchomić od razu
  tryPlay();

  // Kliknięcie przycisku uruchamia muzykę
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    audio.play().then(()=> {
      btn.classList.remove("show");
      btn.setAttribute("aria-hidden", "true");
    }).catch((err)=>{
      console.error("Błąd przy uruchamianiu audio:", err);
    });
  });

  // Dodatkowy fallback: kliknięcie / touch anywhere uruchomi jeśli autoplay był zablokowany
  function onFirstInteraction() {
    tryPlay();
    // usuwamy nasłuchy, bo chcemy to tylko raz
    window.removeEventListener("click", onFirstInteraction);
    window.removeEventListener("touchstart", onFirstInteraction);
  }
  window.addEventListener("click", onFirstInteraction, {once:true});
  window.addEventListener("touchstart", onFirstInteraction, {once:true});
});
