/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function () {

        // Tooltip init
        tooltipInit();

        // Init the posts
        postInit();

        // Waypoints
        waypointsInit();

    });

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysSpan = clock.querySelector('.days');
      var hoursSpan = clock.querySelector('.hours');
      var minutesSpan = clock.querySelector('.minutes');
      var secondsSpan = clock.querySelector('.seconds');

      function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date("November 12, 2017 04:30:00");;
    initializeClock('clockdiv', deadline);
    // Init waypoints for header and footer animations
    function waypointsInit() {

        var headerWaypoint = new Waypoint({
            element: document.getElementById('masthead'),
            handler: function (direction) {
                if (direction === 'down')
                    this.element.classList.remove('animation-on');
                else
                    this.element.classList.add('animation-on');
            },
            offset: -5
        });

        var footerWaypoint = new Waypoint({
            element: document.getElementById('footer'),
            handler: function (direction) {
                this.element.classList.toggle('animation-on');
            },
            offset: 'bottom-in-view'
        });

    }

    // Init bootstrap tooltip
    function tooltipInit() {
        $('[data-toggle]').tooltip();
    }

    function postInit() {
        // Set lead paragraphs
        $('.post-body p:first-child').addClass('lead');

        // Set feature image
        var featured = $('.featured-image').find('img').attr('src');
        if (featured) {
            $('#masthead').css('backgroundImage', 'url(' + featured + ')');
            $('#footer').css('backgroundImage', 'url(' + featured + ')');
        };
    }

} (jQuery));
