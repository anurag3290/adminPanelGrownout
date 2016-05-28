reactiveVar = new ReactiveVar('');
reactiveVar1 = new ReactiveVar('');
reactiveVar2 = new ReactiveVar('');
reactiveVar3 = new ReactiveVar('');
reactiveVar4 = new ReactiveVar('');		//Company Page
companyModel = new ReactiveVar('');		//Company Page
reactiveVar9 = new ReactiveVar('');
reactiveVar10 = new ReactiveVar('');


Deps.autorun(function () {
	Meteor.subscribe('userData');
})

// Meteor.subscribe('recruiter');
// Meteor.subscribe('company');
// Meteor.subscribe('registration')
// Meteor.subscribe('job');
// Meteor.subscribe('candidateIntro');