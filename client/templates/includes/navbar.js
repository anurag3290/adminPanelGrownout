Template.navbar.rendered = function(){
	var url = Iron.Location.get().pathname

	$('#navbar ul li').removeClass('active')

	if(url == '/recruiterdetail' || url == '/jobdetail' || url == '/companydetail'){
		$('#navbar ul li a[href="/company"]').parent('li').addClass('active')
	}
	else{
		$('#navbar ul li a[href="'+url+'"]').parent('li').addClass('active')
	}
}

Template.navbar.helpers({
	'userName': function(event, template){
		if(Meteor.user()){
			var rec = Recruiter.findOne({emailAddress:Meteor.user().email})
			if(rec){
				return (rec.firstName)
			}
		}
	},

	'checkAdminType': function(event, template){
		if(Meteor.user() && Meteor.user().adminType == 0)
			return 1
		else return 0
	}
})

Template.navbar.events({
	'click #logout': function(event, template){
		Meteor.logout();
	}
})
