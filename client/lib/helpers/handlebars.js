Template.registerHelper('momentDate', function(date) {
	return moment(date).format('ddd, MMM Do YYYY, HH:mm:ss');
});

momentDate1 = function(date){
	return moment(date).format('ddd, MMM Do YYYY, HH:mm:ss');
}

Template.registerHelper('strengthCalulator', function(strength) {
	
	if(!strength)
		return ''

	strength = strength.toString();
	switch (strength) {
		case '1':
			strength = 'Myself Only';
			break;
		case '2':
			strength = '2-10';
			break;
		case '3':
			strength = '11-50';
			break;
		case '4':
			strength = '51-200';
			break;
		case '5':
			strength = '201-500';
			break;
		case '6':
			strength = '501-1000';
			break;
		case '7':
			strength = '1001-5000';
			break;
		case '8':
			strength = '5000-10000';
			break;
		case '9':
			strength = '10000+';
			break;
	}
	return strength;
});

Template.registerHelper('demoReasonCalculator', function(reason) {
	
	if(!reason)
		return ''

	reason = reason.toString();
	switch (reason) {
		case '1':
			reason = 'Looking for a hiring solution';
			break;
		case '2':
			reason = 'Seeking job opportunities';
			break;
		case '3':
			reason = 'Just curious';
			break;
	}
	return reason;
});

//For Excel Sheet
JSONToCSVConvertor = function(JSONData, ReportTitle, ShowLabel) {
	//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	
	var CSV = '';    
	//Set Report title in first row or line
	
	CSV += ReportTitle + '\r\n\n';

	//This condition will generate the Label/Header
	if (ShowLabel) {
		var row = "";
		
		//This loop will extract the label from 1st index of on array
		for (var index in arrData[0]) {
			
			//Now convert each value to string and comma-seprated
			row += index + ',';
		}

		row = row.slice(0, -1);
		
		//append Label row with line break
		CSV += row + '\r\n';
	}
	
	//1st loop is to extract each row
	for (var i = 0; i < arrData.length; i++) {
		var row = "";
		
		//2nd loop will extract each column and convert it in string comma-seprated
		for (var index in arrData[i]) {
			row += '"' + arrData[i][index] + '",';
		}

		row.slice(0, row.length - 1);
		
		//add a line break after each row
		CSV += row + '\r\n';
	}

	if (CSV == '') {        
		alert("Invalid data");
		return;
	}   
	
	//Generate a file name
	var fileName = "MyReport_";
	//this will remove the blank-spaces from the title and replace it with an underscore
	fileName += ReportTitle.replace(/ /g,"_");   
	
	//Initialize file format you want csv or xls
	var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
	
	// Now the little tricky part.
	// you can use either>> window.open(uri);
	// but this will not work in some browsers
	// or you will not get the correct file extension    
	
	//this trick will generate a temp <a /> tag
	var link = document.createElement("a");    
	link.href = uri;
	
	//set the visibility hidden so it will not effect on your web-layout
	link.style = "visibility:hidden";
	link.download = fileName + ".csv";
	
	//this part will append the anchor tag and remove it after automatic click
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

strengthCalulator = function (strength) {

	if(!strength)
		return ''
	var strength = strength.toString();
	switch (strength) {
		case '1':
			strength = 'Myself Only';
			break;
		case '2':
			strength = '2-10 employees';
			break;
		case '3':
			strength = '11-50 employees';
			break;
		case '4':
			strength = '51-200 employees';
			break;
		case '5':
			strength = '201-500 employees';
			break;
		case '6':
			strength = '501-1000 employees';
			break;
		case '7':
			strength = '1001-5000 employees';
			break;
		case '8':
			strength = '5000-10000 employees';
			break;
		case '9':
			strength = '10000+ employees';
			break;
	}
	return strength;
}
