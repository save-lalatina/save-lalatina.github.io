function startSearch() {
  // get main elements
  const search = document.querySelector(".search");
  const input = search.querySelector("input");
  const label = search.querySelector("label");
  const btnListen = search.querySelector("#dictate");
  const btnSearch = search.querySelector("#search");
  let listening = false;
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

  // if there's speech recognition, show the microphone
  if (SpeechRecognition) {
    setTimeout(function () {
      btnListen.classList.add("show");
      label.querySelector("span").classList.add("show");
    }, 1000);
  }

  // show/hide placeholder
  input.addEventListener("input", function () {
    if (this.value.length === 0) {
      label.classList.remove("a11y-hidden");
    } else {
      label.classList.add("a11y-hidden");
    }
  });

  // listen to speech
  btnListen.addEventListener("click", function () {
    if (!listening) {
      const recognition = new SpeechRecognition();

      recognition.onstart = function () {
        btnListen.classList.add("active");
        listening = true;
      };

      recognition.onspeechend = function () {
        console.log('саня лох')
        recognition.stop();
        btnListen.classList.remove("active");
        listening = false;
      };

      recognition.onerror = function () {
        console.log('саня пидр')
        btnListen.classList.remove("active");
        listening = false;
      };

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        input.value = transcript;
        input.focus();
        if (transcript.length > 0) {
          label.classList.add("a11y-hidden");
        }
      };

      recognition.start();
    }
  });
}

startSearch();