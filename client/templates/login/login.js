Meteor.loginAsAdmin = function(user, pass, callback) {
	var loginRequest = {loginData:{email: user, pass: pass}};
	$('.loginmodal-container .preloader').show()
	Accounts.callLoginMethod({
		methodName: 'login',
		methodArguments: [loginRequest],
		userCallback: function (error) {
			$('.loginmodal-container .preloader').hide()
			if(error){
				console.log('error: ' + error);
				Notifications.error('', 'Invalid Login Credentials')
				$('#email').removeAttr('disabled')
				$('#pass').removeAttr('disabled')
				$('#login').removeAttr('disabled')
			} 
			else{
				console.log('success');
				Router.go('dashboard');
			}
		}
	});
};

Template.login.events({
	'click #login': function(event, template){
		$('#email').attr('disabled','disabled')
		$('#pass').attr('disabled','disabled')
		$('#login').attr('disabled','disabled')

		var user = template.find('input[name="user"]').value || ''
		var pass = template.find('input[name="pass"]').value || ''

		if (!user){
			Notifications.error('', 'Please add an email')
			return false
		}
		if (!pass){
			Notifications.error('', 'Please add a password')
			return false
		}
		$('.loginmodal-container .preloader').show()

		Meteor.loginAsAdmin(user, pass);
	},
	'keypress input': function(event) {
		if (event.charCode == 13) {
			$("#login").trigger("click")
		}
	}
})

Template.login.created = function(){
}

Template.login.rendered = function(){
	$('#login-page').css('height',$(window).height())
	$('#login-page .loginlogo img').css('margin-top',$(window).height()/2 -150)
	$('#login-page').show()
}