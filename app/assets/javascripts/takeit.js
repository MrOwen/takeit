//---------------
// Controllers
//---------------

//CalCtrl controller deals with the calendar dates
takeIt.controller('CalCtrl', function CalCtrl($scope) {
	var days = $scope.days = jQuery.parseJSON($.ajax("/cal_data", {
		dataType: "json",
		async: false
	}).responseText).calendar_days;

	var shifts = $scope.shifts = jQuery.parseJSON($.ajax("/cal_data", {
		dataType: "json",
		async: false
	}).responseText).shifts;

	$scope.shiftsExtract = function(date) {
		return shifts[date];
	};

	$scope.dateExtract = function(date) {
		return moment(date).date();
	};

	$scope.buttonColorer = function(shift) {
		// console.log(moment(shift.start_date).subtract('days', 1).hour());
		// if (shift.taker === null && moment().from(moment(shift.start_date).subtract('days', 1)).hour() < 24) {
		// 	// console.log("The shift date is: " + moment(shift.start_date).format() + " and +1 day from that is: " + moment(shift.start_date).add('days', 1).format());
		// 	// console.log("The shift taker is: " + shift.taker);
		// 	return "btn-primary";
		// } else if (shift.taker === null) {
		// 	return "btn-warning";
		// } else {
		// 	return "btn-success";
		// }
		return "btn-primary";
	};
});

// //ShiftCtrl deals with shift data
// takeIt.Controller('ShiftCtrl', function ShiftCtrl($scope) {

// });

//---------------
// Filters
//---------------

//Wraps moment.js functions that TakeIt needs
angular.module('takeIt.filters', []).
	filter('dateExtract', function() {
		return function(dates) {
			var extractedDates = [];
			angular.forEach(dates, function(date) {
				extractedDates.push(moment(date, "YYYY-MM-DD").date());
			}, extractedDates);
			console.log(extractedDates);
			return extractedDates;
		};
	});

//---------------
// Directives
//---------------


//---------------
// Services
//---------------

//Right now, we're only dealing with the mock json content
