// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const cursor = document.getElementById('cursor');
    const timerDisplay = document.getElementById('timer');
    let asteroidFrequency = 0; // Delay between asteroids
    let asteroidSpeed = 10; // Initial speed at which asteroids move
    let gameOver = false;
    const speedIncreaseInterval = 1000; // Increase speed every 1 second
    const speedIncreaseFactor = 0.3; // Speed increase factor
    let startTime = Date.now();

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`;
        cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
    });

    function createExplosion(x, y) {
        const explosionCount = 12;
        for (let i = 0; i < explosionCount; i++) {
            const explosion = document.createElement('div');
            explosion.className = 'explosion';
            const offsetX = (Math.random() - 0.5) * 50;
            const offsetY = (Math.random() - 0.5) * 50;
            explosion.style.left = `${x + offsetX - 40}px`; // Adjusted to center explosion
            explosion.style.top = `${y + offsetY - 40}px`;  // Adjusted to center explosion
            explosion.style.animationDelay = `${Math.random() * 0.5}s`;
            gameArea.appendChild(explosion);

            setTimeout(() => {
                gameArea.removeChild(explosion);
            }, 700); // Adjusted to match animation duration
        }
    }

    function getRandomDirection() {
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }

    function getRandomAsteroidImage() {
        const asteroidImages = [
            'images/asteroid1.png',
            'images/asteroid2.png',
            'images/asteroid3.png',
			'images/asteroid4.png',
			'images/asteroid5.png',
            // Add more images as needed
        ];
        const randomIndex = Math.floor(Math.random() * asteroidImages.length);
        return asteroidImages[randomIndex];
    }

    function createAsteroid() {
        if (gameOver) return;

        const numAsteroids = Math.ceil(Math.random() * 3); // Spawn 1-3 asteroids at a time

        for (let i = 0; i < numAsteroids; i++) {
            const asteroid = document.createElement('div');
            asteroid.className = 'asteroid';
            asteroid.style.backgroundImage = `url(${getRandomAsteroidImage()})`;
            const spawnEdge = Math.floor(Math.random() * 4); // Random edge: 0 = top, 1 = right, 2 = bottom, 3 = left

            if (spawnEdge === 0) { // Top edge
                asteroid.style.left = `${Math.random() * window.innerWidth}px`;
                asteroid.style.top = `-50px`;
            } else if (spawnEdge === 1) { // Right edge
                asteroid.style.left = `${window.innerWidth + 50}px`;
                asteroid.style.top = `${Math.random() * window.innerHeight}px`;
            } else if (spawnEdge === 2) { // Bottom edge
                asteroid.style.left = `${Math.random() * window.innerWidth}px`;
                asteroid.style.top = `${window.innerHeight + 50}px`;
            } else { // Left edge
                asteroid.style.left = `-50px`;
                asteroid.style.top = `${Math.random() * window.innerHeight}px`;
            }

            gameArea.appendChild(asteroid);

            const direction = getRandomDirection();
            let moveInterval = setInterval(() => {
                if (gameOver) {
                    clearInterval(moveInterval);
                    return;
                }

                const asteroidRect = asteroid.getBoundingClientRect();
                const cursorRect = cursor.getBoundingClientRect();

                if (
                    asteroidRect.left < cursorRect.right &&
                    asteroidRect.right > cursorRect.left &&
                    asteroidRect.top < cursorRect.bottom &&
                    asteroidRect.bottom > cursorRect.top
                ) {
                    gameOver = true;
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.border = '2px solid red';
                    cursor.style.borderRadius = '50%';

                    createExplosion(cursorRect.left + cursorRect.width / 2, cursorRect.top + cursorRect.height / 2);

                    setTimeout(() => {
                        alert(`Game Over! You survived for ${((Date.now() - startTime) / 1000).toFixed(2)} seconds. Reload the page to play again.`);
                    }, 700); // Delay the alert to allow explosion animation to play
                    clearInterval(moveInterval);
                }

                if (asteroidRect.bottom < 0 || asteroidRect.top > window.innerHeight || asteroidRect.right < 0 || asteroidRect.left > window.innerWidth) {
                    gameArea.removeChild(asteroid);
                    clearInterval(moveInterval);
                } else {
                    asteroid.style.left = `${asteroidRect.left + direction.x * asteroidSpeed}px`;
                    asteroid.style.top = `${asteroidRect.top + direction.y * asteroidSpeed}px`;
                }
            }, 20);
        }

        setTimeout(createAsteroid, asteroidFrequency);
    }

    function increaseDifficulty() {
        if (gameOver) return;
        asteroidSpeed += speedIncreaseFactor;
        setTimeout(increaseDifficulty, speedIncreaseInterval);
    }

    function updateTimer() {
        if (gameOver) return;
        const elapsedTime = (Date.now() - startTime) / 1000;
        timerDisplay.textContent = `Time: ${elapsedTime.toFixed(2)}s`;
        requestAnimationFrame(updateTimer);
    }

    createAsteroid();
    setTimeout(increaseDifficulty, speedIncreaseInterval);
    requestAnimationFrame(updateTimer);
});
