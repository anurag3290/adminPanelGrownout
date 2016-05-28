Recruiter = new Meteor.Collection('recruiter', {idGeneration: 'MONGO'} );

var Schemas = {};

//Account Type :-
// 0 - Admin
// 1 - Recruiter/Hr 

Schemas.Recruiter = new SimpleSchema({
	name: {
		type: String,
		regEx: globalRegex.fullName,
	},
	firstName: {
		type: String,
		regEx: globalRegex.halfName,
		optional: true
	},
	lastName: {
		type: String,
		regEx: globalRegex.halfName,
		optional: true
	},
	designation: {
		type: String,
		regEx: globalRegex.designation
	},
	emailAddress: {
		type: String,
		regEx: globalRegex.emailAddress
	},
	pictureUrl: {type: String, optional: true},
	company: {type: String},
	customId :{type :String, optional: true},
	recruiterName :{type :String,optional :true},
	account :{
		type : Object
	},
	'account.type' :{ //0 for admin recruiter, 1 for sub recruiter
		type :Number
	},
	'account.policy' :{
	   type : Boolean
	},
	saasActivation :{
		type : Object,
		optional: true
	},
	"saasActivation.activated" :{
		type : Boolean,
		optional : true
	},
	"saasActivation.activatedAt" :{
		type : Date,
		optional : true
	},
	"saasActivation.type" :{ // 0: Demo model, 1: premium, 2: referral
		type : Number,
		optional : true
	},
	location:{
    type:Object,
    optional: true
  },
  "location.city" : {
  	type: String,
  	regEx: globalRegex.city,
  	optional: true
  },
	"location.country" : {
	  type: String,
	  optional: true
	},
	password :{
		type :String,
		optional: true
	},
	passwordModified :{
		type :Date,
		optional: true
	},
	phone :{
		type :Object,
		optional: true
	},
	'phone.mobile' :{
		type :String,		
		regEx: globalRegex.mobileNo,
		optional: true
	},
	'phone.landline' :{
		type :Number,
		optional: true
	},
	analytics :{
		type :Object,
		optional: true
	},
	'analytics.numberLogins':{
		type :Number,
		optional: true
	},
	'analytics.loginReminderNum':{
		type :Number,
		optional: true
	},
	createdAt :{
		type : Date
	},
	modifiedAt :{
		type : Date
	},
	status: { //Recruiter activated - true or else false
		type: Boolean
	},
	lastLogin: {
		type: Date,
		optional: true
	},
	firstLogin: {
		type: Boolean
	},
	passwordToken: {
		type: Object, optional: true
	},
	"passwordToken.key": {
		type: String, optional: true
	},
	"passwordToken.expiry": {
		type: Date, optional: true
	},
	"passwordToken.status": {  // false for link not used, true if link is already used up
		type: Boolean, optional: true
	},
	adminType : {
		type :Number,	//'0'	for superadmin and '1' for normal
		optional: true
	},
	permission : {
		type: Object, optional: true
	},
	"permission.login" : {
		type :Boolean,//'true' can login in recruiters account and 'false' for Cannot
		optional: false
	},
	"permission.uploadLogo" : {
		type :Boolean,//'true' can upload company's logo on product and 'false' for Cannot
		optional: false
	},
	"permission.populateEmails" : {
		type :Boolean,//'true' can populate emails for the newly activate recruiter's account and 'false' for Cannot
		optional: false
	},
	model:{	// 0: Only referral type, 1: Only RDX type, 2: Both referral and RDX 
		type :Number,
		optional: true
	},
	requestReferral:{ // Recruiter asking for upgrade to referral from XS model
		type: Boolean,
		optional: true
	},
	accountExpiry:{ 
		type: Date,
		optional: true
	},
	firstLoginTime: {
		type: Date,
		optional: true
	}
});

Recruiter.attachSchema(Schemas.Recruiter);