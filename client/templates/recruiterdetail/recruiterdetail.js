Template.recruiterdetail.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
}

Template.recruiterdetail.helpers({
	'recDetail': function(){
		var compId = Iron.Location.get().queryObject.company
		if (Recruiter.find({company: compId}).count()){
			return Recruiter.find({company: compId})
		}
		else return false
	},
	'compName': function(){
		var compId = Iron.Location.get().queryObject.company
		if(Company.findOne({_id : meteorToMongo(compId)})){
			return Company.findOne({_id : meteorToMongo(compId)}).name
		}
	},

	'checkUserType': function(){
		if (Meteor.user() && Meteor.user().email && Recruiter.findOne({emailAddress:Meteor.user().email})){
			var canLogin = Recruiter.findOne({emailAddress:Meteor.user().email})
			if(canLogin && canLogin.permission && canLogin.permission.login){
				return true
			}
		}
	},
	'checkAdminType': function(){
		if(this.account.type){
			return this.account.type
		}
		else{
			if(this.account.type==0){
				return 0
			}
			return 1			
		}
	},
	'mailSentAlready': function(){
		if(this.passwordToken)
			return false
		else
			return true
	},
	'checkStatus': function(){
		return this.status
	},
	'checkPassword': function(){
		return this.password
	}

});

Template.recruiterdetail.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('recdetailTable', searchKey)
	},
	'click .login': function(){
		userId = Meteor.user().recruiter
		recId = this._id._str
		Meteor.call('loginRecruiter', recId, userId,function (err, res){
			if(err){
				console.log(err)
			}
			else{
				console.log(res)
				window.open(globals.website+'proxyLogin?auth='+res,'_blank');
			}
		});
	},
	'click .activationMail': function(event, template){
		var parent = $(event.target).closest('tr')
		var child = $(parent).find('.recruiterdetail_modal')
		$(child).modal('show')
	},
});


Template.recruiterdetail_modal.events({
	'click .populate': function(event, template){
		var company = Company.findOne({_id:meteorToMongo(this.company)});
		
		if(company){
			// if(company.stats && company.stats.networkCount && company.stats.empCount){
				Meteor.call('sendAccountActivationMail', this, function(error, res){
					if(error){
						Notifications.error('', error);
					}
					else{
						if(res.error){
							Notifications.error('', res.error);
						}
						else{
							$('.recruiterdetail_modal').modal('hide')
							Notifications.success('', 'Successfully sent activation mail');
						}
					}
				})
			// }
			// else{
			// 	Notifications.error('', 'Please update network and employee of the company');
			// 	Router.go('/companydetail?company='+this.company)
			// }
		}
		else{
			Notifications.error('', 'Unable to send mail, Please contact technical team');
		}
	},
});
