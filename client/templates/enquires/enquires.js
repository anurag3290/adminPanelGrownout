Template.enquires.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);
	
	if(!reactiveVar1.get()){
		Meteor.call('getenquires',function(err, res1){
			if(err){
				console.log(err)
			}
			else{
				if(res1.success){
					reactiveVar1.set({'data': res1.success.obj, 'time': new Date().getTime()})
				}
			}
		});
	}
}

Template.enquires.helpers({
	'getenquiry': function(){
		var ser = reactiveVar1.get()
		if(ser)
			return ser.data;
	},

	'timer' :function (){
	 return Session.get("time");
	}
});

Template.enquires.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('enqTable', searchKey)
	},

	'click .inc': function(event) {
		var ser = reactiveVar1.get()
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
			JSONToCSVConvertor(myRows, "Enquires list", true);
		}
	},
	'click .ref' : function(event){
		reactiveVar1.set('')
		if(!reactiveVar1.get()){
			Meteor.call('getenquires',function(err, res1){
				if(err){
					console.log(err)
				}
				else{
					if(res1.success){
						reactiveVar1.set({'data': res1.success.obj, 'time': new Date().getTime()})
					}
				}
			});
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

