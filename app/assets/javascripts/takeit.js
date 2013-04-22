//---------------
// Controllers
//---------------

//CalCtrl controller deals with the calendar dates
angular.module('takeIt.controllers', []).
	controller('CalCtrl', function ($scope, $http) {
		$http.get('/cal_data.json').success(function(data) {
			days = $scope.days = data.calendar_days;
			shifts = $scope.shifts = data.shifts;
		});

		postShiftData = $scope.postShiftData = {
			"start_date": null,
			"end_date": null
		};

		$scope.shiftsExtract = function(date) {
			return shifts[date];
		};

		$scope.dateExtract = function(date) {
			//.date() actually resolves to the day of the month as a number
			return moment(date).date();
		};

		$scope.buttonColorer = function(shift) {
			switch (shiftTriage(shift)) {
				case "warn":
					return "btn-warning";
				case "upcoming":
					return "btn-success";
				case "taken":
					return "btn-primary";
			}
			return "";
		};

		$scope.getPopoverTitle = function(shift) {
			switch (shiftTriage(shift)) {
				case "warn":
					return "Take this shift?";
				case "upcoming":
					return "Take this shift?";
				case "taken":
					return "Shift taken!";
				case "passed":
					return "Shift never taken";
			}
			return "Unknown status";
		};

		function shiftTriage(shift) {
			if (shift.taker === null && (moment(shift.start_date).diff(moment(), 'hours') <= 24 && moment(shift.start_date).diff(moment(), 'hours') >= 0)) {
				return "warn";
			} else if (shift.taker === null && moment(shift.start_date).diff(moment(), 'hours') > 24) {
				return "upcoming";
			} else if (shift.taker !== null) {
				return "taken";
			} else if (moment(shift.end_date).diff(moment(), 'hours') < 0) {
				return "passed";
			}
			return "unknown";
		}

		$scope.addShift = function() {
			var shiftDate = moment(postShiftData.start_date).format("YYYY-MM-DD");
			if (typeof shifts[shiftDate] == "undefined") {
				shifts[shiftDate] = [];
			}
			shifts[shiftDate].push({
				"start_date": postShiftData.start_date,
				"end_date": postShiftData.end_date,
				"date_taken": null,
				"poster": "Owen sdjfhskjd",
				"taker": null
			});
			postShiftData.start_date = null;
			postShiftData.end_date = null;
		};
	});

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
			return extractedDates;
		};
	});

//---------------
// Directives
//---------------
takeIt.directive('popoverHandler', function(){
	var linker = function(scope, element, attrs) {
		element.click(function(e) {
			e.preventDefault();
		});

		$("html").click(function() {
			scope.dismiss();
			$(".time-picker").timepicker('hide');
		});

		element.click(function(event) {
			event.stopPropagation();
		});

		$("html").on("click", ".popover, .ui-timepicker-list", function(event) {
			event.stopPropagation();
		});
	};

	return {
		restrict: 'C',
		link: linker
	};
});

takeIt.directive('popoverDirection', function() {
	var linker = function(scope, element, attrs) {
		var position = element.position();

		if ($(window).width()-position.left < 400) {
			attrs.$set("data-placement", "left");
		} else {
			attrs.$set("data-placement", "right");
		}
	};

	return {
		restrict: 'C',
		link: linker
	};
});

takeIt.directive('shiftStartTimePicker', function() {
	var linker = function(scope, element, attrs, ngModelCtrl) {
		//Initialize the timepicker
		element.timepicker({ 'scrollDefaultNow': true });

		element.change(function() {
			var futureTime = moment(scope.day + $(this).val(), 'YYYY-MM-DDh:mma').add('hours', 2).toDate();
			$('#end-time').timepicker('setTime', futureTime);
			$('#end-time').timepicker('option', { 'durationTime': $(this).timepicker('getTime'), 'showDuration': true });
			ngModelCtrl.$setViewValue(moment(scope.day + $(this).val(), 'YYYY-MM-DDh:mma').format());
			// It's possible the end time was set in addition to the start time
			//ngModelCtrl.$setViewValue(moment($('#end-time').timepicker('getTime')).format('h:mma'));
			scope.$apply();
		});
	};

	return {
		require : 'ngModel',
		restrict: 'C',
		link: linker
	};
});

takeIt.directive('shiftEndTimePicker', function() {
	var linker = function(scope, element, attrs, ngModelCtrl) {
		//Initialize the timepicker
		element.timepicker();

		element.change(function() {
			ngModelCtrl.$setViewValue(moment(scope.day + $(this).val(), 'YYYY-MM-DDh:mma').format());
			scope.$apply();
		});

		$('#start-time').change(function() {
			ngModelCtrl.$setViewValue(moment(scope.day + element.val(), 'YYYY-MM-DDh:mma').format());
			scope.$apply();
		});
	};

	return {
		require : 'ngModel',
		restrict: 'C',
		link: linker
	};
});

//---------------
// Services
//---------------

//Right now, we're only dealing with the mock json content
