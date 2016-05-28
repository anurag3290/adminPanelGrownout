Template.company.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
	Session.set("companyModel",'')
}

Template.company.helpers({
	'company': function(){
		var checkModel = Session.get("companyModel")
		if(checkModel == ''){
			var arr= ["https://www.grownout.com/","www.grownout.com"]
			var grownoutCompany = Company.find({websiteLink: {$in :arr}},{sort: {'createdAt': -1}}).fetch()
			var otherCompany = Company.find({websiteLink: {$nin :arr}},{sort: {'createdAt': -1}}).fetch()
			var result = otherCompany.concat(grownoutCompany)
			return result
			Session.set("reactiveVar4",result)
		}
		var result = Session.get("reactiveVar4")
		if(result){
			return result
		}
	},

	'modelType': function(){
		if(this.emailAddress){
			var recruiter = Recruiter.findOne({emailAddress:this.emailAddress})
			if(recruiter){
				if(recruiter.model || recruiter.model==0){
					if(recruiter.model == 0){
						return 'Referral only'
					}
					else if(recruiter.model == 2){
						return 'Referral + XS'
					}
					else if(recruiter.model == 1 && recruiter.saasActivation){
						return 'Online'
					}
					else if(recruiter.model == 1 && !recruiter.saasActivation){
						return 'XS only'
					}
				}
				else{
					return '--'
				}
			}
		}
		return '--'
	},

	'totalRecruiters' : function(){
		var compId = this._id._str
		if (Recruiter.find({company: compId}).count())
			return {count: Recruiter.find({company: compId}).count(),compId: compId}
		else return false
	},
	
	'strengthCalculator' : function(){
		var strength = Company.find({_id : this._id}).fetch()[0].strength
		var range = strengthCalulator(strength)
		return range.split(" ")[0]
	},

	'jobCount': function(){
		if(this){
			return Job.find({company:this._id._str}).count()
		}
	}
});

Template.company.events({
	"change #modelFilter": function(event, template){
		var category = $(event.currentTarget).val();
		Session.set("reactiveVar4",[])
		var checkModel = Session.set("companyModel",category)
		modelBasedCompany()
	},

	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('comTable', searchKey)
	},

	'click .inc': function(event) {
		if(Company.find() && Company.find().fetch()){
			var myRows = [];
			var $headers = $("th");
			var $rows = $("tbody tr").each(function(index) {
			  $cells = $(this).find("td");
			  myRows[index] = {};
			  $cells.each(function(cellIndex) {
			    myRows[index][$($headers[cellIndex]).text()] = $(this).text();
			  });    
			});

			JSONToCSVConvertor(myRows, "Companies list", true);
		}
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

modelBasedCompany = function(){
	var checkModel = parseInt(Session.get("companyModel"))
	if(checkModel || checkModel == 0){
		var arr= ["https://www.grownout.com/","www.grownout.com"]
		var grownoutCompany = Company.find({websiteLink: {$in :arr}},{sort: {'createdAt': -1}}).fetch()
		var otherCompany = Company.find({websiteLink: {$nin :arr}},{sort: {'createdAt': -1}}).fetch()
		var result = otherCompany.concat(grownoutCompany)
		var companyArray = []
		switch(checkModel){
			case 0: 
				if(result.length > 0){
					for(i=0;i<result.length;i++){
						var rec = Recruiter.findOne({emailAddress:result[i].emailAddress})
						if(rec && rec.model == 0){
							companyArray.push(result[i])
						}
					}
				}
				Session.set("reactiveVar4",companyArray)
				break;
			case 1: 
				if(result.length > 0){
					for(i=0;i<result.length;i++){
						var rec = Recruiter.findOne({emailAddress:result[i].emailAddress})
						if(rec && rec.model == 1){
							companyArray.push(result[i])
						}
					}
				}
				Session.set("reactiveVar4",companyArray)
				break;

			case 2: 
				if(result.length > 0){
					for(i=0;i<result.length;i++){
						var rec = Recruiter.findOne({emailAddress:result[i].emailAddress})
						if(rec && rec.model == 2){
							companyArray.push(result[i])
						}
					}
				}
				Session.set("reactiveVar4",companyArray)
				break;

			case 4 : 
				if(result.length > 0){
					for(i=0;i<result.length;i++){
						var rec = Recruiter.findOne({emailAddress:result[i].emailAddress})
						if(rec && rec.model == 1 && result[i].paid){
							companyArray.push(result[i])
						}
					}
				}
				Session.set("reactiveVar4",companyArray)
				break;

			default:
				Session.set("reactiveVar4",result)
				break;
		}
	}
}