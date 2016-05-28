JobAts = new Meteor.Collection('jobats', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.JobAts = new SimpleSchema({
	candidate : {type: String},  // amoebaId Id of candidate
	recruiter: {type: String},
	company: {type: String},
	job: {type: String},
	referTrack: {type: [Object], optional: true},
	"referTrack.$.employee": {type: String, optional: true}, // _id._str of employee
	"referTrack.$.amoebaId" : {type: String, optional: true},
	"referTrack.$.name" : {type: String, optional: true},
	// "referTrack.$.headline" : {type: String, optional: true},
	// "referTrack.$.location" : {type: String, optional: true},
	"referTrack.$.pictureUrl" : {type: String, optional: true},
	"referTrack.$.status": {type: Number, optional: true},
	"referTrack.$.rejectMessage": {type: String, optional: true},
	"referTrack.$.recommendation": {type: String, optional: true},
	"referTrack.$.candidateMessage": {type: String, optional: true},
	"referTrack.$.candidateMessageToRec": {type: String, optional: true},
	"referTrack.$.phoneNoProvided": {type: Boolean, optional: true},
	"referTrack.$.timestamp": {type: Date, optional: true},
	"referTrack.$.reminderNumber": {type: Number, optional: true},
	interviews: {type: [Object], optional: true},
	"interviews.$.startTime": {type: Date, optional: true},
	"interviews.$.endTime": {type: Date, optional: true},
	status: {type: Number},
	lastState: {type: Number, optional: true},
	referAccept: {type: Boolean, optional: true},
	message: {type: String, optional: true},
	createdAt: {type: Date},
	modifiedAt: {type: Date},
	rejectMessage: {type: String, optional: true},
	hmRecomMessage: {type: String, optional: true},
	forwardReferReminder: {type: Number, optional: true}, // currently it can be max 2
	forwardReferDate: {type: Date, optional: true},
	requestedIntroduce: {type: Boolean, optional: true}, // true if recruiter wants introduction of that candidate
	model:{type :Number, optional: true}// 0: Only referral type, 1: Only RDX type
});

JobAts.attachSchema(Schemas.JobAts);

/* Candidate Status Documentation
  -1 - if hm approve but email not exist (employee)
	0 - save for later
	1 - shortlisted by hr
	2 - sent for hm approvall
	3 - mail opened by hm
	4 - hm open link
	5 - approved by hm
	6 - rejected by hm
	7 - ask refer      // employee forwarded refer to candidate
	8 - candidate apply
	9 - interview scheduled
	10- candidate rejected by employee
	11- reject by hr
	12- candidate clicked not interested 
	13- removed from list
	14 -  ask refer mail sent to atlest one Employee
*/

/* Refer Status Documentation
	mail open tracking everywhere(low priority)
	0 - before ask refer
	1 - Ask refer
	2 - mail opened by employee (low priority)    
	3 - link opened by employee
	4 - forwarded refer
	5 - report to hr/employee rejects candidates
	6 - mail opened by candidate (low priority)
	7 - link opened by candidate
	8 - candidate interested
	9 - candidate applied
	10- candidate reject
*/