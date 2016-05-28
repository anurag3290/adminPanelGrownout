var clock = 50;

var timeLeft = function() {
	//Reactive Variable emptied for registraion Reports Page
	if(reactiveVar.get()){
		var idle_time = reactiveVar.get().time;
		var current_time = new Date().getTime();
		if ((current_time - idle_time) > 2000000){
			console.log('reactiveVar')
			reactiveVar.set('');
		}
	}

	//Reactive Variable emptied for Enquires Page
	else if(reactiveVar1.get()){
		var idle_time = reactiveVar1.get().time;
		var current_time = new Date().getTime();
		if ((current_time - idle_time) > 2000000){
			console.log('reactiveVar1')
			reactiveVar1.set('');
		}
	}

	//Reactive Variable emptied for Demo Request Page
	else if(reactiveVar2.get()){
		var idle_time = reactiveVar2.get().time;
		var current_time = new Date().getTime();
		if ((current_time - idle_time) > 2000000){
			console.log('reactiveVar2')
			reactiveVar2.set('');
		}
	}

	//Reactive Variable emptied for Users Permission Page
	else if(reactiveVar3.get()){
		var idle_time = reactiveVar3.get().time;
		var current_time = new Date().getTime();
		if ((current_time - idle_time) > 2000000){
			console.log('reactiveVar3')
			reactiveVar3.set('');
		}
	}

};

interval = Meteor.setInterval(timeLeft, 1000);

