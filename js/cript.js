const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');
let isJumping = false;
let position = 0;
let playerScore = 0;

const keydownHandler = (e) => {
	if (e.keyCode === 32) {
		if (!isJumping) {
			jump();
		}
	}

}

const updateScore = () => {
	if (playerScore < 10) {
		score.innerHTML = 'SCORE: 00' + playerScore;
		return;
	}

	if (playerScore < 100) {
		score.innerHTML = 'SCORE: 0' + playerScore;
		return;
	}

	score.innerHTML = 'SCORE: ' + playerScore;
	return;
}

const jump = () => {
	isJumping = true;
	let speed = 20;

	let upInterval = setInterval(() => {
		if (position >= 150) {
			speed *= -1;
		}

		position += speed;
		dino.style.bottom = position + 'px';

		if (speed < 0 && position <= 0) {
			position = 0;
			speed *= -1;
			clearInterval(upInterval);
			isJumping = false;
		}
	}, 20);
}


const createCactus = () => {
	const cactus = document.createElement('div');
	cactus.classList.add('cactus');
	let cactusPosition = 1000;
	let cactusSpeed = 10;


	cactus.style.left = cactusPosition + 'px';
	let randomTime = (Math.random() * 6000) + 1000;



	background.appendChild(cactus);

	let leftInterval = setInterval(() => {
		cactusPosition -= 10;
		cactus.style.left = cactusPosition + 'px';

		if (cactusPosition < -60) {
			clearInterval(leftInterval);
			background.removeChild(cactus);
		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {

			clearInterval(leftInterval);
			document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
		} else {
			cactusPosition -= 10;
			cactus.style.left = cactusPosition + 'px';
		}

	}, 20);
	setTimeout(createCactus, randomTime);
}
createCactus();

document.addEventListener('keydown', keydownHandler);