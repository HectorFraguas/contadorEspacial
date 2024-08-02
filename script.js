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

    function updateCountdown() {
        const now = new Date();
        const difference = launchTimeUTC - now;
        let seconds = Math.floor(difference / 1000);

        let prefix = "T - ";
        if (seconds < 0) {
            prefix = "T + ";
            seconds = -seconds;
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        seconds = seconds % 60;

        if (difference > -1000 && difference <= 0) {
            // Manejar el segundo exacto del evento de lanzamiento
            countdownElement.textContent = "T + 00 : 00 : 00";
        } else {
            countdownElement.textContent = `${prefix}${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
        }
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}

function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('showCountdown')) {
        document.getElementById('title').classList.add('hidden');
        document.getElementById('input-container').classList.add('hidden');
        const launchTime = urlParams.get('launchTime');
        if (launchTime) {
            document.getElementById('launchTime').value = launchTime;
            startCountdown();
        }
    }
}

document.addEventListener('DOMContentLoaded', checkUrlParams);
