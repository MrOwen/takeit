//---------------
// Controllers
//---------------

//CalCtrl controller deals with the calendar dates
angular.module('takeIt.controllers', []).
	controller('CalCtrl', function ($scope, $http) {
		$http.get('/cal_data.json').success(function(data) {
			days = $scope.days = data.calendar_days;
			shifts = $scope.shifts = data.shifts;
			console.log(shifts);
		});

		$scope.shiftsExtract = function(date) {
			return shifts[date];
		};

		$scope.dateExtract = function(date) {
			return moment(date).date();
		};

		$scope.buttonColorer = function(shift) {
			console.log(moment(shift.start_date).subtract('days', 1).hour());
			if (shift.taker === null && moment().from(moment(shift.start_date).subtract('days', 1)).hour() < 24) {
				// console.log("The shift date is: " + moment(shift.start_date).format() + " and +1 day from that is: " + moment(shift.start_date).add('days', 1).format());
				// console.log("The shift taker is: " + shift.taker);
				return "btn-primary";
			} else if (shift.taker === null) {
				return "btn-warning";
			} else {
				return "btn-success";
			}
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
			return extractedDates;
		};
	});

//---------------
// Directives
//---------------
angular.module('takeIt.directives', []).
	directive('popoverHandler', function(){
		var linker = function(scope, element, attrs) {
			console.log("The linker was called");

			$("a[data-toggle=popover]").popover({
				html: true,
				placement: "right",
				trigger: "manual",
				container: "body"})
			//This prevents the browser from scrolling to the top on an empty anchor (#)
			.click(function(e) {
				e.preventDefault();
			});

			$("a[data-toggle=popover]").click(function() {
				var popoverButton = $(this);
				$(this).data('isActive', true);

				//Don't re-show the popover animation if it's already visible
				if(!$(".popover.fade.right.in").is(":visible")) {
					popoverButton.popover('show');
				}
				clearTimeout(popoverButton.data('timeoutId'));
			}).mouseout(function() {
				var popoverButton = $(this);
				//A timer used to hide the popover after some time
				//Attached to the button as a function (.data())
				var timeoutId = setTimeout(function() {
					popoverButton.popover('hide');
				}, 750);
				//Start the timer to hide the popover because the mouse left the popover element
				popoverButton.data('timeoutId', timeoutId);
				$(".popover.fade.right.in").hover(function() {
					clearTimeout(popoverButton.data('timeoutId'));
				}, function() {
					//For whatever reason, timeoutId needs to be redefined in this scope
					var timeoutId = setTimeout(function() {
						popoverButton.popover('hide');
					}, 750);
					popoverButton.data('timeoutId', timeoutId);
				});
			});

			$("body").on("mouseenter", ".popover.fade.right.in", function() {
				clearTimeout($("a[data-toggle=popover]").data('timeoutId'));
			});
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
