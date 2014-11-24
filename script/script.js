window.onload = function() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	game = new Phaser.Game(w, h, Phaser.AUTO, '', {
		preload: preload,
		create: create,
		update: update
	});
	function preload() {
		game.load.image('flake', 'style/sprites/flake.png');
		game.load.physics('flakePhysics', 'style/sprites/flake.json');
	}

	var flake;
	
	function create() {
		game.stage.backgroundColor = '#3B5998';
		game.world.setBounds(0, 0, w, h);
		// Enabling the Arcade Physics system and setting gravity to 0
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 20;
		game.physics.arcade.gravity.x = 0;

		// Handling device rotation
		window.addEventListener("deviceorientation", function(e){
			// Handling device up-down rotation
			if(e.beta > 80 && e.beta <= 110)
				game.physics.arcade.gravity.y = 200;
			else if(e.beta > 55 && e.beta <= 80)
				game.physics.arcade.gravity.y = 100;
			else if(e.beta > 20 && e.beta <= 55)
				game.physics.arcade.gravity.y = 50;
			else if(e.beta < -20 && e.beta >= -55)
				game.physics.arcade.gravity.y = -50;
			else if(e.beta < -55 && e.beta >= -80)
				game.physics.arcade.gravity.y = -100;
			else if(e.beta < -80 && e.beta > -110)
				game.physics.arcade.gravity.y = -200;
			else
				game.physics.arcade.gravity.y = 0;
			// Handling device left-right rotation
			if(e.gamma > 80 && e.gamma <= 110)
				game.physics.arcade.gravity.x = 200;
			else if(e.gamma > 55 && e.gamma <= 80)
				game.physics.arcade.gravity.x = 100;
			else if(e.gamma > 20 && e.gamma <= 55)
				game.physics.arcade.gravity.x = 50;
			else if(e.gamma < -20 && e.gamma >= -55)
				game.physics.arcade.gravity.x = -50;
			else if(e.gamma < -55 && e.gamma >= -80)
				game.physics.arcade.gravity.x = -100;
			else if(e.gamma < -80 && e.gamma > -110)
				game.physics.arcade.gravity.x = -200;
			else
				game.physics.arcade.gravity.x = 0;
		}, true);
		
		// Adding flakes
		flakes=Array();
		for (i = 0; i < 100; i++) {
			flake = game.add.sprite((Math.random()*10000)%w, (Math.random()*10000)%h, 'flake');
			// Adding physic to the flakes (dunno which is the best method ><)
			game.physics.arcade.enableBody(flake, true);
			//game.physics.enable( [ flake ], Phaser.Physics.ARCADE);
		
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;

			flake.body.density = 2;
			
			//Mass of the flake (doesn't work...)
			flake.body.mass = (Math.random()*100)%10;
			//flake.body.solid = true;
			flakes[flakes.length]=flake;
		}
		
		for(i=0;i<100;i++){
		    for(j=0;j<100;j++){
		        game.physics.arcade.collide(flakes[i],flakes[j]);
		    }
		}/*
		
		    flake = game.add.sprite(50, 50, 'flake');
			// Adding physic to the flakes (dunno which is the best method ><)
			game.physics.arcade.enableBody(flake, true);
			//game.physics.enable( [ flake ], Phaser.Physics.ARCADE);
		
			flake.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake.body.bounce.y = 0;
			flake.body.bounce.x = 0;

			//flake.body.density = 2;
			
			//Mass of the flake (doesn't work...)
			//flake.body.mass = (Math.random()*100)%10;
		
		    flake1 = game.add.sprite(100, 50, 'flake');
			// Adding physic to the flakes (dunno which is the best method ><)
			game.physics.arcade.enableBody(flake1, true);
			//game.physics.enable( [ flake ], Phaser.Physics.ARCADE);
		
			flake1.body.collideWorldBounds = true;
			//Bounce = 0 bc they are snow flakes!
			flake1.body.bounce.y = 0;
			flake1.body.bounce.x = 0;

			//flake1.body.density = 2;
			
			//Mass of the flake (doesn't work...)
			//flake1.body.mass = (Math.random()*100)%10;
		    */
		    
		
	}
	
	function update(){
	    game.physics.arcade.collide(flakes,flakes);
	}
}


