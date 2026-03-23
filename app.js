const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const quickCards = document.querySelectorAll(".quick-card");
const trackerChecks = document.querySelectorAll(".tracker-check");
const notesField = document.getElementById("dailyNotes");

const today = new Date();
const todayKey = today.toISOString().split("T")[0];

function obtenerNumeroDelDiaDelAno(fecha = new Date()) {
  const inicio = new Date(fecha.getFullYear(), 0, 0);
  const diferencia = fecha - inicio;
  const unDia = 1000 * 60 * 60 * 24;
  return Math.floor(diferencia / unDia);
}

function obtenerVersiculoDelDia() {
  const numeroDia = obtenerNumeroDelDiaDelAno(new Date());
  const index = (numeroDia - 1) % versiculosDelAno.length;
  return versiculosDelAno[index] || versiculosDelAno[0];
}

function showScreen(screenName) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(`screen-${screenName}`);
  if (target) target.classList.add("active");

  navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
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

  const faithVerseText = document.getElementById("faithVerseText");
  const faithVerseReference = document.getElementById("faithVerseReference");
  const faithReflection = document.getElementById("faithReflection");
  const faithMotivation = document.getElementById("faithMotivation");

  if (dailyVerseText) dailyVerseText.textContent = data.texto;
  if (dailyVerseReference) dailyVerseReference.textContent = data.referencia;

  if (faithVerseText) faithVerseText.textContent = data.texto;
  if (faithVerseReference) faithVerseReference.textContent = data.referencia;
  if (faithReflection) faithReflection.textContent = data.reflexion;
  if (faithMotivation) faithMotivation.textContent = data.mensaje;
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
