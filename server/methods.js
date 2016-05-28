var newactivationMailer = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><title>Grownout - Shortlist to HM</title><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style type="text/css">@media only screen and (max-width: 480px){body{margin:0px;}.responsiveTab{width: 100%;}.logo{text-align:center;}.leftM{float: left; text-align: left; padding-left: 0px !important;}.leftC{float: left; text-align: center !important;width: 100%; padding-top: 10px;}}</style></head><body marginheight="0" topmargin="0" marginwidth="0" leftmargin="0" style="margin: 0px; background-color: #f5f5f5; font-family:Arial" bgcolor="#f5f5f5"><table width="100%" cellspacing="0" border="0" cellpadding="0" ><thead ><tr><th height="8px" style="background-color:#000000"></th></tr><tr bgcolor="#fff"><th style="border-bottom:1px solid #d3d3d3;"><table cellspacing="0" border="0" cellpadding="0" class="responsiveTab" width="600" align="center"><tr height="73px"><td align="left" valign="middle" class="logo"><a href="https://www.grownout.com/" target="_blank" title="Grownout"><img src="http://media.grownout.com.storage.googleapis.com/mailer-images/grownout-logo.png" border="0" title="Grownout" alt="Grownout" class="CompanyLogo"></a></td><td align="right"><table cellspacing="0" border="0" cellpadding="0" width="150" align="right"><tr><td align="right"><table cellspacing="0" border="0" cellpadding="0" align="right"><tr><td width="35" align="center"><a href="https://www.facebook.com/grownoutsolutions" target="_blank" title="facebook"><img src="http://media.grownout.com.storage.googleapis.com/mailer-images/facebook-icon.png" alt="facebook" title="facebook" border="0"></a></td><td width="35" align="center"><a href="https://twitter.com/AccessGrownOut" title="Twitter" target="_blank"><img src="http://media.grownout.com.storage.googleapis.com/mailer-images/twitter-icon.png" alt="Twitter" title="Twitter" border="0"></a></td><td width="35" align="center"><a href="https://www.linkedin.com/company/grownout" target="_blank" title="linkedin"><img src="http://media.grownout.com.storage.googleapis.com/mailer-images/linkedin-icon.png" alt="linkedin" title="linkedin" border="0"></a></td><td width="35" align="center"><a href="https://plus.google.com/108108032871857950369/posts" target="_blank" title="google+"> <img src="http://media.grownout.com.storage.googleapis.com/mailer-images/gplus-icon.png" alt="google+" title="google+" border="0"></a></td></tr></table></td></tr></table></td></tr></table></th></tr></thead><tbody><tr><td align="center"><table cellspacing="0" border="0" cellpadding="0" style="margin:25px 0px;" class="responsiveTab" width="600" align="center" itemscope itemtype="http://schema.org/Person"><tr><td bgcolor="#ffffff" style="padding:24px; border-top:1px solid #0072bc;" colspan="2" valign="top"><p style="font-size:14px; color:#747474; margin-top:0px;">Hi <span style="color:#000000" itemprop="name">[Recruiter_Name] ,</span></p><p style="font-size:14px; color:#747474;">Your hiring process just got <span style="color:#000000;">catapulted!</span>.</p><p style="font-size:14px; color:#747474;">Welcome onboard to the ultimate referral hiring solution, <span style="color:#000000;">GrownOut!</span></p><p style="font-size:14px; color:#747474;">Please <a href="[Link]" target="_blank">Generate Password Here</a></p><p style="font-size:14px; color:#747474;">Set your account in less than 5 minutes and start recruiting best talent from your network.</p><p style="font-size:14px; color:#000000;">GrownOut is fast becoming the primary source for quality hiring and will become an integral part of your routine recruitment practice.</p><p style="font-size:14px; color:#747474;">For any queries, please feel free to call us at +919599556617 or drop a line at contact@grownout.com.</p><p style="font-size:14px; color:#747474;">Happy Hiring!<br><br>Team GrownOut</p><p style="font-size:11px; color:#747474;"><i>PS: The whole team is always around, almost 24/7, to reply to your emails. Whether you need help, have ideas or just want to say "hello," we\'ll get back to you within a few hours.</i></p></td></tr></table></td></tr><tr><td id="footer"><table width="100%" align="center"><tr bgcolor="#ffffff"><td><table cellspacing="0" border="0" cellpadding="0" class="responsiveTab" width="600" align="center"><tr height="59px"><td align="left" valign="middle" class="leftC"></td></tr></table></td></tr><tr><td height="8px" colspan="2" style="background-color:#000000"></td></tr></table></td></tr></tbody></table></body></html>'
var xsActivationMailer= '<p>Hi [Recruiter_Name],</p><p>Congratulations! You have secured access to GrownOut XS account. Now tap into the perfect talent pool from 30 million+ profiles and start hiring with the convenience of social hiring.</p><p>Free Version Inclusions:</p><p>● 3 Job Creation</p><p>● Visibility 10 profiles per job</p><p>● 5 Shortlist per job</p><p>● Advanced Search</p><p>● Social Scan</p><p>● ATS functionalities</p><p><a href=[Link]>Generate your password here and login</a></p><p>For more information or any query write to us at info@grownout.com</p><p><a href=[register_page]>Upgrade to premium version</a></p><p>Happy Hiring!</p><p>Team GrownOut</p><p>PS: The whole team is always around, almost 24/7, to reply to your emails. Whether you need help, have ideas or just want to say "hello," we will get back to you within a few hours.</p>'

Meteor.startup(function () {
	Future = Npm.require('fibers/future');
});

Crypto    = Meteor.npmRequire('ezcrypto').Crypto;
bcrypt    = Meteor.npmRequire('bcrypt-nodejs');
json2csv  = Meteor.npmRequire('json2csv');
randpass  = Meteor.npmRequire('randpass');
ElasticSearchClient  						= Meteor.npmRequire('elasticsearchclient');

var serverOptions    						= globals.suggestionElasticServerOptions;
var elasticSearchClientH4 				= new ElasticSearchClient(serverOptions);

Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('google-cloud-service-key.pem');
Slingshot.GoogleCloud.directiveDefault.GoogleAccessId = "941199228911-s5j1kar96p8ioo6728f17s08vfrvldkj@developer.gserviceaccount.com";

Slingshot.createDirective('uploadComapnyLogo', Slingshot.GoogleCloud, {
	bucket: 'grownout-premium',
	allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'image/bmp'],
	maxSize: 2*1024*1024, // 2 Mb (use 0 for unlimited)
	acl: 'public-read',
	authorize: function () {
		// Deny uploads if user is not logged in.
		if (!this.userId) {
			var message = 'Please login before posting files';
			throw new Meteor.Error('Login Required', message);
		}
		else{
			var user = Meteor.users.findOne({_id: this.userId})
			if(user && user.recruiter){
				var recruiter = Recruiter.findOne({_id:meteorToMongo(user.recruiter)})
				if(recruiter && recruiter.account){
					return true;
				}
				else{
					throw new Meteor.Error('Inauthenticate Access', 'You donot have admin access to upload company logo');
				}
			}
			else{
				throw new Meteor.Error('Inauthenticate Access', 'Something went wrong!! Please try again later');
			}
		}
	},

	key: function (file) {
		// Store file into a directory by the user's username.
		if (!this.userId) {
			return '';
		}
		else{
			compId =  Meteor.users.findOne({_id: this.userId}).profile.selectedCompany
			var ext = file.name.split('.');
			ext = ext[ext.length-1];
			var imageName = compId + '.' + ext;
			return 'v2/test/images/' + imageName
		}
	}
})

encryptData = function (text, secretKey){
	var cryptedText;
	while(1){
		cryptedText = Crypto.DES.encrypt(String(text), secretKey);
		if(cryptedText.indexOf('+') === -1 && cryptedText.indexOf('&') === -1){
			break;
		}
	}
	return cryptedText;
}

Meteor.methods({
	introduceCandidate : function(candidateIntro){
		
		if(candidateIntro && candidateIntro.email && candidateIntro.recruiter && candidateIntro.recruiter.length){

			var updateObj = {
				modifiedAt : new Date(),
				connected : true,
				email : candidateIntro.email
			}

			CandidateIntro.update({_id : candidateIntro._id}, {$set: updateObj, $unset: { recruiter: []}},  function(err, res) {
				if(err){
					console.log(err)
					console.log('[!] from CandidateIntro.update in introduceCandidate for:', JSON.stringify(candidateIntro))
				}
				else{
					console.log('[*] from CandidateIntro.update in introduceCandidate for:', JSON.stringify(candidateIntro))
				}
			})

			var recruiterArray = candidateIntro.recruiter

			for(i=0; i< recruiterArray.length; i++){

				(function(this_recuiter){

					this_recuiter = Recruiter.findOne({_id : meteorToMongo(this_recuiter), status : true})

					if(this_recuiter){

						var checkAts = JobAts.find({candidate: candidateIntro.amoebaId,  recruiter: this_recuiter._id._str, status: 1, requestedIntroduce : true}).fetch()
						var atsIdArray = []

						if(checkAts && checkAts.length){
							for(j=0; j< checkAts.length; j++){
								var this_job = Job.findOne({_id: meteorToMongo(checkAts[i].job), status: 1})

								if(this_job){
									atsIdArray.push(checkAts[i]._id)
								}
							}
						}

						if(atsIdArray.length){

							var emailInfo = {
								fromname: 'GrownOut Team',
								to: candidateIntro.email,
								subject: 'Have Email Already and connect',
								cc : this_recuiter.emailAddress,
								html: 'hi'
							}
							
							Meteor.call('sendEmail', emailInfo)

							for(j=0; j< atsIdArray.length; j++){
								
								JobAts.update({_id: atsIdArray[i]}, {$set: {status: 7, modifiedAt: Date.now()}}, function(error, result){
									if (error){
										console.log(error)
									}
									else {
										console.log(result)
									}
								})
							}
						}
					} 
				}(recruiterArray[i]))
			}
		}		
	},
	getPreMeetingData: function(lUrl){

		var fut = new Future()
		if(lUrl){
			var request_object = { 
				data:{}
			}

			var url = 'http://data.grownout.com:8000/companydata?linkedin_url='+lUrl+'&data_type=json'

			console.log('Calling getPreMeetingData', url)
			Meteor.http.get(url,request_object,function (error, data) {
				if (error) {
					console.log('[!] getPreMeetingData system api has error', error)
					fut['return']({'error': error});
				}else{
					console.log('Premeeting received')
					fut['return']({'data': data.data});
					// console.log(data)
					// console.log(data.data)
				}
			})
		}
		else{
			console.log('[!] Inauthenticate Access')
		}
		return fut.wait();
	},
	saveLogo: function(companyId, downloadUrl){
		var info = {
			logoUrl: downloadUrl,
			modifiedAt: new Date()
		};
		Company.update({_id: meteorToMongo(companyId)}, {$set: info}, function(err, data) {
			if(err) {
				console.log('[!] Image upload of company: ' + err);
			}else{
				console.log('[*] Company image uploaded successfully');
			}
		})
	},

	getregistrations: function(){

		var fut = new Future()
		var key = encryptData(globals.premiumAdminAuth.text, globals.premiumAdminAuth.key)
		Meteor.http.post(globals.productionWebsiteUrl+'getAllRegistration',{data: {key: key}},function (error, res) {    	
			if(error) {
				fut['return']({'error': error});
			}
			else{
				fut['return']({'success': res.data});
			}
		})
		return fut.wait();
	},

	getenquires: function(){

		var fut = new Future()
		var key = encryptData(globals.premiumAdminAuth.text, globals.premiumAdminAuth.key)
		Meteor.http.post(globals.productionWebsiteUrl+'getContactUsEnquiry',{data: {key: key}},function (error, res) {	    	
			if(error) {
				fut['return']({'error': error});
			}
			else{
				fut['return']({'success': res.data});
			}
		})
		return fut.wait();
	},

	getdemorequest: function(){
		var fut = new Future()
		var key = encryptData(globals.premiumAdminAuth.text, globals.premiumAdminAuth.key)
		Meteor.http.post(globals.productionWebsiteUrl+'getAllDemoRequest',{data: {key: key}},function (error, res) {	    	
			if(error) {
				fut['return']({'error': error});
			}
			else{
				fut['return']({'success': res.data});
			}
		})
		return fut.wait();
	},

	getuserperm: function(){

		var fut = new Future()
		var key = encryptData(globals.premiumAdminAuth.text, globals.premiumAdminAuth.key)
		Meteor.http.post(globals.productionWebsiteUrl+'getAllRegistration',{data: {key: key}},function (error, res) {
			if(error) {
				fut['return']({'error': error});
			}
			else{
				fut['return']({'success': res.data});
			}
		})
		return fut.wait();
	},

	getPopulateEmails : function(training_data,compId){
		var recruiter_data = JSON.stringify(training_data)
		Meteor.http.post('http://data.grownout.com:8000/company/emails',{data: {input: recruiter_data}},function (error, res) {
			
			if(error) {
				console.log(error);
			}
			else{
				console.log(JSON.stringify(res))
			// 	var counter=0
			// 	var hasSavedEmail = false
			// 	var emailArray = []
			// 	if(res.data && res.data.email_list){ 
			// 		for(i=0;i<res.data.email_list.length;i++){
			// 			if(res.data.email_list[i].email){
			// 				var employee = Employee.findOne({company:compId,amoebaId:res.data.email_list[i]._id})
			// 				hasSavedEmail = false

			// 				if(employee && employee.matchedEmailIds && employee.matchedEmailIds[0] && employee.matchedEmailIds[0].count == 1){
			// 					hasSavedEmail = true
			// 				}

			// 				if(!hasSavedEmail){
			// 					counter = counter+1
			// 					emailArray.push(res.data.email_list[i].email)

			// 					Employee.update({company: compId,amoebaId :res.data.email_list[i]._id},
			// 						{$set:{ matchedEmailIds: [{email :res.data.email_list[i].email,count :1}] }}
			// 					);
			// 				}
			// 			}

			// 			companyDataDetails.update({companyId: compId},
			// 				{$addToSet:{ "total":{$each : emailArray },"savedEmails" :{$each : emailArray}}}
			// 			)
			// 		}
			// 	}
			// 	else
			// 		console.log('Email Id is NOT found')
			// }
		}
		})
	},

	futureCompanies: function(filterAttrition,filterEmployee,filterCountry,filterHiring){
		var fut = new Future()
		// Meteor.http.post('http://dev-es1.grownout.com:6200/dealsathon/_search',{data: filterAttrition,filterEmployee,filterCountry,filterHiring},function (error, res) {	    	
		// 	if(error) {
		// 		fut['return']({'error': error});
		// 	}
		// 	else{
		// 		fut['return']({'success': res.data});
		// 	}
		// })
		// return fut.wait();
	},

	loginRecruiter: function(recId, userId){
		text = recId+'_'+userId
		var key = encryptData(text, globals.gadminLoginSecret)
		console.log(key)
		return key
	},

	updateSettingPasssword: function(oldpassword, Newpassword){
		var fut = new Future();
		if(oldpassword && Newpassword){
			var user = Meteor.users.findOne({_id: this.userId})
			if(user && user.recruiter){
				var recruiter = Recruiter.findOne({_id:meteorToMongo(user.recruiter)})

				if(recruiter){
					if(bcrypt.compareSync(oldpassword, recruiter.password)){
						var obj = {
							password : bcrypt.hashSync(Newpassword),
							passwordModified : new Date(),
							modifiedAt : new Date()
						}
						Recruiter.update(recruiter._id, {$set: obj}, function(error, result){
							if(error){
								fut['return']({'error':'Something went wrong please try again later!!'});
								}else{
									fut['return']({'success':'Password updated successfully'});
								}
							})
						}
						else{
							fut['return']({'error': 'Old password is not matching!!'});
						}
					}else{
					fut['return']({'error': 'Something went wrong!! Please try again later'});
					}
				}
			else{
				fut['return']({'error': 'Something went wrong!! Please try again later'});
				}
			}
			else{
				fut['return']({'error': 'Please enter the required fields'});
			}
			return fut.wait();
		},

	migarateRegistration: function(registerDetail, saas){
		var fut = new Future();

		var user = Meteor.users.findOne({_id: this.userId})

		if(user){
			registerDetail.activated = false
			registerDetail.createdAt = new Date()
			registerDetail.modifiedAt = new Date()
			Registration.insert(registerDetail, function(error, res){

				if(error){
					fut['return']({'error': error});
				}
				else{
					fut['return']({'success': res});
				}
			})
		}
		else if(saas){
			registerDetail.activated = false
			registerDetail.createdAt = new Date()
			registerDetail.modifiedAt = new Date()
			registerDetail.saas = true
			Registration.insert(registerDetail, function(error, res){

				if(error){
					fut['return']({'error': error});
				}
				else{
					fut['return']({'success': res});
				}
			})
		}
		else{
			fut['return']({'error': 'Authentication failed'});
		}

		return fut.wait();
	},

	activateRegistration: function(registration,basicInfo){
		var fut = new Future();
		var currentDate = new Date()

		var user = Meteor.users.findOne({_id: this.userId})

		if(user && basicInfo &&  basicInfo.validity && basicInfo.recruiterCount && basicInfo.jobCount){
			var recruiterInfo = {
				name: makeTitleText(registration.name),
				emailAddress: registration.emailAddress,
				designation: registration.designation,
				phone: {
					mobile : registration.phone.mobile
				},
				account: {
					type: 0,
					policy: false
				},
				analytics: {
					numberLogins: 0,
					loginReminderNum: 0
				},
				status: false,
				modifiedAt: new Date(),
				createdAt: new Date(),
				firstLogin: false,
				model: 1,
				accountExpiry : new Date(currentDate.getTime() + basicInfo.validity*24*60*60*1000)
			};

			var splitName = registration.name.split(' ')
			if(splitName.length > 1){
				recruiterInfo.lastName = splitName[splitName.length - 1]
				recruiterInfo.firstName = registration.name.replace(' '+recruiterInfo.lastName, '')
			}
			else{
				recruiterInfo.firstName = registration.name
			}
			
			var companyInfo = {
				name: registration.companyName,
				phone : registration.phone.mobile,
				emailAddress : registration.emailAddress,
				account : {
					status : true,
					plan : 0,
					activationDate : new Date(),
					xsJobCount : basicInfo.jobCount,
					recruiterCount : basicInfo.recruiterCount,
					salarynotReq: true
				},
				websiteLink : registration.url,
				modifiedAt: new Date(),
				createdAt: new Date(),
				color : 'ffffff'
			};

			if(registration.compId){
				companyInfo.companyId = registration.compId
			}

			if(registration.strength){
				companyInfo.strength = registration.strength
			}
			
			var chkEmail = new RegExp("^("+recruiterInfo.emailAddress+")","g")
			var alreadyActivated = Recruiter.findOne({emailAddress: {emailAddress: { $regex: chkEmail, $options: "i" }}})

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
						Registration.update({emailAddress : registration.emailAddress}, {$set: {'activated': true, modifiedAt: new Date()}}, function(err, registrationData){
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
										Meteor.call('sendAccountActivationMail', recruiterInfo, function(error, res){
											if(error){
												fut['return']({'error': 'Unable to send activate mail'});
											}
											else{
												if(res.error){
													fut['return']({'error': 'Unable to send activate mail'});
												}
												else{
													fut['return']({'success': 'Generate password mail sent successfully'});
												}
											}
										})
										
									}
								})
							}
						});
					}
				});
			}
		}
		else{
			fut['return']({'error': 'Authentication failed'});
		}
		return fut.wait();
	},
	sendAccountActivationMail : function(recruiter){
		var fut = new Future();
		
	 	var randomPassword = randpass({length: 8, symbols: false, capitals: false, alternate: false});


		var recruiterInfo = {
			passwordToken: {
				key : randomPassword,
				expiry : new Date(),
				status : false
			},
			modifiedAt: new Date,
			status: true
		};

		Recruiter.update({emailAddress : recruiter.emailAddress}, { $set : recruiterInfo}, function(err, res){
			if(err){
				console.log(err)
				fut['return']({'error': 'Unable to send activation mail'});
			}
			else{
				var link = {
					emailAddress : recruiter.emailAddress,
					key : recruiterInfo.passwordToken.key
				}
				link = encryptData(JSON.stringify(link), globals.passwordReset)
				if(recruiter && recruiter.model == 1 && recruiter.saasActivation && recruiter.saasActivation.type == 0){
					var emailBody = xsActivationMailer
							.replace('[Recruiter_Name]', recruiter.name)
							.replace('[Link]', globals.website+'createPassword?id='+link)
							.replace('[register_page]',globals.website+'Register');
							
					var emailInfo = {
						fromname: 'GrownOut Team',
						to: recruiter.emailAddress,
						subject: 'Warm Welcome '+recruiter.name.split(' ')[0]+' , GrownOut XS Account Active, Start hiring Now!',
						html: emailBody
					}
				}
				else{
					var emailBody = newactivationMailer
							.replace('[Recruiter_Name]', recruiter.name)
							.replace('[Link]', globals.website+'createPassword?id='+link);
										
					var emailInfo = {
						fromname: 'GrownOut Team',
						to: recruiter.emailAddress,
						subject: 'Your GrownOut account is activated, Start hiring today !',
						html: emailBody
					}
				}
				fut['return']({'success': 'Activation mail sent successfully'});
				Meteor.call('sendEmail', emailInfo)
			}
		})

		return fut.wait();
	},

	getDecisionMakers: function(companyId){
		var fut = new Future();
		query = {
		    "query": {
		        "nested": {
		           "path": "linkedin.experiences",
		           "query": {

		        "bool": {
		            "must": [
		               {"term": {
		                  "linkedin.experiences.current": {
		                     "value": "true"
		                  }
		               }},
		               {
		                   "term": {
		                      "linkedin.experiences.company.linkedin_id": {
		                         "value": companyId
		                      }
		                   }
		               },
		               {
		                   "bool": {
		                       "should": []}}
		            ]
		        }
		    }
		}
		}
		}

    for(des in imp_people_des){
      query["query"]["nested"]["query"]["bool"]["must"][2]["bool"]["should"].push({
				"match": {
					"linkedin.experiences.title":{
						"query" : imp_people_des[des],
						"operator": "and"
					}
				}
			})
  	}
		// console.log(JSON.stringify(query))
		
		elasticSearchClientH4.search('complete', 'user', query, function(err, data){
			data = JSON.parse(data);
			if(err == undefined && data.hits && data.hits.total > 0){
				// console.log(data.hits.hits[0]._source)
				console.log(data.hits)

				fut['return']({'success': data.hits.hits,'total':data.hits.total});

			}
			else
				console.log("[!] from elasticSearchClientH4", err)
		});

		return fut.wait();
	},

	getPotentialCompaniesData: function(filter_dict,priorityDecider,page){
		var fut = new Future();
		var filter_query = []
		count = 0, from=0;
		for(keys in filter_dict){count+=1}

		page = +(page)
		if(page){
			from = (page - 1)*20
		}

		if(count > 0){

			if(filter_dict.company_size)
				filter_query.push(range_size_filter(filter_dict.company_size,'people_count'))

			if(filter_dict.attrition)
				filter_query.push(range_size_filter(filter_dict.attrition,'attrition'))

			if(filter_dict.tech_people)
				filter_query.push(range_size_filter(filter_dict.tech_people,'tech_people'))

			if(filter_dict.last_year_hired)
				filter_query.push(range_size_filter(filter_dict.last_year_hired,'last_year_hired'))

			if(filter_dict.industry){
				// var ind_filter = {'or': []}

				// for(var ind_obj =0; ind_obj<=filter_dict.industry; ind_obj++){

				// 	ind_filter.or.push({'term': {'industry': ind_obj['name']}})
				// 	filter_query.push(ind_filter)
				// }
				var industry = filter_dict.industry.toLowerCase().replace(/ /g, ' AND ')
				// filter_query.push({'term': {'industry': {'value' :industry}}})
				filter_query.push({"query":{"query_string":{"default_field":"industry","query":industry}}})
			}
			
			if(filter_dict.headquarter){
				var headquarters = filter_dict.headquarter.toLowerCase().replace(/ /g, ' AND ');
				// filter_query.push({'term': {'headquarter_predicted': {'value' :headquarters}}})
				filter_query.push({"query":{"query_string":{"default_field":"headquarter_predicted","query":headquarters}}})
			}
		}
		
		var final_query = {}

		if (filter_query.length == 0){
			final_query = {
		 		"query": {
					"function_score": {
						"query": {"match_all": {}},
						"functions": [
							{
								"script_score": {
									"script": "return ((Math.sqrt(doc['tech_people'].value)**"+priorityDecider[0]+")+1)*((doc['attrition'].value)**"+priorityDecider[1]+"+1)*((doc['total_job'].value)**"+priorityDecider[2]+"+1)*((Math.sqrt(doc['people_count'].value))**"+priorityDecider[3]+"+1)*((Math.sqrt(doc['last_year_hired'].value))**"+priorityDecider[4]+"+1)"
								}
							}
						]
					}
				},
				"from":from,
				"size":20,
				"_source": ["name","industry","headquarters","headquarter_predicted","people_count","last_year_hired","locations","total_job"]

			}
		}
		else{
			final_query = {"query": {
			   "filtered": {
			     "query": {
			       "function_score": {
			         "query": {
			           "match_all": {}
			         },
			         "functions": [
			           {
			         	    "script_score": {
			               "script": "return ((Math.sqrt(doc['tech_people'].value)**"+priorityDecider[0]+")+1)*((doc['attrition'].value)**"+priorityDecider[1]+"+1)*((doc['total_job'].value)**"+priorityDecider[2]+"+1)*((Math.sqrt(doc['people_count'].value))**"+priorityDecider[3]+"+1)*((Math.sqrt(doc['last_year_hired'].value))**"+priorityDecider[4]+"+1)"
			             }
			           }
			         ]
			       }
			     },
			"filter": {"and": {
			       "filters": filter_query
			     }
			     }
			   }
			 },"from": from,
			 "size": 20,
			 "_source": ["name","industry","headquarters","headquarter_predicted","people_count","last_year_hired","locations","total_job"]
			}
		}
		

		// console.log(JSON.stringify(final_query))
		elasticSearchClientH4.search('dealsathon_updated', 'stats2', final_query, function(err, data){
			data = JSON.parse(data);
			if(err == undefined && data.hits && data.hits.total > 0){
				fut['return']({'success': data.hits.hits,'total':data.hits.total});
			}
			else
				console.log("[!] from elasticSearchClientH4", err)
		});
			return fut.wait();
	}
})

range_size_filter = function(filter_obj, attribute){
	filter = {"range": {}}
	filter["range"][attribute] = {
		"from": filter_obj.min,
		"to": filter_obj.max
	}
	return filter
}


