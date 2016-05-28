CandidateIntro = new Meteor.Collection('candidateIntro', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.CandidateIntro = new SimpleSchema({
	name : {
		type: String
	},
	profile_url: {
		type: String,
		optional: true
	},
	amoebaId: {
		type: String
	},
	modifiedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	},
	recruiter: {
		type: [String],   // Array of recruiters Id
		optional : true
	},
	email : {
		type: String,
		optional: true
	},
	connected : {
		type: Boolean    // false if not connected and true if all are connected
	}
})

CandidateIntro.attachSchema(Schemas.CandidateIntro);