Template.dashboard.rendered = function(){
	var domheight = $(window).height();
	$('#page-wrapper').css('min-height',domheight);
	google.load('visualization', '1', {packages: ['corechart'], callback:drawMultSeries});
	// google.setOnLoadCallback(drawMultSeries);

	function drawMultSeries() {
		var data = new google.visualization.DataTable();
		data.addColumn('timeofday', 'Time of Day');
		data.addColumn('number', 'Motivation Level');
		data.addColumn('number', 'Energy Level');

		data.addRows([
			[{v: [8, 0, 0], f: '8 am'}, 1, .25],
			[{v: [9, 0, 0], f: '9 am'}, 2, .5],
			[{v: [10, 0, 0], f:'10 am'}, 3, 1],
			[{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
			[{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
			[{v: [13, 0, 0], f: '1 pm'}, 6, 3],
			[{v: [14, 0, 0], f: '2 pm'}, 7, 4],
			[{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
			[{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
			[{v: [17, 0, 0], f: '5 pm'}, 10, 10],
		]);

		var options = {
			title: 'Registration Status',
			hAxis: {
				title: 'Time of Day',
				format: 'h:mm a',
				viewWindow: {
					min: [7, 30, 0],
					max: [17, 30, 0]
				}
			},
			vAxis: {
				title: 'Rating (scale of 1-10)'
			}
		};

		var chart = new google.visualization.ColumnChart(
			document.getElementById('chart_div'));

		chart.draw(data, options);
	}
	// Recruiter Activities
	google.load('visualization', '1', {packages: ['corechart'], callback:drawChart});
	// google.setOnLoadCallback(drawChart);
	function drawChart() {
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Jobs',     11],
			['Active Jobs',      2],
			['Interview',  2],
			['Apply Candidates', 2]
		]);

		var options = {
			title: 'Recruiters Activities',
			is3D: true,
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(data, options);
	}

}

Template.dashboard.helpers({
	'companyCount': function(){
		return Counts.get('companyCounts')
	},

	'regCount': function(){
		return Counts.get('registrationCounts')
	},
	
	'activeJobsCount': function(){
		return Counts.get('activeJobCounts')
	},

	'jobCount': function(){
		return Counts.get('jobCounts')
	}
});
