Registration = new Meteor.Collection('registration', {idGeneration: 'MONGO'} );

var Schemas = {};

//Account Type :-
// 0 - Admin
// 1 - Recruiter/Hr 

Schemas.Registration = new SimpleSchema({
	name: {type: String},
	designation: {type: String},
	emailAddress: {type: String},
	url: {type: String, optional: true},
	companyName: {type: String},
	activated: {type: Boolean, optional: true},
	phone: {type: Number, optional: true},
	strength: {type: String, optional: true},
	createdAt :{
		type : Date
	},
	modifiedAt :{
		type : Date
	},
	saas :{
		type : Boolean,
		optional : true
	}
});

Registration.attachSchema(Schemas.Registration);