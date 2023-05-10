// Obtener elementos del DOM
const alarmTimeElement = document.getElementById('alarmTime');
const countdownElement = document.getElementById('countdown');
const setAlarmButton = document.getElementById('set-alarm-btn');
const btn = document.getElementById('dark-mode-btn');
const body = document.querySelector('body');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minutes');
const secondInput = document.getElementById('seconds');
const typeInput = document.getElementById('type');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupCloseBtn = document.getElementById('popup-close-btn');
const audio = new Audio('candy-crush-bomba-color.mp3'); // Ruta al archivo de sonido de alarma

// Función para alternar el modo oscuro
btn.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  btn.textContent = body.classList.contains('dark-mode') ? 'Modo claro' : 'Modo oscuro';
});

// Hora actual
function formatTime(hour, minute, second, type) {
  hour = parseInt(hour, 10) % 24;
  hour = hour.toString().padStart(2, '0');
  minute = minute ? minute.toString().padStart(2, '0') : '00';
  second = second ? second.toString().padStart(2, '0') : '00';
  return `${hour}:${minute}:${second} ${type}`;
}

function updateCurrentTime() {
  const date = new Date();
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();
  const currentSecond = date.getSeconds();
  const typeHour = currentHour < 12 ? 'AM' : 'PM';
  const fullTime = formatTime(currentHour, currentMinute, currentSecond, typeHour);
  document.getElementById('currentTime').textContent = fullTime;
}

// Variables de estado
let alarmTime;
let countdownInterval;

// Para establecer la alarma
function setAlarm() {
  const hour = parseInt(document.getElementById('hour').value);
  const minutes = parseInt(document.getElementById('minutes').value) || '00';
  const seconds = parseInt(document.getElementById('seconds').value) || '00';
  const type = document.getElementById('type').value;

  const isAlarmValid = validateAlarmTime(hour, minutes, seconds, type);

  if (isAlarmValid) {
    const now = new Date();
    alarmTime = new Date();

    if (type === 'PM' && hour < 12) {
      hour += 12;
    }

    alarmTime.setHours(hour);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(seconds);

    const countdown = alarmTime - now;

    if (countdown > 0) {
      startCountdown(countdown);
    } else {
      showAlert('La hora de la alarma debe ser en el futuro');
    }
  } else {
    showAlert('La hora de la alarma debe ser en el futuro');
  }
}
// Reiniciar alarma
const resetAlarmButton = document.getElementById('reset-alarm-btn');
resetAlarmButton.addEventListener('click', function() {
  clearInterval(countdownInterval);
  alarmTime = null;
  updateAlarmTime();
});

// Para validar la hora de la alarma
function validateAlarmTime(hour, minutes, seconds, type) {
  const now = new Date();
  const alarmTime = new Date();

  if (type === 'PM' && hour < 12) {
    hour += 12;
  }

  alarmTime.setHours(hour);
  alarmTime.setMinutes(minutes);
  alarmTime.setSeconds(seconds);

  return alarmTime > now;
}

// Para mostrar una alerta
function showAlert(message) {
  popupMessage.textContent = message;
  popup.style.display = 'flex';

  popupCloseBtn.addEventListener('click', function() {
    popup.style.display = 'none';
  });
}

// Para actualizar la hora de la alarma
function updateAlarmTime() {
  if (alarmTime) {
    const alarmHour = alarmTime.getHours();
    const alarmMinute = alarmTime.getMinutes().toString().padStart(2, '0');
    const alarmSecond = alarmTime.getSeconds().toString().padStart(2, '0');
    const alarmType = alarmHour < 12 ? 'AM' : 'PM';
    const fullTime = formatTime(alarmHour, alarmMinute, alarmSecond, alarmType);

    if (validateAlarmTime(alarmHour, alarmMinute, alarmSecond, alarmType)) {
      alarmTimeElement.textContent = fullTime;
    } else {
      alarmTimeElement.textContent = '';
    }
  } else {
    alarmTimeElement.textContent = '--:--:--';
  }
}

// Para iniciar el contador
function startCountdown(countdown) {
  countdownInterval = setInterval(() => {
    countdown -= 1000;
    if (countdown > 0) {
      updateCountdown(countdown);
    } else {
      clearInterval(countdownInterval);
      playAlarm();
    }
  }, 1000);
}

// Para actualizar la visualización del contador
function updateCountdown(countdown) {
  const hours = Math.floor(countdown / (1000 * 60 * 60));
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Para reproducir la alarma
function playAlarm() {
  audio.play();
  showAlert('¡Es la hora!');
}

setInterval(updateCurrentTime, 1000);

// Asignar eventos a los botones
setAlarmButton.addEventListener('click', function() {
  setAlarm();
  updateAlarmTime();
});
setInterval(updateAlarmTime, 1000);

//RULETA:
// script.js
const url = 'nombres.json';
const btnSeleccionar = document.querySelector('#btn-seleccionar');
const nombreSeleccionado = document.querySelector('#nombre-seleccionado');
const resultados = document.querySelector('#resultados');
const sonidoGirar = new Audio('Super Mario Kart - Star Power.mp3');
const sonidoSeleccionado = new Audio('roblox-death-sound_1.mp3');

// Cargar los nombres desde el archivo JSON
fetch(url)
  .then(response => response.json())
  .then(data => {
    const nombres = data.nombres;

    btnSeleccionar.addEventListener('click', () => {
      // Detener reproducción de la canción anterior
      sonidoGirar.pause();
      sonidoGirar.currentTime = 0;

      // Reproducir canción mientras los nombres giran
      sonidoGirar.play();

      // Mostrar cada nombre con un intervalo de tiempo
      let i = 0;
      const temporizador = setInterval(() => {
        nombreSeleccionado.textContent = nombres[i];
        i++;
        if (i >= nombres.length) {
          clearInterval(temporizador);

          // Detener reproducción de la canción mientras los nombres giran
          sonidoGirar.pause();
          sonidoGirar.currentTime = 0;

          // Elegir un nombre al azar y mostrarlo como seleccionado
          const indice = Math.floor(Math.random() * nombres.length);
          const nombreSeleccionadoTexto = nombres[indice];
          nombreSeleccionado.textContent = nombreSeleccionadoTexto;

          // Agregar nombre al historial
          const hora = new Date().toLocaleTimeString();
          const resultado = `${hora}: ${nombreSeleccionadoTexto}`;
          const resultadoLi = document.createElement('li');
          resultadoLi.textContent = resultado;
          resultados.appendChild(resultadoLi);

          // Reproducir efecto de sonido de selección
          sonidoSeleccionado.play();
        }
      }, 150);
    });
  })
  .catch(error => console.error(error));

// Agregar una clase adicional para hacer que el nombre salte
nombreSeleccionado.classList.add('jump');



  