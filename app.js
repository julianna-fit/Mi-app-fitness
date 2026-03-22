const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const quickCards = document.querySelectorAll(".quick-card");
const trackerChecks = document.querySelectorAll(".tracker-check");
const notesField = document.getElementById("dailyNotes");

const today = new Date();
const todayKey = today.toISOString().split("T")[0];

const versiculos = [
  {
    texto: "Todo lo puedo en Aquel que me fortalece.",
    referencia: "Filipenses 4:13",
    reflexion: "Dios te da la fuerza incluso cuando sientes que no puedes más.",
    mensaje: "Hoy eres más fuerte de lo que crees 💜"
  },
  {
    texto: "Jehová es mi pastor; nada me faltará.",
    referencia: "Salmos 23:1",
    reflexion: "Dios cuida cada detalle de tu vida.",
    mensaje: "Confía, Dios ya tiene el control 🙏"
  },
  {
    texto: "Esfuérzate y sé valiente.",
    referencia: "Josué 1:9",
    reflexion: "No estás sola, Dios va contigo.",
    mensaje: "Hoy camina con valentía 💪"
  }
];

function obtenerVersiculoDelDia() {
  const index = today.getDate() % versiculos.length;
  return versiculos[index];
}

function showScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${screenName}`);
  if (target) {
    target.classList.add("active");
  }

  navButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.screen === screenName) {
      btn.classList.add("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setDailyContent() {
  const data = obtenerVersiculoDelDia();

  const ids = {
    dailyVerseText: data.texto,
    dailyVerseReference: data.referencia,
    dailyReflection: data.reflexion,
    dailyMotivation: data.mensaje,
    faithVerseText: data.texto,
    faithVerseReference: data.referencia,
    faithReflection: data.reflexion,
    faithMotivation: data.mensaje
  };

  Object.entries(ids).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

function saveTracker() {
  const data = {};

  trackerChecks.forEach((check) => {
    data[check.dataset.key] = check.checked;
  });

  if (notesField) {
    data.notes = notesField.value;
  }

  localStorage.setItem(`tracker-${todayKey}`, JSON.stringify(data));
  updateProgress();
}

function loadTracker() {
  const saved = localStorage.getItem(`tracker-${todayKey}`);
  if (!saved) return;

  const data = JSON.parse(saved);

  trackerChecks.forEach((check) => {
    check.checked = !!data[check.dataset.key];
  });

  if (notesField) {
    notesField.value = data.notes || "";
  }
}

function getWeekDates() {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function updateProgress() {
  const weekDates = getWeekDates();

  let gymDays = 0;
  let waterDays = 0;
  let devotionalDays = 0;
  let totalChecks = 0;
  let completedChecks = 0;

  weekDates.forEach((dateKey) => {
    const saved = localStorage.getItem(`tracker-${dateKey}`);
    if (!saved) return;

    const data = JSON.parse(saved);
    const values = [
      data.gym,
      data.protein,
      data.water,
      data.stretch,
      data.devotional,
      data.prayer
    ];

    totalChecks += values.length;
    completedChecks += values.filter(Boolean).length;

    if (data.gym) gymDays++;
    if (data.water) waterDays++;
    if (data.devotional || data.prayer) devotionalDays++;
  });

  const percent = totalChecks === 0 ? 0 : Math.round((completedChecks / totalChecks) * 100);

  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const gymStat = document.getElementById("gymStat");
  const waterStat = document.getElementById("waterStat");
  const devotionalStat = document.getElementById("devotionalStat");

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (gymStat) gymStat.textContent = gymDays;
  if (waterStat) waterStat.textContent = waterDays;
  if (devotionalStat) devotionalStat.textContent = devotionalDays;
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    showScreen(btn.dataset.screen);
  });
});

quickCards.forEach((card) => {
  card.addEventListener("click", () => {
    showScreen(card.dataset.target);
  });
});

trackerChecks.forEach((check) => {
  check.addEventListener("change", saveTracker);
});

if (notesField) {
  notesField.addEventListener("input", saveTracker);
}

setDailyContent();
loadTracker();
updateProgress();
showScreen("home");
