const heartsLayer = document.querySelector(".hearts-layer");
const confettiLayer = document.getElementById("confettiLayer");
const toast = document.getElementById("toast");
const loveNote = document.getElementById("loveNote");
const hintText = document.getElementById("hintText");
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const hero = document.querySelector(".hero");
const replyPage = document.getElementById("replyPage");

const messages = [
  "You are the best part of my day, and now this page knows it too.",
  "A perfect yes looks even better in pink.",
  "Consider this your official invitation to be adored.",
  "My favorite place is wherever you are.",
  "This landing page was built for one answer, and it is smiling already."
];

const teasingMessages = [
  "The button is patient. Your answer can be legendary.",
  "I included a backup plan: more pink.",
  "Take your time. The hearts are on standby.",
  "The answer is still yes-shaped."
];

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

function createConfettiBurst() {
  const colors = ["#ff69b4", "#ffd2e8", "#ffffff", "#f04a9a", "#ff8ec0"];
  const originX = window.innerWidth * 0.52;
  const originY = window.innerHeight * 0.28;

  for (let i = 0; i < 32; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    const angle = (Math.PI * 2 * i) / 32;
    const distance = 80 + Math.random() * 180;
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.width = `${8 + Math.random() * 8}px`;
    piece.style.height = piece.style.width;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--dy", `${Math.sin(angle) * distance - 40}px`);
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

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

yesBtn.addEventListener("click", () => {
  hero.hidden = true;
  replyPage.hidden = false;
  const note = pickRandom(messages);
  loveNote.textContent = note;
  showToast("Yes accepted. Opening your love note.");
  burstHearts(26);
  createConfettiBurst();
});

maybeBtn.addEventListener("click", () => {
  const teasing = pickRandom(teasingMessages);
  hintText.textContent = teasing;
  showToast(teasing);
  burstHearts(10);
});

setInterval(() => {
  burstHearts(2);
}, 1400);

burstHearts(8);
