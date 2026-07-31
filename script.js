const heartsLayer = document.querySelector(".hearts-layer");
const confettiLayer = document.getElementById("confettiLayer");
const toast = document.getElementById("toast");
const loveNote = document.getElementById("loveNote");
const hintText = document.getElementById("hintText");
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const pageLoader = document.getElementById("pageLoader");
const hugBtn = document.getElementById("hugBtn");
const hugMessage = document.getElementById("hugMessage");
const endingScreen = document.getElementById("endingScreen");
const finalPsa = document.getElementById("finalPsa");

const teasingMessages = [
  "The button is patient. Your answer can be legendary.",
  "I included a backup plan: more pink.",
  "Take your time. The hearts are on standby.",
  "The answer is still yes-shaped."
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function burstHearts(count = 18) {
  const rect = document.body.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || window.innerHeight;

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "✦";
    heart.style.left = `${Math.random() * width}px`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 240}px`);
    heart.style.animationDuration = `${2.8 + Math.random() * 2.4}s`;
    heart.style.opacity = `${0.25 + Math.random() * 0.7}`;
    heart.style.bottom = `${Math.random() * (height * 0.22)}px`;
    heartsLayer.appendChild(heart);

    heart.addEventListener(
      "animationend",
      () => {
        heart.remove();
      },
      { once: true }
    );
  }
}

function createConfettiBurst(options = {}) {
  const soft = options.soft === true;
  const count = options.count ?? 32;
  const colors = soft
    ? ["#ffd2e8", "#fff0f7", "#ffffff", "#ffafd2", "#ff8ec0"]
    : ["#ff69b4", "#ffd2e8", "#ffffff", "#f04a9a", "#ff8ec0"];
  const originX = window.innerWidth * 0.52;
  const originY = window.innerHeight * 0.28;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    const angle = (Math.PI * 2 * i) / count;
    const distance = (soft ? 36 : 80) + Math.random() * (soft ? 96 : 180);
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.width = `${soft ? 6 + Math.random() * 6 : 8 + Math.random() * 8}px`;
    piece.style.height = piece.style.width;
    piece.style.background = colors[i % colors.length];
    piece.style.opacity = soft ? `${0.35 + Math.random() * 0.35}` : `${0.75 + Math.random() * 0.25}`;
    piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--dy", `${Math.sin(angle) * distance - (soft ? 18 : 40)}px`);
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.appendChild(piece);

    piece.addEventListener(
      "animationend",
      () => {
        piece.remove();
      },
      { once: true }
    );
  }
}

if (hugBtn && hugMessage && endingScreen) {
  hugBtn.addEventListener("click", () => {
    if (hugBtn.disabled) {
      return;
    }

    hugBtn.disabled = true;
    hugBtn.textContent = "Hug received 🤍";

    document.body.classList.add("hugging");

    if (navigator.vibrate) {
      navigator.vibrate([60, 30, 60]);
    }

    showToast("A hug is on the way...");
    burstHearts(18);
    createConfettiBurst({ count: 20, soft: true });

    hugMessage.hidden = false;
    requestAnimationFrame(() => {
      hugMessage.classList.add("show");
    });

    window.setTimeout(() => {
      hugMessage.classList.remove("show");
      document.body.classList.add("show-ending");
      endingScreen.hidden = false;
      requestAnimationFrame(() => {
        endingScreen.classList.add("show");
      });

      window.setTimeout(() => {
        if (finalPsa) {
          finalPsa.hidden = false;
          requestAnimationFrame(() => {
            finalPsa.classList.add("show");
          });
        }
      }, 5000);
    }, 2500);
  });
}

if (yesBtn && pageLoader) {
  yesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    pageLoader.classList.add("show");
    showToast("Loading your love note...");
    burstHearts(16);
    createConfettiBurst();

    window.setTimeout(() => {
      window.location.href = yesBtn.href;
    }, 900);
  });
}

if (maybeBtn) {
  maybeBtn.addEventListener("click", () => {
    const teasing = pickRandom(teasingMessages);
    hintText.textContent = teasing;
    showToast(teasing);
    burstHearts(10);
  });
}

setInterval(() => {
  burstHearts(2);
}, 1400);

burstHearts(8);
