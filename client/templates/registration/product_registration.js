Template.productRegistration.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);
}


Template.productRegistration.helpers({
	'registrations': function(){
		return Registration.find({}, {sort: {'modifiedAt': -1}})
	},
	'checkAdmin': function(){
		if(Meteor.user())
			return Meteor.user().adminType
	},
	'activationStatus': function(){
		if(this.activated)
			return 'Activated'
		else
			return 'Not active yet'
	}
})

Template.productRegistration.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('product_reg_table', searchKey)
	},
	'click .openActivationModal' : function(event, template){

		// Saas activation
		var regAlreadyActivated = Registration.findOne({emailAddress: this.emailAddress, activated:true})

		if(regAlreadyActivated){
			Notifications.error('', 'Already activated')
			return false
		}
		else{
			var parent = $(event.target).closest('tr')
			var modal = $(parent).find('.registrationActivationModal')

			if(this.saas){
				var parent1 = $(event.target).closest('tr')
				var saasTypeModal = $(parent1).find('.saas_type')
				$(saasTypeModal).modal('show')
				$('.companyIdForm').hide()

			}
			else if(modal){
				var parent1 = $(event.target).closest('tr')
				var saasTypeModal = $(parent1).find('.saas_type1')
				$(saasTypeModal).modal('show')
				$('.companyIdForm1').hide()
				// $(modal).modal('show')
			}
		}
	},
	'click .inc': function(event) {
		if(Registration.find()){
			var myRows = [];
			var $headers = $("th");
			var $rows = $("tbody tr").each(function(index) {
			  $cells = $(this).find("td");
			  myRows[index] = {};
			  $cells.each(function(cellIndex) {
			    myRows[index][$($headers[cellIndex]).text()] = $(this).text();
			  });    
			});
			JSONToCSVConvertor(myRows, "ProductRegistration list", true);
		}
	}
});

Template.registrationActivationModal.events({
	'click .activateRegistration' : function(event, template){
		var parent = $(event.target).closest('.registrationActivationModal')
		var companyId = $(parent).find('.companyId')

		if(companyId)
			companyId = $(companyId).val()
		
		if(!companyId){
			Notifications.error('','Please enter the linkedin id of the company')
			return false
		}


		if(this.name && this.emailAddress && this.designation && this.phone && this.companyName){

			var registerDetail = this

			registerDetail.companyId = companyId

			if(!this.strength){
				registerDetail.strength = 4
			}
			else{
				registerDetail.strength = this.strength
			}

			Meteor.call('activateRegistration',registerDetail, function(error, res){
				if(error){
					Notifications.error('', error);
				}
				else{
					if(res.error){
						Notifications.error('', res.error);
					}
					else{
						Notifications.success('', res.success);
						Router.go('company')
					}
				}
			});
		}
		else{
			Notifications.success('', 'Unable to activate, Please contact technical team');
		}

		$(parent).modal('hide')
	}
});


Template.saas_type.events({
	'click .saasType' : function(event, template){
		var parent = $(event.target).closest('.modal')

		var saasCompany = $(parent).find('.saasCompany').is(':checked')
		var saasConsultant = $(parent).find('.saasConsultant').is(':checked')
		if(saasCompany || saasConsultant){
			var compId = $(parent).find('.companyIdSaas').val()
			if(!this.name){
				Notifications.error('','Name is missing in Registration. Contact tech team')
				return false
			}
			if(!this.companyName){
				Notifications.error('','Company Name is missing in Registration. Contact tech team')
				return false
			}
			if(!this.emailAddress){
				Notifications.error('','Email Address is missing in Registration. Contact tech team')
				return false
			}
			if(!this.phone){
				Notifications.error('','Phone no. is missing in Registration. Contact tech team')
				return false
			}
			if(!this.designation){
				Notifications.error('','Designation is missing in Registration. Contact tech team')
				return false
			}
			var registeredInfo = {
				fullName: this.name,
				companyName: this.companyName,
				emailAddress: this.emailAddress,
				phone:{
					mobile: this.phone,
					landline : this.phone
				},
				designation: this.designation,
			};
			if(saasCompany){
				if(compId == ''){
					Notifications.error('','Please enter the linkedin id of the company')
					return false
				}
				else{
					registeredInfo.compId = compId
				}
			}

			$('.saasType').html('')
			$('.saasType').addClass('disableBtn')
			$('.closeButton').hide()
			
			Meteor.call('activateSaasReg',registeredInfo, function(error, res){
				$('.saas_type').modal('hide')
				if(error){
					Notifications.error('', error);
				}
				else{
					if(res.error){
						Notifications.error('', res.error);
					}
					else{
						Notifications.success('', res.success);
						Router.go('company')
					}
				}
			});
		}
		else{
			Notifications.error('', 'Please select one option');
		}
	},
	'click .saasConsultant' : function(event, template){
		$('.companyIdForm').hide()
	},
	'click .saasCompany' : function(event, template){
		$('.companyIdForm').show()
	}
});

Template.saas_type1.events({
	'click .saasConsultant1' : function(event, template){
		$('.companyIdForm1').hide()
	},
	'click .saasCompany1' : function(event, template){
		$('.companyIdForm1').show()
	},
	'click .saasType1' : function(event, template){
		
		var parent = $(event.target).closest('.modal')
		var saasCompany = $(parent).find('.saasCompany1').is(':checked')
		var saasConsultant = $(parent).find('.saasConsultant1').is(':checked')
		var jobCount = $(parent).find('.jobCountXs').val()
		var recruiterCount = $(parent).find('.recruiterCountXs').val()
		var validity = $(parent).find('.validityXs').val()

		if(saasCompany || saasConsultant){

			if(isNaN(recruiterCount) || recruiterCount<1){
				Notifications.error('','Please enter the max limit for no. of Recruiters')
				return false
			}
			if(isNaN(jobCount) || jobCount<1){
				Notifications.error('','Please enter the max limit for no. of Jobs')
				return false
			}
			if(isNaN(validity)){
				Notifications.error('','Please enter the max limit for no. of Days')
				return false
			}

			var basicInfo = {
				jobCount : parseInt(jobCount),
				recruiterCount : parseInt(recruiterCount),
				validity : parseInt(validity)+1
			}
			var compId = $(parent).find('.companyIdSaas1').val()
			if(!this.name){
				Notifications.error('','Name is missing in Registration. Contact tech team')
				return false
			}
			if(!this.companyName){
				Notifications.error('','Company Name is missing in Registration. Contact tech team')
				return false
			}
			if(!this.emailAddress){
				Notifications.error('','Email Address is missing in Registration. Contact tech team')
				return false
			}
			if(!this.phone){
				Notifications.error('','Phone no. is missing in Registration. Contact tech team')
				return false
			}
			if(!this.designation){
				Notifications.error('','Designation is missing in Registration. Contact tech team')
				return false
			}
			var registeredInfo = {
				name: this.name,
				companyName: this.companyName,
				emailAddress: this.emailAddress,
				phone:{
					mobile: this.phone,
					landline : this.phone
				},
				designation: this.designation,
			};
			if(saasCompany){
				if(compId == ''){
					Notifications.error('','Please enter the linkedin id of the company')
					return false
				}
				else{
					registeredInfo.compId = compId
				}
			}

			if(this.url){
				registeredInfo.url = this.url
			}

			if(this.strength){
				registeredInfo.strength = this.strength
			}

			$('#showButton1').hide()
			$('#showLoader1').show()
			
			Meteor.call('activateRegistration',registeredInfo, basicInfo, function(error, res){
				$('.saas_type1').modal('hide')
				if(error){
					Notifications.error('', error);
				}
				else{
					if(res.error){
						Notifications.error('', res.error);	
					}
					else{
						Notifications.success('', res.success);
						Router.go('company')
					}
				}
			});
		}
		else{
			Notifications.error('', 'Please select one option');
		}
	}
})

Template.productRegistration.destroyed = function(){
	$('.modal-backdrop').remove()
}

searchCandidateList = function(tbobyId, string){

	$('#'+tbobyId+' tr').each(function() {
		if($(this).text().toLowerCase().indexOf(string) !== -1){
			$(this).show()
		}
		else{
			$(this).hide()
		}
	});
}