Job = new Meteor.Collection('job', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.Job = new SimpleSchema({
	referenceNo: {
		type: String,
		optional: true
	},
	title: { 
   		type: String,
   		regEx: globalRegex.jobTitle
 	 },
 	skills: {
		type: [String]
	},
	// location: {
	// 	type: String
	// },
	location: {
		type: Object
	},
	"location.city": {
		type: String
	},
	"location.country": {
		type: String
	},
	position: {
		type: String,
		regEx: globalRegex.jobPosition
	},
	salary: {
		type: Object,
		optional: true
	},
	"salary.amount" : {
		type: String
	},
	"salary.lower" : {
		type: String,
		regEx: globalRegex.jobSalary
	},
	"salary.higher" : {
		type: String,
		regEx: globalRegex.jobSalary
	},
	referralBonus: {
		type: String,
		regEx: globalRegex.jobReferalBonus
	},
	description: {
		type: String
	},
	status: { //0-draft, 1-active, 2-closed, 3-deleted
		type: Number
	},
	company: {
		type: String
	},
	postedBy : {
		type: String
	},
  createdAt : {
    type: Date
  },
  modifiedAt: {
  	type: Date
  },
  closeDate: {
  	type: Date
  },
	analytics: {
		type: Object,
		optional: true
	},
	"analytics.shortlistConnection" : {
		type: [String],
		optional: true
	},
	"analytics.numberApplied" : {
		type: Number,
		optional: true
	},
	"analytics.successConnection" : {
		type: [String],
		optional: true
	},
	experience: {
		type: Object
	},
	"experience.min": {
		type: String,
		regEx: globalRegex.jobExp
	},
	"experience.max": {
		type: String,
		regEx: globalRegex.jobExp
	},
	benefit: {
		type: String,
		optional: true
	},
	hm: {
		type: String
	},
	education: {
		type: String,
		optional: true
	},
	closeJdReason : {
		type: String,
		optional: true
	},
	candidateCount: {    // available candidate count for the job
		type: Object,
		optional: true
	},
	"candidateCount.value": {
		type: Number,
		optional: true
	},
	"candidateCount.timestamp": {
		type: Date,
		optional: true
	}
});

Job.attachSchema(Schemas.Job);

SimpleSchema.messages({
  'regEx position': [
	    {exp: SimpleSchema.RegEx.position, msg: 'Number of positions must be a positive integer'}
	  ],
  'regEx referralBonus': [
    {exp: SimpleSchema.RegEx.referralBonus, msg: 'Referral bonus must be a positive integer'}
  ],
  'regEx salary.higher': [
    {exp: SimpleSchema.RegEx.referralBonus, msg: 'Higher salary range must be a positive integer'}
  ],
  'regEx salary.lower': [
    {exp: SimpleSchema.RegEx.referralBonus, msg: 'Lower salary range must be a positive integer'}
  ]
});
