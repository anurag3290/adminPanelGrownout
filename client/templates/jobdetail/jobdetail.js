Template.jobdetail.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
	var compId = Iron.Location.get().queryObject.company
	Meteor.subscribe('job',compId) 
	Meteor.subscribe('companyName',compId)
}



Template.jobdetail.helpers({
	'jobCount': function(){
		var compId = Iron.Location.get().queryObject.company
		if(compId){
			return Job.find({company : compId}).count()
		}
	},

	'compName': function(){
		var compId = Iron.Location.get().queryObject.company
		if(Company.findOne({_id : meteorToMongo(compId)})){
			return Company.findOne({_id : meteorToMongo(compId)}).name
		}
	},

	'jobDetail': function(){
		var compId = Iron.Location.get().queryObject.company
		if (Job.find({company: compId}).count()){
			return Job.find({company: compId})
		}
		else return false
	},
	
	'jobType': function(){
		if(this.model){
			return true
		}
		else{
			return false
		}
	},

	'recruiter': function(){
		this.recruiter = Recruiter.findOne({_id:meteorToMongo(this.postedBy)})
		if(this.recruiter)
			return this.recruiter.name
	},

	'checkUserType': function(){
		var user = Meteor.user()
		if(user){
			var rec = Recruiter.findOne({_id:meteorToMongo(user.recruiter)})
			if(rec){
				if(rec.permission && rec.permission.login){
					return true
				}
				else{
					return false
				}
			}
		}
	},
	'checkStatus': function(){
		if(this && this.recruiter)
			return this.recruiter.status
	},
	'checkPassword': function(){
		if(this && this.recruiter)
			return this.recruiter.password
	},
	'jobStatus' : function(){
		switch(this.status){
			case 0 : return 'draft'
				break;
			case 1 : return 'active'
				break;
			case 2 : return 'closed'
				break;
			default : return '--'
				break
		}
	}
});

Template.jobdetail.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('jobDetailTable', searchKey)
	},

	'click .desc' : function(event){
		var parent = $(event.target).closest('tr')
		var child = $(parent).find('.desc')
		Session.set('companyModal',this)
		$('.descriptionModal').modal('show')
	},

	'click .login': function(){
		userId = Meteor.user().recruiter
		recId = this.postedBy
		Meteor.call('loginRecruiter', recId, userId,function (err, res){
			if(err){
				console.log(err)
			}
			else{
				window.open(globals.website+'proxyLogin?auth='+res,'_blank');
			}
		});
	},
});

Template.descriptionModal.helpers({
	'modalJobName': function(){
		var job = Session.get('companyModal')
		if(job){
			return job.title
		}
	},
	'modalJobDescription': function(){
		var job = Session.get('companyModal')
		if(job && job.description){
			return job.description.replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g, ' ')
		}
		else{
			return ''
		}
	},
});