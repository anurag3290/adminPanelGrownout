ElasticSearchClient  = Meteor.npmRequire('elasticsearchclient');
var serverOptions    = globals.elasticEmployeeOptions;
var elasticSearchClient = new ElasticSearchClient(serverOptions);


Meteor.methods({
	getCompanyEmpProfile : function(cmplinkedinId,cId) {
		console.log('started populating network for company: '+cId+' and linkedin id: '+cmplinkedinId);
		if(!cmplinkedinId  || !cId){
			return false
		}
		var self = this;
		var qry = {
			      "query": {
			        "bool": {
			          "should": [
			            {
			              "nested": {
			                "path": "experiences",
			                "query": {
			                  "bool": {
			                    "must": [
			                      {
			                        "match": {
			                          "experiences.company.linkedin_id": cmplinkedinId
			                        }
			                      },
			                      {
			                        "match": {
			                          "experiences.current": true
			                        }
			                      }
			                    ]
			                  }
			                }
			              }
			            },
			            {
			              "term": {
			                "curr_company_id": {
			                  "value": cmplinkedinId
			                }
			              }
			            }
			          ],
			          "must_not": [
			            {
			              "range": {
			                "status_code": {
			                  "gte": 400,
			                  "lte": 600
			                }
			              }
			            }
			          ],"minimum_number_should_match": 1
			        }
			      },  
			"size": 15000,
			"_source": ['_id', 'linkedin.headline', 'linkedin.name', 'linkedin.current_location.name', 'linkedin.profile_pic']
		}
		try{
			elasticSearchClient.search(globals.employeeIndexName, 'user', qry, Meteor.bindEnvironment(function(err, data){

				data = JSON.parse(data);
				if(err){
					// console.log(err)
				}
				if(data.hits.total){
					var arrayEmp=data.hits.hits;
					elasticSearch_length=arrayEmp.length;
					Company.update({_id :new Meteor.Collection.ObjectID(cId)},{ $set :{ "stats" : {"empCount" : elasticSearch_length}}},function(err,data){
						if(err)
							console.log('err :',err)
						else
							console.log('data :',data)
					})

					 /*
					 ** save Company Data matched Emails and unmatchedEmails
					 */
					Meteor.call('getNetworkCount',cmplinkedinId,cId,elasticSearch_length)

					var companyData={
						companyId:cId,
						total :[],
						savedEmails:[],
						unMatchedEmails :[]
					};

					Meteor.call('insertCompanyData',companyData);
					
					arrayEmp.forEach(function(element,index){
						var empObj={
							company:cId,
							amoebaId : encryptAmoebaId(element._id),
							headline :element._source.linkedin.headline || '',
							name :element._source.linkedin.name,
							location :element._source.linkedin.current_location.name || '',
							createdAt : new Date(),
							modifiedAt : new Date (),
							pictureUrl :element._source.linkedin.profile_pic || 'images/avatar.png',
							matchedEmailIds:[]
						};

						Meteor.call('companyEmpInsert',empObj)
					})
				}
				else{
								
				}
			})
			);

		}catch(e){
			console.log('get Company Emp Profile',e.stack)
		}
	},
	getNetworkCount : function (companyLid ,companyId,empCount) {

		var url = globals.esBaseUrl+companyLid+'/candidate/_count'
		Meteor.http.get(url,function (error, data) {
			if (error) {
					console.log(error)
			}else{
				 if(data.data && data.data.count){
						Company.update({_id :new Meteor.Collection.ObjectID(companyId)},{ $set :{ "stats" : {empCount :empCount,networkCount :data.data.count }}},function(err,data){
							if(err){
								console.log('Network count not updated for company with id: '+companyId+ ', err: '+ err)
							}
							else{
								console.log('NetworkCount updated for company: ', companyId)
							}
						})
				}else{
					console.log('Network count not found for company:', companyId)
				}
			}
		})
	},
	insertCompanyData: function(obj){

		var companyData = companyDataDetails.findOne({companyId: obj.companyId})

		if(companyData){
			console.log('Company Data Details existed so not updated for company: ', obj.companyId)
		}
		else{
			companyDataDetails.insert(obj, function(error, result){
				if (error){
					console.log(error)
				}
				else {
					console.log('Updated company data for company: ', obj.companyId);
				}
			})
		}
	},
	companyEmpInsert: function(employee) {

		var emp = Employee.findOne({company: employee.company, amoebaId: employee.amoebaId})

		if(emp){
			console.log('Employee exists so not updated, name: '+ employee.name+', amoebaId: '+ employee.amoebaId)
		}
		else{
			Employee.insert(employee, function(error, result){
				if(error){
					console.log(error)
				}
				else{
					console.log('Inserting employee, name: '+ employee.name+', amoebaId: '+ employee.amoebaId);
				}
			});
		}
	}
})
