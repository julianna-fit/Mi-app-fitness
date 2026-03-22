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

const data = obtenerVersiculoDelDia();

document.getElementById("versiculo").innerText =
  data.texto + " - " + data.referencia;

document.getElementById("reflexion").innerText =
  data.reflexion;

document.getElementById("mensaje").innerText =
  data.mensaje;
