// Skrypt: próba autoodtwarzania audio na otwarciu strony
// Usunięto wszelkie referencje do przycisku "Odtwórz muzykę".
// Uwaga: przeglądarki mogą zablokować nieinteraktywne autoplay — w takim przypadku
// dźwięk zostanie spróbowany ponownie po pierwszej interakcji użytkownika.

document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-audio");
  if (!audio) return;

  function tryPlay() {
    // Nie ustawiamy mute — chcemy, żeby muzyka zagrała głośno jeśli przeglądarka na to pozwoli
    audio.muted = false;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        console.log('Audio started automatically.');
      }).catch((err) => {
        console.warn('Autoplay zablokowany:', err);
        function onFirstInteraction() {
          audio.play().then(()=>{
            console.log('Audio started after user interaction.');
          }).catch(e=>{
            console.error('Play after interaction failed:', e);
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
