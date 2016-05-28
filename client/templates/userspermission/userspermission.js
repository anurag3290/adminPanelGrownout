Template.userspermission.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);
}

Template.userspermission.helpers({
	'usersperm': function(){
		var regex = /^.+@grownout\.com$/
		return Recruiter.find({emailAddress:{ $regex:regex}}).fetch()
	},

	'loginStatus': function(){
		if(this.permission){
			return this.permission.login 
		}
		else{
			return false
		}
	},

	'uploadLogo': function(){
		if(this.permission){
			return this.permission.uploadLogo 
		}
		else{
			return false
		}
	},

	'populateEmails': function(){
		if(this.permission){
			return this.permission.populateEmails 
		}
		else{
			return false
		}
	},

	'checkAdmin': function(){
		if(this.account.type){
			return this.account.type
		}
		else{
			if(this.account.type==0){
				return 0
			}
			return 1			
		}
	}
});

Template.userspermission.events({
	'click .submit': function(event, template){
		var parent = $(event.target).closest('tr')
		var child1 = $(parent).find('.canLogin')
		var child2 = $(parent).find('.uploadLogo')
		var child3 = $(parent).find('.canPopEmails')

		Recruiter.update(this._id, {
			$set: {'permission.login': child1[0].checked}
		});
		Recruiter.update(this._id, {
			$set: {'permission.uploadLogo': child2[0].checked}
		});
		Recruiter.update(this._id, {
			$set: {'permission.populateEmails': child3[0].checked}
		});
		Notifications.success('','Permissions Updated!!')
	}
});
