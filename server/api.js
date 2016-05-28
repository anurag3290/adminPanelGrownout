externalApi ={};

externalApi.importSaas = function (param) {
	var fut = new Future();
	console.log('$$$CHAL GYA$$$:',param)
	var registerDetail = {
		name: param.fullName,
		emailAddress: param.emailAddress,
		phone: param.phone.mobile,
		companyName: param.companyName,
		designation: param.designation
	}

	Meteor.call('migarateRegistration', registerDetail, true, function(err, res1){
		if(err){
			console.log(err)
		}
		else{
			if(res1.success){
				// activateSaasReg(param)
			}
		}
	});

	
	return fut.wait();
}

Meteor.methods({
	activateSaasReg: function(param){
		var fut = new Future();
		var recruiterInfo = {
			name: param.fullName,
			emailAddress: param.emailAddress,
			designation: param.designation,
			phone: {
				mobile : param.phone.mobile
			},
			model: 1,
			account: {
				type: 0,
				policy: false
			},
			saasActivation:{
				activated : false,
				activatedAt: new Date(),
				type : 0
			},
			analytics: {
				numberLogins: 0,
				loginReminderNum: 0
			},
			status: false,
			modifiedAt: new Date(),
			createdAt: new Date(),
			firstLogin: false,
			model: 1
		};

		var splitName = param.fullName.split(' ')
		if(splitName.length > 1){
			recruiterInfo.lastName = splitName[splitName.length - 1]
			recruiterInfo.firstName = param.fullName.replace(' '+recruiterInfo.lastName, '')
		}
		else{
			recruiterInfo.firstName = param.fullName
		}
		

		// Insert location from registration
		var companyInfo = {
			name: param.companyName,
			phone : param.phone.mobile,
			emailAddress : param.emailAddress,
			account : {
				status : true,
				plan : 0,
				activationDate : new Date(),
				xsJobCount : 3,
				recruiterCount : 1,
				salarynotReq : true
			},
			modifiedAt: new Date(),
			createdAt: new Date(),
			color : 'ffffff'
		};

		if(param.linkedinId){
			companyInfo.linkedinId = param.linkedinId
		}
		if(param.compId){
			companyInfo.companyId = param.compId
		}

		var alreadyActivated = Recruiter.findOne({emailAddress: recruiterInfo.emailAddress})

		if(alreadyActivated){
			fut['return']({'error': 'This acccount is already activated'});
		}
		else{
			Company.insert(companyInfo,  function(err, company){
				if(err){
					console.log('[!] in company.insert from activateRegistration', err)
					fut['return']({'error': 'Unable to activate registration'});
				}
				else{
					Registration.update({emailAddress:param.emailAddress}, {$set: {'activated': true, modifiedAt: new Date()}}, function(err, registrationData){
						if(err){
							console.log('[!] in registration.update from activateRegistration', err)
							fut['return']({'error': 'Unable to activate registration'});
						}
						else{					

							recruiterInfo.company = company._str

							Recruiter.insert(recruiterInfo, function(err, recruiter){
								if(err){
									console.log('[!] in recruiter.update from activateRegistration', err)
									fut['return']({'error': 'Unable to activate registration'});
								}
								else{
									var emailInfo = {
										emailAddress: param.emailAddress,
										name: param.fullName
									}
									Meteor.call('sendAccountActivationMail', recruiterInfo, true, function(err, res1){
										if(err){
											console.log(err)
										}
										else{
											console.log('Activation Mail sent')
											fut['return']({'success': 'Activation mail sent successfully'});
										}
									})
								}
							})
						}
					});
				}
			});
		}
		return fut.wait();
	}
})