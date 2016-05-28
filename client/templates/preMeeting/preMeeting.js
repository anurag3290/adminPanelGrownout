var skillArray = []
var words= []

Template.preMeeting.rendered = function(){

	// var response = {"data":{
	// 	total_employees: 1298,
	// 	experience_ranges: {	
	// 	hits: {
	// 	hits: [ ],
	// 	total: 1298,
	// 	max_score: 0
	// 	},
	// 	_shards: {
	// 	successful: 8,
	// 	failed: 0,
	// 	total: 8
	// 	},
	// 	took: 4,
	// 	aggregations: {
	// 	exp_ranges: {
	// 	buckets: [
	// 	{
	// 	to: 365,
	// 	to_as_string: "365.0",
	// 	key: "*-365.0",
	// 	doc_count: 135
	// 	},
	// 	{
	// 	from: 365,
	// 	from_as_string: "365.0",
	// 	to_as_string: "730.0",
	// 	doc_count: 199,
	// 	to: 730,
	// 	key: "365.0-730.0"
	// 	},
	// 	{
	// 	from: 730,
	// 	from_as_string: "730.0",
	// 	to_as_string: "1825.0",
	// 	doc_count: 489,
	// 	to: 1825,
	// 	key: "730.0-1825.0"
	// 	},
	// 	{
	// 	from: 1825,
	// 	from_as_string: "1825.0",
	// 	to_as_string: "3650.0",
	// 	doc_count: 369,
	// 	to: 3650,
	// 	key: "1825.0-3650.0"
	// 	},
	// 	{
	// 	from_as_string: "3650.0",
	// 	from: 3650,
	// 	key: "3650.0-*",
	// 	doc_count: 106
	// 	}
	// 	]
	// 	}
	// 	},
	// 	timed_out: false
	// 	},
	// 	total_employee_retention: "8",
	// 	per_month_attiration:{
	// 	"April-2014": 38,
	// 	"May-2014": 42,
	// 	"June-2014": 24,
	// 	"July-2014": 25,
	// 	"August-2014": 13,
	// 	"September-2014": 17,
	// 	"October-2014": 23,
	// 	"November-2014": 15,
	// 	"December-2014": 8,
	// 	"January-2015": 23,
	// 	"February-2015": 9,
	// 	"March-2015": 7
	// 	},
	// 	attiration_rate: "12.65",
	// 	top_skills: {
	// 	hits: {
	// 	hits: [ ],
	// 	total: 1298,
	// 	max_score: 0
	// 	},
	// 	_shards: {
	// 	successful: 8,
	// 	failed: 0,
	// 	total: 8
	// 	},
	// 	took: 12,
	// 	aggregations: {
	// 	the_name: {
	// 	buckets: [
	// 	{
	// 	key: "Team Management",
	// 	doc_count: 481
	// 	},
	// 	{
	// 	key: "Business Development",
	// 	doc_count: 381
	// 	},
	// 	{
	// 	key: "Market Research",
	// 	doc_count: 334
	// 	},
	// 	{
	// 	key: "CRM",
	// 	doc_count: 311
	// 	},
	// 	{
	// 	key: "Sales",
	// 	doc_count: 286
	// 	},
	// 	{
	// 	key: "New Business Development",
	// 	doc_count: 250
	// 	},
	// 	{
	// 	key: "Marketing",
	// 	doc_count: 249
	// 	},
	// 	{
	// 	key: "Management",
	// 	doc_count: 246
	// 	},
	// 	{
	// 	key: "Competitive Analysis",
	// 	doc_count: 231
	// 	},
	// 	{
	// 	key: "Key Account Management",
	// 	doc_count: 223
	// 	},
	// 	{
	// 	key: "Microsoft Office",
	// 	doc_count: 213
	// 	},
	// 	{
	// 	key: "Business Strategy",
	// 	doc_count: 193
	// 	},
	// 	{
	// 	key: "Marketing Strategy",
	// 	doc_count: 193
	// 	},
	// 	{
	// 	key: "Online Advertising",
	// 	doc_count: 190
	// 	},
	// 	{
	// 	key: "Lead Generation",
	// 	doc_count: 183
	// 	},
	// 	{
	// 	key: "Customer Service",
	// 	doc_count: 175
	// 	},
	// 	{
	// 	key: "Microsoft Excel",
	// 	doc_count: 175
	// 	},
	// 	{
	// 	key: "Negotiation",
	// 	doc_count: 172
	// 	},
	// 	{
	// 	key: "PowerPoint",
	// 	doc_count: 151
	// 	},
	// 	{
	// 	key: "Sales Management",
	// 	doc_count: 143
	// 	},
	// 	{
	// 	key: "Recruiting",
	// 	doc_count: 138
	// 	},
	// 	{
	// 	key: "MIS",
	// 	doc_count: 135
	// 	},
	// 	{
	// 	key: "Teamwork",
	// 	doc_count: 133
	// 	},
	// 	{
	// 	key: "Microsoft Word",
	// 	doc_count: 131
	// 	},
	// 	{
	// 	key: "Online Marketing",
	// 	doc_count: 127
	// 	},
	// 	{
	// 	key: "Account Management",
	// 	doc_count: 121
	// 	},
	// 	{
	// 	key: "Leadership",
	// 	doc_count: 117
	// 	},
	// 	{
	// 	key: "Talent Acquisition",
	// 	doc_count: 101
	// 	},
	// 	{
	// 	key: "Digital Marketing",
	// 	doc_count: 92
	// 	},
	// 	{
	// 	key: "C",
	// 	doc_count: 89
	// 	},
	// 	{
	// 	key: "Research",
	// 	doc_count: 88
	// 	},
	// 	{
	// 	key: "Vendor Management",
	// 	doc_count: 87
	// 	},
	// 	{
	// 	key: "Marketing Management",
	// 	doc_count: 86
	// 	},
	// 	{
	// 	key: "Sourcing",
	// 	doc_count: 86
	// 	},
	// 	{
	// 	key: "Brand Management",
	// 	doc_count: 85
	// 	},
	// 	{
	// 	key: "Marketing Communications",
	// 	doc_count: 84
	// 	},
	// 	{
	// 	key: "MySQL",
	// 	doc_count: 84
	// 	},
	// 	{
	// 	key: "HTML",
	// 	doc_count: 81
	// 	},
	// 	{
	// 	key: "Strategy",
	// 	doc_count: 81
	// 	},
	// 	{
	// 	key: "Team Building",
	// 	doc_count: 80
	// 	},
	// 	{
	// 	key: "Analytics",
	// 	doc_count: 79
	// 	},
	// 	{
	// 	key: "C++",
	// 	doc_count: 79
	// 	},
	// 	{
	// 	key: "Java",
	// 	doc_count: 78
	// 	},
	// 	{
	// 	key: "Social Media Marketing",
	// 	doc_count: 77
	// 	},
	// 	{
	// 	key: "Social Media",
	// 	doc_count: 76
	// 	},
	// 	{
	// 	key: "Strategic Planning",
	// 	doc_count: 76
	// 	},
	// 	{
	// 	key: "English",
	// 	doc_count: 73
	// 	},
	// 	{
	// 	key: "PHP",
	// 	doc_count: 73
	// 	},
	// 	{
	// 	key: "Product Management",
	// 	doc_count: 71
	// 	},
	// 	{
	// 	key: "Advertising",
	// 	doc_count: 70
	// 	}
	// 	],
	// 	sum_other_doc_count: 7374,
	// 	doc_count_error_upper_bound: 8
	// 	}
	// 	},
	// 	timed_out: false
	// 	},
	// 	total_hired_previous_year: "4",
	// 	top_incoming_outgoing_companies: {
	// 	top_companies_coming_from: [
	// 	[
	// 	"Naukri.com",
	// 	36
	// 	],
	// 	[
	// 	"Infoedge India Ltd.,",
	// 	32
	// 	],
	// 	[
	// 	"HCL Technologies",
	// 	12
	// 	],
	// 	[
	// 	"Info Edge India Ltd.",
	// 	10
	// 	],
	// 	[
	// 	"Infosys",
	// 	8
	// 	],
	// 	[
	// 	"Reliance Communications",
	// 	8
	// 	],
	// 	[
	// 	"Tata Consultancy Services",
	// 	8
	// 	],
	// 	[
	// 	"Bennett, Coleman and Co. Ltd. (Times Group)",
	// 	7
	// 	],
	// 	[
	// 	"ICICI Bank",
	// 	7
	// 	],
	// 	[
	// 	"99acres.com",
	// 	7
	// 	]
	// 	],
	// 	top_companies_going_to: [
	// 	[
	// 	"Naukri.com",
	// 	25
	// 	],
	// 	[
	// 	"Snapdeal",
	// 	17
	// 	],
	// 	[
	// 	"Infoedge India Ltd.,",
	// 	17
	// 	],
	// 	[
	// 	"Indiamart Intermesh Limited",
	// 	8
	// 	],
	// 	[
	// 	"99acres.com",
	// 	8
	// 	],
	// 	[
	// 	"Bennett Coleman and Co. Ltd. (Times Group)",
	// 	7
	// 	],
	// 	[
	// 	"Bennett, Coleman and Co. Ltd. (Times Group)",
	// 	6
	// 	],
	// 	[
	// 	"Info Edge India Ltd.",
	// 	6
	// 	],
	// 	[
	// 	"HCL Technologies",
	// 	5
	// 	],
	// 	[
	// 	"Infosys",
	// 	5
	// 	]
	// 	]
	// 	}
	// 	}
	// }

	
	// Session.set('preMeetingData', response)
	// console.log(response)
	$('#skillCloud').hide()
	$('#comingFromCloud').hide()
	$('#goingToCloud').hide()
}

Template.preMeeting.created = function(){
 Session.set('preMeetingData','')
	Meteor.call('getPreMeetingData', 'https://www.linkedin.com/company/'+Iron.Location.get().queryObject.company, function(error, res){
		if(error){
			alert("Error Loading. Please refresh the page !!")
			console.log(error)
		}
		else{
			if(res.error){
				alert("Error Loading. Please refresh the page !!")
			}
			else{
				Session.set('preMeetingData',res)
				// console.log(res)
			}
		}
	})
}


Template.preMeeting.helpers({

	'company': function(){
		// console.log(Iron.Location.get().queryObject.company)
	},
	'companyName':function()
	{
		return Iron.Location.get().queryObject.companyName
	},
	'totalEmployees': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data)
		return res.data.total_employees
	},
	'network': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.total_employees)
		return ((res.data.total_employees)*150)
	},
	'cameIn': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data)
		return res.data.total_hired_previous_year
	},
	'goneOut': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data)
		return Math.abs(res.data.total_hired_previous_year - res.data.total_employee_retention)
	},
	'attritionGraphLoader' : function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.per_month_attiration){
			return true
		}
		else return false
	},

	'attritionGraph': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.per_month_attiration){
			attritionData = res.data.per_month_attiration
			monthArray = []
			monthAtrritionArray = []
			currentDate = new Date()
			currentMoment = moment(currentDate).format('MMMM-YYYY')
			for (var i = 0; i < 24; i++) {
				if(attritionData[currentMoment] != undefined){
					monthArray.push(currentMoment.split('-')[0])
					monthAtrritionArray.push(attritionData[currentMoment])
				}
				currentDate.setMonth(currentDate.getMonth() - 1);
				currentMoment = moment(currentDate).format('MMMM-YYYY');
				if (monthArray.length == Object.keys(attritionData).length)
					break;
			}
			monthArray = monthArray.reverse()
			monthAtrritionArray = monthAtrritionArray.reverse()
			dataArray=[
				["Month", "No. Leaving", { role: "style" } ]
			]
			for (var i = 0; i < monthArray.length; i++) {
				if (Math.max.apply(Math, monthAtrritionArray) == monthAtrritionArray[i]){
					dataArray.push([ monthArray[i], monthAtrritionArray[i], "color: #f28028; fill-opacity: 0.7" ])
				}
				else if (Math.min.apply(Math, monthAtrritionArray) == monthAtrritionArray[i]){
					dataArray.push([ monthArray[i], monthAtrritionArray[i], "color: #28aaca; fill-opacity: 0.7" ])
				}
				else{
					dataArray.push([ monthArray[i], monthAtrritionArray[i], "color: #abc1bf; fill-opacity: 0.7" ])
				}
			};
			google.load("visualization", "1", {packages:["corechart"], callback : drawChart(dataArray)});
		}
	},
	'mySkills': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data){
			var response = res.data
		}
		if(response && response.top_skills && response.top_skills.aggregations && response.top_skills.aggregations.the_name){
			var top_skills = response.top_skills.aggregations.the_name.buckets

			var skillOption = ''

			setTimeout(function(){ 
				$('#my-skill').selectMultiple()
			}, 300); 
			return top_skills
		}
	},
	'topIncomingCompanies': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.top_incoming_outgoing_companies){
			setTimeout(function(){
				$('#comingFrom').selectMultiple()
  		}, 300); 
			return res.data.top_incoming_outgoing_companies.top_companies_coming_from
		}
	},
	'topOutgoingCompanies': function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.top_incoming_outgoing_companies){
			setTimeout(function(){
				$('#goingFrom').selectMultiple()
  		}, 300); 
			return res.data.top_incoming_outgoing_companies.top_companies_going_to
		}
	},
	'experienceRangesLoader' : function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.experience_ranges){
			return true
		}
		else return false
	},
	'experienceRanges' : function(){
		var res = Session.get('preMeetingData')
		if(res && res.data && res.data.experience_ranges){
			expCounts = res.data.experience_ranges.aggregations.exp_ranges.buckets
			// pie chart
			google.load("visualization", "1", {packages:["corechart"], callback : drawChart1(expCounts)});

		}
		return 
	}
})

Template.preMeeting.events({
	'click .backTopSkills':function(event){
		// skillArray =[]
		// words =[]
		// $('#skillCloud').jQCloud(words, {
		// 	delay: 50
		// });
		// $('#skillCloud').hide()
		// $('.skillForm').show()
		// $('#my-skill').selectMultiple('deselect_all')
	},

	'click .skillsSelected' :function(event){
		var parent = $(event.target).closest('select')
		var child = $(parent).find('.skillsSelected')

		var text = child.context.innerText.split('[')[0]
		var weight = parseInt(child.context.innerText.split('[')[1].split(']')[0])
		var arrayElement = {
			skill : text,
			weight: weight
		}
		var flag = 0
		if(skillArray.length > 0){
			for(i=0;i<skillArray.length;i++){
				if(skillArray[i].skill == text){
					skillArray.splice(i,1)
					flag = flag + 1
				}
			}
		}
		else{
			flag = 0
		}
		if(flag == 0){
			skillArray.push(arrayElement)
		}
	},

	'click .processSkill' :function(event){
		$('.skillForm').hide()
		$('#skillCloud').show()
		skillArray.sort(function(a,b) {return b.weight - a.weight});
		var length = skillArray.length
		var arrayObject = {}
		for(i=0;i<length;i++){
			switch(i){
				case 0:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 12
					}
					break;
				case 1:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 11
					}
					break;
				case 2:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 11
					}
					break;
				case 3:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 10
					}
					break;
				case 4:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 10
					}
					break;
				default:
					arrayObject = {
						text : skillArray[i].skill,
						weight : 9
					}
					break;
			}
			words.push(arrayObject)
		}

		$('#skillCloud').jQCloud(words, {
			delay: 50
		});
	},

	'click .toFrom' :function(event){
		$('#ms-comingFrom').hide()
		$('#ms-goingFrom').hide()
		$('.toFrom').hide()
		$('#comingFromCloud').show()
		$('#goingToCloud').show()
		
		var comingFrom = $('#comingFrom').val()
		var goingTo = $('#goingFrom').val()
		var word= []
		var word1 = []
		if(comingFrom){
			for(i=0;i<comingFrom.length;i++){
				var arrayObj= {}
				arrayObj = {
					text : comingFrom[i].split(',')[0],
					weight : 2
				}
				word.push(arrayObj)
				delete word[i].attr;
			}
		}
		else{
			// console.log('comingFrom = 0')
		}

		if(goingTo){
			for(i=0;i<goingTo.length;i++){
				var arrayObj= {}
				arrayObj = {
					text : goingTo[i].split(',')[0],
					weight : 2
				}
				word1.push(arrayObj)
				delete word1[i].attr;
			}
		}
		else{
			// console.log('goingTo = 0')
		}

		$('#comingFromCloud').jQCloud(word, {
			delay: 50
		});

		$('#goingToCloud').jQCloud(word1, {
			delay: 50
		});
		return false
	}
})


function drawChart(dataArray) {
	var data = new google.visualization.arrayToDataTable(dataArray);
	var view = new google.visualization.DataView(data);
	view.setColumns([0, 1,
				 { calc: "stringify",
					 sourceColumn: 1,
					 type: "string",
					 role: "annotation" },
				 2]);

	var options = {
		title: "",  titleFontSize:26,top:0, left:0, 
		width: 400,
		height: 300,
		bar: {groupWidth: "50%"},
		legend: { position: "none" },
		vAxis: {
			textPosition: 'none',
			gridlines: {
					color: '#fff',
					count: 6
			}
		},
	};
	// console.log(document.getElementById("columnchart_values"))
	setTimeout(function(){
		var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
		chart.draw(view, options);
	}, 500)
	
}


function drawChart1(expCounts) {
	var data = new google.visualization.arrayToDataTable([
		['Years of Experience', 'Count'],
    ['Less than a Year',      expCounts[0]['doc_count'] ],
		['1 to 2 Years',  expCounts[1]['doc_count'] ],
		['2 to 6 Years',  expCounts[2]['doc_count'] ],
		['6 to 10 Years', expCounts[3]['doc_count'] ],
		['Above 10 Years',        expCounts[4]['doc_count'] ]
	]);
	var options = {
		title: ''
	};

	setTimeout(function(){
		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}, 500)
}