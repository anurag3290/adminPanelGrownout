Company = new Meteor.Collection('company', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.Company = new SimpleSchema({
  name: {
  	type: String,
		regEx: globalRegex.companyName,
  	optional: true
  },
  description: {
  	type: String,
  	regEx: globalRegex.companyDescription,
  	optional: true
  },
  websiteLink: {type: String, optional: true},
  emailAddress: {
  	type: String,
  	regEx: globalRegex.emailAddress,
  	optional: true
  },
  color: {type: String, optional: true},
  phone: {
  	type: String,
  	regEx: globalRegex.mobileNo,
  	optional: true
  },
  logoUrl: {type: String, optional: true},
  companyId: {type: String, optional: true},
  domain : {type: [String], optional: true},
  referralPolicy: {
  	type: String,
  	optional: true
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
	"location.address" : {
	  type: String,
	  regEx: globalRegex.address,
	  optional: true
	},
	"location.pin" : {
	  type: String,
	  regEx: globalRegex.pincode,
	  optional: true
	},
	strength :{
      type : Number,
      optional : true
	},
	reinviteLimit:{
		type :String,
		optional: true
	},
	accountExpiry :{
	  type : Object,
	  optional: true
	},
	'accountExpiry.days':{
	  type : Number,
	  optional: true
	},
  'accountExpiry.numberJobs':{
	  type: Number,
	  optional: true
	},
	'accountExpiry.grace':{
	 type: Date,
	 optional: true
	},
	account:{
		type :Object
	},
	'account.plan':{  //0 for normal
	    type: Number
	},
	'account.status':{  //True for activated, false for deactivated
	  type: Boolean
	},
	'account.activationDate':{
	  type: Date
	},
  'account.jobCount':{
      type: Number,
      optional: true
  },
  'account.xsJobCount':{
      type: Number,
      optional: true
  },
  'account.recruiterCount':{
      type: Number,
      optional: true
  },
  'account.salarynotReq':{
      type: Boolean,
      optional: true
  },
  'stats' :{
    type :Object,
    optional: true
  },
  'stats.networkCount':{
    type :Number,
    optional :true
  },
  'stats.empCount':{
    type :Number,
    optional :true
  },
  'actualStats' :{
    type :Object,
    optional: true
  },
  'stats.networkCount':{
    type :Number,
    optional :true
  },
  'stats.empCount':{
    type :Number,
    optional :true
  },
	modifiedAt :{
		type :Date
	},
	createdAt: {
		type: Date
	},
  paid : {
    type: Boolean,
    optional :true
  }
});

Company.attachSchema(Schemas.Company);