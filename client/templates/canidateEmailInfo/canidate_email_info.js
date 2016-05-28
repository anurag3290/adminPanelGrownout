Template.candidateEmailInfo.created = function(){
}

Template.candidateEmailInfo.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
}


Template.candidateEmailInfo.helpers({
	'candidateIntro': function(){
		return CandidateIntro.find()
	}
})

Template.candidateEmailInfo.events({
	'click .connect': function(event, template) {
		Meteor.call('introduceCandidate', this)
		Notifications.success('', 'Introduce to recruiter successfully')
	},
	'click .saveEmail': function(event, template) {

		var parent = $(event.target).closest('td')
		var email = $(parent).find('input[name="email"]').val()
		
		if(globalRegex && globalRegex.emailAddress && !globalRegex.emailAddress.test(email)){
			Notifications.error('', 'Invalid Email Address');
			return false
		}

		this.email = email
		Meteor.call('introduceCandidate', this)
		Notifications.success('', 'Introduce to recruiter successfully')
	}
})