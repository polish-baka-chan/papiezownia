// Skrypt: próba autoodtwarzania audio na otwarciu strony
// Uwaga: przeglądarki mogą zablokować nieinteraktywne autoplay — skrypt próbuje uruchomić audio i ponowić próbę po pierwszej interakcji jeśli to konieczne.

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-audio");
  if (!audio) return;

  // Spróbuj od razu odpalić audio
  function tryPlay() {
    // upewnij się, że nie jest wyciszone przez skrypt
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Audio started automatically");
      }).catch((err) => {
        // Autoplay zablokowane — spróbuj ponowić po interakcji użytkownika (bez przycisku)
        console.warn("Autoplay zablokowany przez przeglądarkę:", err);
        function onFirstInteraction() {
          audio.play().then(()=>{
            console.log("Audio started after interaction");
          }).catch(e=>{
            console.error("Play after interaction failed:", e);
          });
          window.removeEventListener('click', onFirstInteraction);
          window.removeEventListener('touchstart', onFirstInteraction);
        }
        window.addEventListener('click', onFirstInteraction, {once:true});
        window.addEventListener('touchstart', onFirstInteraction, {once:true});
      });
    }
  }

  tryPlay();
});
