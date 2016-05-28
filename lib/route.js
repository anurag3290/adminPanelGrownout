Router.configure({
	// layoutTemplate: 'main',
	loadingTemplate: 'loading'
});

Router._filters = {
	resetScroll: function () {
		$('html, body').animate({scrollTop:0}, 'slow') // to sroll up the page to the top whenever route will change
	}
};

var filters = Router._filters;

if(Meteor.isClient) {
	Router.onAfterAction(filters.resetScroll); // for all pages
}

function userWaitOn(){
	var user = Meteor.user()
	if(user){
		return (Meteor.subscribe('userData'))
	}	else{
		Meteor.logout()
		Router.go('login')
	}
}


Router.route('/login', {
	name: 'login',
	template: 'login',
	onBeforeAction: function(){
		if(Meteor.user()){
			Router.go('dashboard')
		}
		else{
			this.next()
		}
	}
});

Router.route('/dashboard', {
	name: 'dashboard',
	template: 'dashboard',
	waitOn: function(){
		return (userWaitOn() && Meteor.subscribe('companyCounts') && Meteor.subscribe('registrationCounts') && Meteor.subscribe('jobCounts') && Meteor.subscribe('activeJobCounts'))
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/company', {
	name: 'company',
	template: 'company',
	waitOn: function(){
		return (userWaitOn() && Meteor.subscribe('company') && Meteor.subscribe('recruiterModel') && Meteor.subscribe('jobCount'))
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/enquires', {
	name: 'enquires',
	template: 'enquires',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/userspermission', {
	name: 'userspermission',
	template: 'userspermission',
	waitOn: function(){
		return (userWaitOn() && Meteor.subscribe('recruiter'))
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/productRegistration', {
	name: 'productRegistration',
	template: 'productRegistration',
	waitOn: function(){
		return (userWaitOn() && Meteor.subscribe('registration'))
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/websiteRegistration', {
	name: 'websiteRegistration',
	template: 'websiteRegistration',
	waitOn: function(){
		return (userWaitOn() && Meteor.subscribe('registration'))
	},
	onBeforeAction: function(){
		this.next()
	}
});


Router.route('/demorequest', {
	name: 'demorequest',
	template: 'demorequest',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/changepasswd', {
	name: 'changepasswd',
	template: 'changepasswd',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/recruiterdetail', {
	name: 'recruiterdetail',
	template: 'recruiterdetail',
	waitOn: function(){
		var compId = Iron.Location.get().queryObject.company
		var user = Meteor.user()
		if(compId && user){
			return (userWaitOn() && Meteor.subscribe('recruiter',compId) && Meteor.subscribe('companyName',compId) && Meteor.subscribe('currentRecruiter',user.recruiter))
		}
		
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/companydetail', {
	name: 'companydetail',
	template: 'companydetail',
	waitOn: function(){
		var compId = Iron.Location.get().queryObject.company
		if(compId){
			return (userWaitOn() && Meteor.subscribe('company',compId))
		}
		else{
			Router.go('dashboard')
		}		
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/jobdetail', {
	name: 'jobdetail',
	template: 'jobdetail',
	waitOn: function(){
		var compId = Iron.Location.get().queryObject.company
		var user = Meteor.user()
		if(compId && user){
			return (userWaitOn() && Meteor.subscribe('job',compId) && Meteor.subscribe('companyName',compId) && Meteor.subscribe('recruiterAtJobdetail',compId) && Meteor.subscribe('currentRecruiter',user.recruiter))
		}
		else{
			return (userWaitOn() && Meteor.subscribe('job') && Meteor.subscribe('companyName'))
		}
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/potentialcompanies', {
	name: 'potentialcompanies',
	template: 'potentialcompanies',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/preMeeting', {
	name: 'preMeeting',
	template: 'preMeeting',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});

Router.route('/candidateEmailInfo', {
	name: 'candidateEmailInfo',
	template: 'candidateEmailInfo',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});


Router.route('/encryptDecrypt', {
	name: 'encryptDecrypt',
	template: 'encryptDecrypt',
	waitOn: function(){
		return userWaitOn()
	},
	onBeforeAction: function(){
		this.next()
	}
});


Router.route('/(.*)', {
	onBeforeAction: function(){
		Router.go('dashboard')
	}
});