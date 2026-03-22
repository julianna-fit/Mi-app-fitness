const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const quickCards = document.querySelectorAll(".quick-card");
const trackerChecks = document.querySelectorAll(".tracker-check");
const notesField = document.getElementById("dailyNotes");

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
  const hoy = new Date();
  const index = hoy.getDate() % versiculos.length;
  return versiculos[index];
}

function showScreen(screenName) {
  screens.forEach((screen) => screen.classList.remove("active"));

  const target = document.getElementById(`screen-${screenName}`);
  if (target) {
    target.classList.add("active");
  }

  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenName);
  });
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

function setDailyContent() {
  const data = obtenerVersiculoDelDia();

  const dailyVerseText = document.getElementById("dailyVerseText");
  const dailyVerseReference = document.getElementById("dailyVerseReference");
  const dailyReflection = document.getElementById("dailyReflection");
  const dailyMotivation = document.getElementById("dailyMotivation");

  const faithVerseText = document.getElementById("faithVerseText");
  const faithVerseReference = document.getElementById("faithVerseReference");
  const faithReflection = document.getElementById("faithReflection");
  const faithMotivation = document.getElementById("faithMotivation");

  if (dailyVerseText) dailyVerseText.textContent = `"${data.texto}"`;
  if (dailyVerseReference) dailyVerseReference.textContent = data.referencia;
  if (dailyReflection) dailyReflection.textContent = data.reflexion;
  if (dailyMotivation) dailyMotivation.textContent = data.mensaje;

  if (faithVerseText) faithVerseText.textContent = `"${data.texto}"`;
  if (faithVerseReference) faithVerseReference.textContent = data.referencia;
  if (faithReflection) faithReflection.textContent = data.reflexion;
  if (faithMotivation) faithMotivation.textContent = data.mensaje;
}

function saveTracker() {
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];
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
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];
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
 
