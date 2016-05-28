companyDataDetails = new Meteor.Collection('companyEmail', {idGeneration: 'MONGO'} );

var Schemas = {};

Schemas.companyDataDetails = new SimpleSchema({
    companyId:{
      type :String
    },
    total:{
      type :[String]
    },
    savedEmails:{
      type :[String]
    },
    unMatchedEmails :{
      type :[String]
    }
});

companyDataDetails.attachSchema(Schemas.companyDataDetails);
