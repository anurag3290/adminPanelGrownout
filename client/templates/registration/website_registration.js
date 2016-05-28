Template.websiteRegistration.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);

	if(!reactiveVar.get()){
		Meteor.call('getregistrations',function(err, res){
			if(err){
				console.log(err)
			}
			else{
				if(res.success){
					reactiveVar.set({'data': res.success.obj, 'time': new Date().getTime()})
				}
			}
		});
	}
}


Template.websiteRegistration.created = function(){
	Session.set("prodReg",[])
}
Template.websiteRegistration.destroyed = function(){
	Session.set("prodReg",[])
}


Template.websiteRegistration.helpers({
	'registrations': function(){
		var ser = reactiveVar.get()
		if(ser && ser.data){
			var checkXs = $('.checkXS').is(':checked')
			var checkReferral = $('.checkReferral').is(':checked')
			var length
			if(checkXs && checkReferral){
				ser = ser.data
			}
			else if(checkXs && !checkReferral){
				var tempSer = []
				var j = 0
				var xsLength = ser.data.length
				for (i=0;i<xsLength;i++){
					if(ser.data[i].model == 1 && !ser.data[i].company){
						tempSer[j] = ser.data[i]
						j= j+1
					}
				}
				ser = tempSer
			}
			else if(!checkXs && checkReferral){
				var tempSer1 = []
				var j = 0
				var xsLength = ser.data.length
				for (i=0;i<xsLength;i++){
					if(ser.data[i].model == 0 || ser.data[i].model == 2 && !ser.data[i].companyName){
						tempSer1[j] = ser.data[i]
						j= j+1
					}
				}
				ser = tempSer1
			}
			else{
				return ser.data.sort(function(x, y){
					y =  new Date(y.modified).getTime()
					x =  new Date(x.modified).getTime()
					return y - x;
				})
			}

			return ser.sort(function(x, y){
				y =  new Date(y.modified).getTime()
				x =  new Date(x.modified).getTime()
				return y - x;
			})
		}
	},
	'checkCompany' :function(){
		if(this){
			if(this.companyName){
				return true
			}
			else{
				return false
			}
		}
	},
	'timer' :function (){
		 return Session.get("time");
	},
	'checkAdmin': function(){
		return Meteor.user().adminType
	},
	'checkMigration' : function(){
		var email = this.emailAddress

		if(Session.get('prodReg').length==0){
			var prodRec = Registration.find().fetch()
			var emailarray = []

			for (i=0;i<prodRec.length;i++){
				emailarray.push(prodRec[i].emailAddress)
			}
			Session.set('prodReg', emailarray)
		}

		if(Session.get('prodReg').indexOf(email) > -1){
			return false
		}
		else{
			return true
		}
	}
});

Template.websiteRegistration.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('webiste_reg_table', searchKey)
	},
	'click .openMigrationModal' : function(event, template){

		var regAlreadyActivated = Registration.findOne({emailAddress: this.emailAddress})
		var recAlreadyActivated = Recruiter.findOne({emailAddress: this.emailAddress})

		if(regAlreadyActivated || recAlreadyActivated){
			Notifications.error('', 'Already migrated to product')
			return false
		}
		else{
			var parent = $(event.target).closest('tr')
			var modal = $(parent).find('.migration_modal')

			if(modal){
				$(modal).modal('show')
			}
		}
	},
	'click .inc': function(event) {
		var ser = reactiveVar.get()

		if(ser && ser.data){
			var myRows = [];
			var $headers = $("th");
			var $rows = $("tbody tr").each(function(index) {
			  $cells = $(this).find("td");
			  myRows[index] = {};
			  $cells.each(function(cellIndex) {
			    myRows[index][$($headers[cellIndex]).text()] = $(this).text();
			  });    
			});
			JSONToCSVConvertor(myRows, "Website Registration list", true);
		}
	},
	'click .ref' : function(event){
		var checkXs = $('.checkXS').is(':checked')
		var checkReferral = $('.checkReferral').is(':checked')
		if(!checkXs && !checkReferral){
			Notifications.error('','Please select atleast 1 mode')
			return false
		}

		reactiveVar.set('')
		if(!reactiveVar.get()){
			Meteor.call('getregistrations',function(err, res){
				if(err){
					console.log(err)
				}
				else{
					if(res.success){
						reactiveVar.set({'data': res.success.obj, 'time': new Date().getTime()})
					}
				}
			});
		}
	}
});

Template.migration_modal.events({
	'click .upgradeRegistration' : function(event, template){
		var parent = $(event.target).closest('.migration_modal')
		var companyWebUrl = $(parent).find('.websiteUrl')
		var saasMigrate = $('.saasMigrate').is(':checked')
		var xsMigrate = $('.xsMigrate').is(':checked')
		if(!saasMigrate && !xsMigrate){
			Notifications.error('','Please select any one Model')
			return false
		}
		if(companyWebUrl)
			companyWebUrl = $(companyWebUrl).val()
		
		// if(!companyWebUrl){
		// 	Notifications.error('','Please enter the website url')
		// 	return false
		// }
		var registerDetail = {
			name: this.fullName,
			emailAddress: this.emailAddress,
			phone: this.phone.mobile,
			designation: this.designation,
			url: companyWebUrl			
		}

		if(this.companyName){
			registerDetail.companyName = this.companyName
		}
		else{
			registerDetail.companyName = this.company.name
		}
		if(!registerDetail.name){
			Notifications.error('', 'Name is required');
			return false
		}
		if(!registerDetail.emailAddress){
			Notifications.error('', 'Email Address is required');
			return false
		}
		if(!registerDetail.phone){
			Notifications.error('', 'Phone Number is required');
			return false
		}
		if(!registerDetail.companyName){
			Notifications.error('', 'Company Name is required');
			return false
		}
		if(!registerDetail.designation){
			Notifications.error('', 'Designation required');
			return false
		}
		// if(!registerDetail.url){
		// 	Notifications.error('', 'URL is required');
		// 	return false
		// }
		
		// if(this.model == 0){
		// 	strength: this.company.strength
		// 	if(registerDetail.strength == ''){
		// 		Notifications.error('', 'Size of the company is required');
		// 		return false
		// 	}
		// }

		if(saasMigrate){
			registerDetail.saas = true
		}

		$('.upgradeRegistration').html('')
		$('.upgradeRegistration').addClass('disableBtn')
		$('.closeButton').hide()

		Meteor.call('migarateRegistration',registerDetail, function(error, res){
			$(parent).modal('hide')
			if(error){
				Notifications.error('', error);
			}
			else{
				if(res.error){
					Notifications.error('', res.error);
				}
				else{
					Notifications.success('', 'Successfully migrated to product registration');
					Router.go('productRegistration')
				}
			}
		});

	}

});


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