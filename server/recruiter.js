Crypto    = Meteor.npmRequire('ezcrypto').Crypto
bcrypt    = Meteor.npmRequire('bcrypt-nodejs');

Meteor.publish('userData', function () {
	if (this.userId){
		return Meteor.users.find({_id: this.userId});
	}
	else 
		this.ready();
});

Meteor.publish('recruiter',function(companyId){
	if (this.userId){
		if(companyId){
			return Recruiter.find({company:companyId})
		}
		else{
			return Recruiter.find()
		}
	}
});

Meteor.publish('company',function(companyId){
	if (this.userId){
		if(companyId){
			return Company.find({_id:meteorToMongo(companyId)})
		}
		else{
			return Company.find()
		}
	}
});

Meteor.publish('jobCount',function(){
	if (this.userId){
		return Job.find({},{fields:{company:1}})
	}
});

Meteor.publish('recruiterModel',function(){
	if (this.userId){
		return Recruiter.find({},{fields:{model:1,emailAddress:1}})
	}
});

Meteor.publish('companyName',function(companyId){
	if (this.userId){
		if(companyId){
			return Company.find({_id:meteorToMongo(companyId)},{fields: {"name":1}})
		}
		else{
			return Company.find({},{fields: {"name":1}})
		}
	}
});

Meteor.publish('recruiterAtJobdetail',function(companyId){
	if(this.userId){
		if(companyId){
			return Recruiter.find({company:companyId},{fields: {"name":1,"permission":1,"status":1,"password":1,"emailAddress":1}})
		}
		else{
			return Recruiter.find({},{fields: {"name":1}})
		}
	}
});


Meteor.publish('currentRecruiter',function(recId){
	if (recId){
		return Recruiter.find({_id:meteorToMongo(recId)},{fields: {"name":1,"permission":1,"status":1,"password":1,"emailAddress":1}})
	}
	else{
		return Recruiter.find({},{fields: {"name":1}})
	}
});

Meteor.publish('companyCounts', function() {
  Counts.publish(this, 'companyCounts', Company.find());
});

Meteor.publish('registrationCounts', function() {
  Counts.publish(this, 'registrationCounts', Registration.find());
});

Meteor.publish('jobCounts', function() {
  Counts.publish(this, 'jobCounts', Job.find());
});

Meteor.publish('activeJobCounts', function() {
  Counts.publish(this, 'activeJobCounts', Job.find({status:1}));
});

Meteor.publish('registration',function(){
	if (this.userId){
		return Registration.find()
	}
});

Meteor.publish('job',function(companyId){
	if (this.userId){
		if(companyId){
			return Job.find({company:companyId},{fields:{title:1,location:1,skills:1,candidateCount:1,postedBy:1,company:1,description:1,status:1}})
		}
		else{
			return Job.find()	
		}
	}
});

Meteor.publish('candidateIntro',function(){
	if (this.userId){
		return CandidateIntro.find({connected: false})
	}
});

Accounts.registerLoginHandler('login',function(loginRequest) {
	var request = loginRequest.loginData
	var domain_text = request.email.substr(request.email.lastIndexOf("@")+1,request.email.lastIndexOf("m"));

	if(domain_text != "grownout.com"){
			return undefined;
	}
	else{

		var recruiter = Recruiter.findOne({emailAddress: request.email, adminType: { $in: [ 0, 1 ] } })
		if (!recruiter){
			return undefined
		}
		else {
			if(recruiter.password && bcrypt.compareSync(request.pass, recruiter.password)){
				var userData =  { 
					email: recruiter.emailAddress,
					recruiter: recruiter._id._str,
					adminType : recruiter.adminType
				}

				var user = Meteor.users.findOne(userData);
				if(!user || user == undefined) {
					userId = Meteor.users.insert(userData);
					return {
						userId: userId
					}
				} 
				else {
					return {
						userId: user._id
					}
				}
			}
			else{
				return undefined;
			}
		}
	}
})


Recruiter.allow({
	update: function (userId, party,fields, modifier) {
		var user = Meteor.users.findOne({_id:userId})
		var domain = user.email.split("@")[1]
		var allowed = ['permission']
		
		if(_.difference(fields, allowed).length){
			return false
		}
		else{
			if(user && user.recruiter && domain == "grownout.com" && user.adminType==0){
				console.log('success')
				return true
			}
			else{
				return false
			}
		}
	}
});

Meteor.users.allow({
	update: function (userId, party,fields, modifier) {
		var user = Meteor.users.findOne({_id:userId})
		var domain = user.email.split("@")[1]
		var allowed = ['profile.selectedCompany']
		if(_.difference(fields, allowed).length){
			return false
		}
		else{
			if(user && user.recruiter && domain == "grownout.com"){
				console.log('success')
				return true
			}
			else{
				return false
			}
		}
	}
});