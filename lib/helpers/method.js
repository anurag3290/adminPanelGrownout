meteorToMongo = function(meteorId){
	try{
		return new Meteor.Collection.ObjectID(meteorId);
	}
	catch(e){
		return ''
	}
}

makeTitleText = function(txt) {
	var pieces = txt.split(' '), result = '';
	pieces.forEach(function(piece) {
		if(piece.length) {
			result += trim(piece).charAt(0).toUpperCase() + trim(piece).substr(1).toLowerCase() + ' ';
		}
	});
	return trim(result);
}

trim = function(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}