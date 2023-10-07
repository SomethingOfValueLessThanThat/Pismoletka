const typingText = document.querySelector(".typing-text h3"),
inpField = document.querySelector(".div-wrapper .input-field"),
tryAgainBtn = document.querySelector(".div-gradient-navigation button"),
timeTag = document.querySelector(".time span"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
accuracyTag = document.querySelector(".accuracy span"),
correctTag = document.querySelector(".correct span")

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        let accuracy = Math.round((charIndex - mistakes) / charIndex * 10000) / 100;

        let correct = Math.round(charIndex - mistakes);

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex;
        accuracyTag.innerText = accuracy;
        correctTag.innerText = correct;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round((charIndex - mistakes) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Page transtion effect
function handleClick(e) {
    e.preventDefault();
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar, i) => {
      bar.style.animationPlayState = "running";
    });
    const lastBar = bars[bars.length - 1];
    lastBar.addEventListener("animationend", () => {
      setTimeout(() => {
        window.location = e.target.href;
      }, 500);
    });
  }