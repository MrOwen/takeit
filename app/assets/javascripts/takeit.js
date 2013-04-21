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

		$scope.shiftsExtract = function(date) {
			return shifts[date];
		};

		$scope.dateExtract = function(date) {
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
			return extractedDates;
		};
	});

//---------------
// Directives
//---------------
angular.module('takeIt.directives', ['takeIt.directives.directionSetter']).
	directive('popoverHandler', function(){
		var linker = function(scope, element, attrs) {
			element.click(function(e) {
				e.preventDefault();
			})
			.mouseout(function() {
				$(".popover.ng-scope.fade").hover(function() {
					clearTimeout(element.data('timeoutId'));
				}, function() {
					$('ul.ui-timepicker-list:visible').hover(function() {
						clearTimeout(element.data('timeoutId'));
					}, function() {
						var timeoutId = setTimeout(function() {
						scope.dismiss();
						}, 2000);
						element.data('timeoutId', timeoutId);
					});
					var timeoutId = setTimeout(function() {
						scope.dismiss();
					}, 750);
					element.data('timeoutId', timeoutId);
				});
			});
		};

		return {
			restrict: 'C',
			link: linker
		};
	});

angular.module('takeIt.directives.directionSetter', []).
	directive('popoverDirection', function() {
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

//---------------
// Services
//---------------

//Right now, we're only dealing with the mock json content
