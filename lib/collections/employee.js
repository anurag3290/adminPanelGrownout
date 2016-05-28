Employee = new Meteor.Collection('employee', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.Employee = new SimpleSchema({
  name: {type: String},
  amoebaId: {type: String},
  company: {type: String},
  location: {
  	type: String,
    optional: true
  },
  pictureUrl: {
  	type: String,
    optional: true
  },
  headline: {
  	type: String,
    optional: true
  },
  createdAt: {
    type: String
  },
  modifiedAt: {
    type: String
  },
  matchedEmailIds: {
    type: [Object]
  },
  "matchedEmailIds.$.email": {
    type: String
  },
  "matchedEmailIds.$.count": {
    type: Number,
    optional :true
  },
  "matchedEmailIds.$.probability": {
    type: Number,
    optional :true
  }
});

Employee.attachSchema(Schemas.Employee);


