$(function () {
	
	let score = 0;
	let hp = 5;
	let time = 2000;
	let divisor = 1.5;
	let current;
	let audio = document.getElementById('audio');
	let playb = 1;
	let clock = 30;
	let songs = ['Chop.mp3', 'Drink.mp3', 'fox.mp3', 'Giorgio Mastrota.mp3', 'Guardians of Asgaard.mp3', 'Inis Mona.mp3', 'Keelhauled.mp3', 'Night Witches', 'Rasputin.mp3', 'skyrim.mp3', 'Through.mp3', 'Twilight.mp3'];
	let player = $("#audio");
	let songN = Math.floor((Math.random() * 11) + 1);
	let actSong = songs[songN];
	let modalita = "30 sec";


	$('#song').attr('src', actSong);
	player[0].pause();
	player[0].load();

	function blank(){
		$('.tana').removeClass('red');
		$('.tana').removeClass('green');
		$('.tana').removeClass('diglett');
	}

	function getRandom() {
		return Math.floor((Math.random() * 9) + 1);
	}

	function play(){
		setTimeout(function(){
			blank();
			current = getRandom();
			$('.num' + current).addClass('diglett');
			play();
		}, time);
	}	

	function gameover(){
		time = 1000000;
		totalScore = score + (hp * 2);
		$('.score').text('Score: ' +totalScore);
		$('.lost').removeClass('hide');
		$('.dark').show();
	}

	function clockTick(){
		setTimeout(function(){
			 if (clock > 0) {
			 	clock--;
			 	$('.time').text('Time: ' + clock);
			 	clockTick();
			 } else {
			 	gameover();
			 }
		}, 1000);
	}


	



	$('.tana').on('click', function(){
		if( $(this).hasClass('diglett') && hp > 0 && !($(this).hasClass('green')) ) {
			score++;
			time = time/divisor;
			if (divisor >= 1) {
				divisor -= 0.1;
			}
			if (playb < 2) {
				audio.playbackRate = playb;
				playb += 0.1;
			}
			$('.score').text('Score: ' + score);
			$(this).addClass('green');
		} else if ( hp > 0 ) {
			hp--;
			$('.hp').text('HP: ' + hp);
			$(this).addClass('red');
		} else {
			gameover();
		}
	})
	

	function menu () {
		$('.trenta').on('click', function(){
			$('.dark').addClass('hide');
			$('.menu').addClass('hide');
			modalita = "30 sec";
			play();
			clockTick();
		})
		$('.sessanta').on('click', function(){
			clock = 60;
			$('.dark').addClass('hide');
			$('.menu').addClass('hide');
			modalita = "60 sec";
			play();
			clockTick();
		})
		$('.unlimited').on('click', function(){
			clock = '∞';
			$('.dark').addClass('hide');
			$('.menu').addClass('hide');
			$('.time').text('∞');
			modalita = "unlimited";
			play();
		})
		$('.hardcore').on('click', function(){
			clock = 15;
			time = 1500;
			hp = 1;
			$('.hp').text('HP: 1');
			$('.time').text('Time: 15');
			$('.dark').addClass('hide');
			$('.menu').addClass('hide');
			modalita = "hardcore";
			play();
			clockTick();
		})
	}

	menu();


	$('.getLeader').on('click', function(){
		$('.former').slideDown('200', function() {
			$('.submitScore').attr('value', score);
			$('.submitMod').attr('value', modalita);
		});
	})
	
})