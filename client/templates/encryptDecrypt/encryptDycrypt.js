Template.encryptDecrypt.rendered = function(){
	var domheight = $(window).height();
	var loaderHeight = $('.preloader').height()
	$('.preloader').css('min-height',domheight);
}

Template.encryptDecrypt.events({
	'click .encrypt' : function(event, template){
		var encryptId = $('.idToBeProcessed').val()
		if(encryptId){
			Meteor.call('encryptIds', encryptId, function(err, res2){
				if(err){
					console.log(err)
				}
				else{
					if(res2.success){
						$('#cryptedResult').text(res2.success)
					}
				}
			});
		}
		else{
			Notifications.error('', 'Please Enter the Id')
		}
	},

	'click .decrypt' : function(event, template){
		var decryptId = $('.idToBeProcessed').val()
		if(decryptId){
			Meteor.call('decryptIds', decryptId, function(err, res2){
				if(err){
					console.log(err)
				}
				else{
					if(res2.success){
						$('#cryptedResult').text(res2.success)
					}
				}
			});
		}
		else{
			Notifications.error('', 'Please Enter the Id')
		}
	}
})