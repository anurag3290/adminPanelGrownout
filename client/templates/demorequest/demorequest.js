Template.demorequest.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);
	
	if(!reactiveVar2.get()){
		Meteor.call('getdemorequest',function(err, res2){
			if(err){
				console.log(err)
			}
			else{
				if(res2.success){
					reactiveVar2.set({'data': res2.success.obj, 'time': new Date().getTime()})
				}
			}
		});
	}
}

Template.demorequest.helpers({
	'getdemoreq': function(){
		var ser = reactiveVar2.get();
		if(ser && ser.data){
			ser = ser.data
			return ser.sort(function(x, y){
				y =  new Date(y.modified).getTime()
				x =  new Date(x.modified).getTime()
				return y - x;
			})
		}
	}
});

Template.demorequest.events({
	'keyup #searchProfile': function(event, template){
		var searchKey = $(event.target).val().toLowerCase();
		searchCandidateList('dreqTable', searchKey)
	},
	'click .inc': function(event) {
		var ser = reactiveVar2.get()

		if(ser.data){
			var myRows = [];
			var $headers = $("th");
			var $rows = $("tbody tr").each(function(index) {
			  $cells = $(this).find("td");
			  myRows[index] = {};
			  $cells.each(function(cellIndex) {
			    myRows[index][$($headers[cellIndex]).text()] = $(this).text();
			  });    
			});
			JSONToCSVConvertor(myRows, "Demo Request list", true);
		}
	},
	'click .ref' : function(event){
		reactiveVar2.set('')
		if(!reactiveVar2.get()){
			Meteor.call('getdemorequest',function(err, res2){
				if(err){
					console.log(err)
				}
				else{
					if(res2.success){
						reactiveVar2.set({'data': res2.success.obj, 'time': new Date().getTime()})
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