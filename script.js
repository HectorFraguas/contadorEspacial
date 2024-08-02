document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const launchTime = urlParams.get('launchTime'); // Espera una hora en formato 'HH:MM'

    if (launchTime) {
        document.getElementById('launchTime').value = launchTime;
        startCountdown(); // Inicia el contador automáticamente si launchTime está presente
    }

    checkUrlParams(); // Otras verificaciones de URL si las necesitas
});

let interval;

function startCountdown() {
    const launchTimeInput = document.getElementById('launchTime').value;
    if (!launchTimeInput) {
        alert('Por favor, introduce una hora de lanzamiento.');
        return;
    }

    const launchTimeUTC = new Date();
    const [hours, minutes] = launchTimeInput.split(':');
    launchTimeUTC.setUTCHours(hours, minutes, 0, 0);

    if (interval) {
        clearInterval(interval);
    }

    const countdownElement = document.getElementById('countdown');
    interval = setInterval(function() {
        const now = new Date();
        const difference = launchTimeUTC - now;
        const absDifference = Math.abs(difference);

        let prefix = difference < 0 ? "T + " : "T - ";
        const totalSeconds = Math.floor(absDifference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        countdownElement.textContent = `${prefix}${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}
