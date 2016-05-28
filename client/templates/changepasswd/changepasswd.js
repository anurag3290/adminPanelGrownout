Template.changepasswd.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
}

Template.changepasswd.events({
	'click #savePassword' : function(event, template){
		event.preventDefault()
		var data = {
			oldPassword: template.find('#oldPassword').value.trim(),
			newPassword: template.find('#newPassword').value.trim(),
			confirmPassword: template.find('#confirmPassword').value.trim()
		}

		if (data.oldPassword==''){
			Notifications.error('', 'Please enter your old password');
			return false
		}

		if (data.newPassword==''){
			Notifications.error('', 'Please enter a new password');
			return false
		}

		if(data.newPassword.length < 5){
			Notifications.error('', 'New Password must be atleast 5 character long');
			return false
		}

		if(globalRegex && globalRegex.password && !globalRegex.password.test(data.newPassword)){
			Notifications.error('', 'New password must have min 5 characters and max 12 characters');
			return false
		}

		if (data.confirmPassword==''){
			Notifications.error('', 'Please enter confirm password');
			return false
		}
		if (data.newPassword != data.confirmPassword){
			Notifications.error('', 'New Password and confirm password are not matching');
			return false
		}

		Meteor.call('updateSettingPasssword', data.oldPassword, data.newPassword, function(error, response){
			if (error){
				Notifications.error('', 'Something went wrong!! Please try again later')
			}
			else {
				if(response.error){
					Notifications.error('',response.error)
				}
				else{
					$('#changePasswordForm')[0].reset()
					Notifications.success('',response.success)
				}
			}
		})
	}
})