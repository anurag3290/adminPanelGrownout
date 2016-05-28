Template.companydetail.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight+100);
}
var uploadComapnyLogo = new Slingshot.Upload("uploadComapnyLogo");


Template.companydetail.helpers({
	'compName': function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company){
			return company.name
		}
	},
	'compEmail' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company){
			return company.emailAddress
		}
	},
	'compTotalJobs' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (Job.find({company: compId}))
			return Job.find({company: compId}).count()
		else return false
	},
	'compOpenJobs' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (Job.find({company: compId}))
			return Job.find({company: compId, status:1}).count()
		else return false
	},
	'compClosedJobs' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (Job.find({company: compId}))
			return Job.find({company: compId, status:2}).count()
		else return false
	},
	'compSize' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company){
			var range = strengthCalulator(company.strength)
			return range.split(" ")[0]
		}
		else return '--'
	},
	'compUrl' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company && company.websiteLink)
			return company.websiteLink
		else return '--'
	},
	'compPhone' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company && company.phone)
			return company.phone
		else return '--'
	},
	'compDesc' : function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company && company.description)
			return company.description
		else return '--'
	},
	'imgSrc':function(){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		if (company && company.logoUrl){
			return globals.gcsBucketStringToReplace+company.logoUrl
		}
	},
	'canPopEmails':function(){
		if(Meteor.user() && Meteor.user().recruiter && Recruiter.findOne({_id:meteorToMongo(Meteor.user().recruiter)})){
			var recruiter = Recruiter.findOne({_id:meteorToMongo(Meteor.user().recruiter)})
			return recruiter.permission.populateEmails
		}
	},
	'chkUpldLogoPerm':function(){
		if(Meteor.user() && Meteor.user().recruiter && Recruiter.findOne({_id:meteorToMongo(Meteor.user().recruiter)})){
			var recruiter = Recruiter.findOne({_id:meteorToMongo(Meteor.user().recruiter)})
			return recruiter.permission.uploadLogo
		}
	}
});


Template.confirm_populate_network.events({
	'click #populate': function(event, template){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		
		if(company && company.companyId){
			// donot uncomment this line(need to test this process)
			Meteor.call('getCompanyEmpProfile', company.companyId, company._id._str)
			$('.confirm_populate_network').modal('hide')
			Notifications.success('', 'Processing  employee and candidate network details popluation....')
		}
		else{
			Notifications.error('', 'Unable to send mail, Please contact technical team');
		}
	}
})

Template.populate_emails.events({
	'click #populate': function(event, template){
		var compId = Iron.Location.get().queryObject.company
		var company = Company.findOne({_id: meteorToMongo(compId)})
		var linkedin_Id = company.companyId
		var recruiter = Recruiter.find({company:company._id._str}).fetch()
		var counts = recruiter.length
		var training_data = []

		for (i=0; i<counts; i++){
			var single_data ={}
			single_data.name = recruiter[i].name
			single_data.email = recruiter[i].emailAddress
			training_data.push(single_data)
		}

		training_data = {
			training_data:training_data,
			company : {
				linkedin_id:linkedin_Id
			}
		}

		Meteor.call('getPopulateEmails', training_data,compId)
	}
})

Template.companydetail.events({
	'click #updateCompanyNetwork': function(event, template){
		$('.confirm_populate_network').modal('show')
	},
	'click #updateEmails': function(event, template){
		$('.populate_emails').modal('show')
	},
	'click .uploadCompanyLogo': function(event, template){
		var compId = Iron.Location.get().queryObject.company
		var file = template.find('#imgInp').files[0]
		$('#imgPath').val(file.name)

		if(file!= undefined && file!='' && file!=null){

			var image_ext = file.type.replace("image/", "");
			var valid_ext = ["gif", "jpeg", "jpg", "png", "bmp"];

			if(valid_ext.indexOf(image_ext) == -1){
				Notifications.error('','Only .gif, .jpeg, .jpg, .png, .bmp formats are allowed')
				return false
			}

			if(file.size > 2097152){
				Notifications.error('','Image size should be less than 2MB!')
				return false
			}

			Meteor.users.update(Meteor.userId(), {$set: {'profile.selectedCompany': compId}});
			uploadComapnyLogo.send(file, function (error, downloadUrl) {
				if(downloadUrl!= undefined && downloadUrl!='' && downloadUrl!=null){
					Session.set('downloadUrl',downloadUrl)
					var reader = new FileReader();

					reader.onload = function(event) {
						object = {};
						object.filename = file.name;
						object.data = event.target.result;

						$('.logoPreview img').attr('src', object.data)
					};
					reader.readAsDataURL(file);

					downloadUrl = downloadUrl.replace(globals.gcsBucketStringToReplace, '')

	        Meteor.call('saveLogo', compId, downloadUrl)
	        Notifications.success('','Logo updated Succesfully')
				}
			});
		}
		else{
			Notifications.error('','Please browse a image file')
		}
	}
});
