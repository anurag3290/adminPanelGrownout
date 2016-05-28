Template.potentialcompanies.rendered = function(){
	var domheight = $(window).height();
	$('.preloader').css('min-height',domheight);

	$('#sortable').hide()
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();

	getPotentialCompaniesData()
}

Template.potentialcompanies.helpers({
	'company': function(){
		var ser = reactiveVar9.get()
		return ser
	},

	'industryFacets' : function(){
		var industries = ['Accounting','Airlines/Aviation','Alternative Dispute Resolution','Alternative Medicine','Animation','Apparel & Fashion','Architecture & Planning','Arts and Crafts','Automotive','Aviation & Aerospace','Banking','Biotechnology','Broadcast Media','Building Materials','Business Supplies and Equipment','Capital Markets','Chemicals','Civic & Social Organization','Civil Engineering','Commercial Real Estate','Computer & Network Security','Computer Games','Computer Hardware','Computer Networking','Computer Software','Construction','Consumer Electronics','Consumer Goods','Consumer Services','Cosmetics','Dairy','Defense & Space','Design','Education Management','E-Learning','Electrical/Electronic Manufacturing',   'Entertainment','Environmental Services','Events Services','Executive Office','Facilities Services','Farming','Financial Services','Fine Art','Fishery','Food & Beverages','Food Production','Fund-Raising','Furniture','Gambling & Casinos','Glass, Ceramics & Concrete','Government Administration','Government Relations','Graphic Design','Health, Wellness and Fitness','Higher Education','Hospital & Health Care','Hospitality','Human Resources','Import and Export','Individual & Family Services','Industrial Automation','Information Services','Information Technology and Services','Insurance','International Affairs','International Trade and Development','Internet','Investment Banking','Investment Management','Judiciary','Law Enforcement','Law Practice','Legal Services','Legislative Office','Leisure, Travel & Tourism','Libraries','Logistics and Supply Chain','Luxury Goods & Jewelry','Machinery','Management Consulting','Maritime','Marketing and Advertising','Market Research','Mechanical or Industrial Engineering','Media Production','Medical Devices','Medical Practice','Mental Health Care','Military','Mining & Metals','Motion Pictures and Film','Museums and Institutions','Music','Nanotechnology','Newspapers','Nonprofit Organization Management','Oil & Energy','Online Media','Outsourcing/Offshoring','Package/Freight Delivery','Packaging and Containers','Paper & Forest Products','Performing Arts','Pharmaceuticals','Philanthropy','Photography','Plastics','Political Organization','Primary/Secondary Education','Printing','Professional Training & Coaching','Program Development','Public Policy','Public Relations and Communications','Public Safety','Publishing','Railroad Manufacture','Ranching','Real Estate','Recreational Facilities and Services','Religious Institutions','Renewables & Environment','Research','Restaurants','Retail','Security and Investigations','Semiconductors','Shipbuilding','Sporting Goods','Sports','Staffing and Recruiting','Supermarkets','Telecommunications','Textiles','Think Tanks','Tobacco','Translation and Localization','Transportation/Trucking/Railroad','Utilities','Venture Capital & Private Equity','Veterinary','Warehousing','Wholesale','Wine and Spirits','Wireless ','Writing and Editing'];
		return industries
	},

	'allCities' : function(){
		return globalLocationObj
	},

	'preMeetingCompanyId' : function(){
		return this._id
	},

	'locationCount' : function(){
		if(this && this._source)
			return this._source.locations.length
		else 0
	},
	
	'resultCount' : function(){
		if(Session.get('resultCount')){
			return Session.get('resultCount')
		}
	},

	'companyName': function(){
		return this._source.name
	},

	'preMeeting': function(){
		if (this._source.people_count < 10000)
			return true
		else return false
	}
});

Template.potentialcompanies.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('comTable', searchKey)
	},

	'click .inc': function(event) {
		var ser = reactiveVar9.get()
		if(ser){
			var myRows = [];
			var $headers = $("th");
			var $rows = $("tbody tr").each(function(index) {
			  $cells = $(this).find("td");
			  myRows[index] = {};
			  $cells.each(function(cellIndex) {
			    myRows[index][$($headers[cellIndex]).text()] = $(this).text();
			  });    
			});			JSONToCSVConvertor(myRows, "Companies list", true);
		}
	},

	'click .ref' : function(event){
		getPotentialCompaniesData()
	},

	'click #page-wrapper' : function(event, template){
		if($(event.target).hasClass('priority'))
			$('#sortable').toggle()
		else{
			$('#sortable').hide()
		}
	},

	'click .filter' : function(event){
		getPotentialCompaniesData()
	},

	'click .locationCount' : function(event){
		var parent = $(event.target).closest('tr')
		var child = $(parent).find('.locationCount')
		Session.set('companyModal',this)
		$('.locationCountModal').modal('show')
	},

	'click .openDecisionMakers' : function(event){

		$('.decisionMakers').modal('show')
		decisionMakersFunction(this._id)
	},

	'click .fa-chevron-left' : function(event){
		
		var page = $("#pageNo").text().trim()
		if(page == 1){
			// Disable
			alert("This is first page!!")
		}
		else{
			page = parseInt(page) - 1
			$('#pageNo').text(page)
			getPotentialCompaniesData()
			$('html, body').animate({scrollTop:0}, 'slow')
		}
	},

	'click .fa-chevron-right' : function(event){
		var page = $("#pageNo").text().trim()
		if(reactiveVar9.get() && reactiveVar9.get().length == 20){
			page = parseInt(page) + 1
		
			$('#pageNo').text(page)
			getPotentialCompaniesData()
			$('html, body').animate({scrollTop:0}, 'slow')
		}
		else{
			alert("This is the last page!!")
		}
	},

	'click .noPreMeeting' : function(event){
		alert("Company size is too large. Contact Bharvi !!")
	}
});

Template.locationCountModal.helpers({
	'companyModal': function(){
		var companyModal = Session.get('companyModal')
		var location = []
		if(companyModal && companyModal._source){
			for(i=1;i<companyModal._source.locations.length;i++){
				location.push(companyModal._source.locations[i])
			}
			return location
		}
	}
})

Template.decisionMakers.helpers({
	'decisionMakersRender': function(){

		if(reactiveVar10.get()){
			var ser = reactiveVar10.get()
			// console.log(ser)
			return ser
		}
	}
})

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

priorityCalculator = function(priority){
	// console.log(priority)
	var priorityDecider = []
	var count = priority.length
	for(i=0;i<count;i++){
		if(priority[i] == 'Min. Tech Employees')
			priorityDecider.push(i+1)
	}
	for(i=0;i<count;i++){
		if(priority[i] == 'Attrition Rate')
			priorityDecider.push(i+1)
	}
	for(i=0;i<count;i++){
		if(priority[i] == 'No. of Hiring')
			priorityDecider.push(i+1)
	}
	for(i=0;i<count;i++){
		if(priority[i] == 'Company Size')
			priorityDecider.push(i+1)
	}
	for(i=0;i<count;i++){
		if(priority[i] == 'Last year hired')
			priorityDecider.push(i+1)
	}
	return priorityDecider
}

priorityValueDecider = function(priorityDecider){
	var priorityValue = [1,2,3,4,5]
	var count = priorityDecider.length
	for(i=0;i<count;i++){
		if(priorityDecider[i] == 1)
			priorityValue[i] = 5
	}
	for(i=0;i<count;i++){
		if(priorityDecider[i] == 2)
			priorityValue[i] = 4
	}
	for(i=0;i<count;i++){
		if(priorityDecider[i] == 3)
			priorityValue[i] = 3
	}
	for(i=0;i<count;i++){
		if(priorityDecider[i] == 4)
			priorityValue[i] = 2
	}
	for(i=0;i<count;i++){
		if(priorityDecider[i] == 5)
			priorityValue[i] = 1
	}
	return priorityValue
}

function getPotentialCompaniesData(){

	reactiveVar9.set('')
	var priority = []
		var filter={}
		var filterAttrition={}
		var filterTechEmp={}
		var filterHeadqrtrs
		var filterHiring={}
		var filterIndustry
		var filterCompanySize={}
		var page = $("#pageNo").text().trim()
		// Attrition
		if($('#attrition-min').val()){
			filterAttrition.min = parseInt($('#attrition-min').val())
			filter['attrition'] = filterAttrition
		}
		if($('#attrition-max').val()){
			filterAttrition.max = parseInt($('#attrition-max').val())
			filter['attrition'] = filterAttrition
		}

		// Minimum tech employees
		if($('#techemp-min').val()){
			filterTechEmp.min = parseInt($('#techemp-min').val())
			filter['tech_people'] = filterTechEmp
		}

		// Headquarters
		if($('#headqrtrs').val()){
			filter['headquarter'] = $('#headqrtrs').val()
		}

		// No. of Hiring
		if($('#hiring-min').val()){
			filterHiring.min = parseInt($('#hiring-min').val())
			filter['last_year_hired'] = filterHiring
		}
		if($('#hiring-max').val()){
			filterHiring.max = parseInt($('#hiring-max').val())
			filter['last_year_hired'] = filterHiring
		}

		// Industry
		if($('#industryType').val()){
			filter['industry'] = $('#industryType').val()
		}

		// Company Size
		if($('#CompanySize-min').val()){
			filterCompanySize.min = parseInt($('#CompanySize-min').val())
			filter['company_size'] = filterCompanySize
		}
		if($('#CompanySize-max').val()){
			filterCompanySize.max = parseInt($('#CompanySize-max').val())
			filter['company_size'] = filterCompanySize
		}
		
		// console.log(filter)
		
		// Priority Calculation
		var priority = []
		var priorityDecider = []
		var priorityValue = []
		$('#sortable li').each(function(){
			priority.push($(this).text())
		})
		priorityDecider = priorityCalculator(priority)
		priorityValue = priorityValueDecider(priorityDecider)
	

		Meteor.call('getPotentialCompaniesData',filter,priorityValue, page, function(err, res){
			if(err){
				console.log(err)
			}
			else{
				if(res.success){
					// console.log(res.success)
					Session.set('resultCount',res.total)
					reactiveVar9.set(res.success)
				}
			}
		});
}

function decisionMakersFunction(companyId){
	reactiveVar10.set('') 
	Meteor.call('getDecisionMakers', companyId,function(err, res){
		if(err){
			console.log(err)
		}
		else{
			if(res.success){
				// console.log(res.success)
				reactiveVar10.set(res.success)
			}
		}
	});
}