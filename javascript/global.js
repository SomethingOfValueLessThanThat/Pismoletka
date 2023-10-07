// Custom cursor effect
const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 2000, fill: "forwards" });
}

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
