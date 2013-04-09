//Set up the popover handler
$(function (){
	$("a[data-toggle=popover]").popover({
		html: true,
		placement: "right",
		trigger: "manual",
		container: "body"})
	//This prevents the browser from scrolling to the top on an empty anchor (#)
	.click(function(e) {
		e.preventDefault();
	});
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
/*
This handles the situation where if the mouse leaves the popover button
and reenters, the popover will persist
Attached as a listener on the body because you can't bind to an
element until it's created
*/
$("body").on("mouseenter", ".popover.fade.right.in", function() {
	clearTimeout($("a[data-toggle=popover]").data('timeoutId'));
});