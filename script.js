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
        let difference = launchTimeUTC - now;

        let prefix = "T - ";

        if (difference < 0) {
            difference = Math.abs(difference);
            prefix = "T + ";

            // Asegurarse de que el contador no se repita al llegar a 0
            if (Math.floor(difference / 1000) === 0) {
                difference = 1000; // 1 segundo en positivo
            }
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.textContent = `${prefix}${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
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
