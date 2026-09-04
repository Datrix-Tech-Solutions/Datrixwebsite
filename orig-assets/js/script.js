// Select all links with hashes
$(".smoothScroll").click(function (event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        1000,
        function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});

$(document).ready(function () {
  $(".testimonial-slider").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".industies-slider").slick({
    slidesToShow: 7,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  $(".clients-list").slick({
    centerMode: true,
    slidesToShow: 7,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  $('.sidebar-navbar a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash;
    $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        900,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  /* Validation for Enquiry Form */
  var $form = $(this);
  $("#requestForm").validate({
    debug: true,
    ignore: ".ignore",
    rules: {
      sub_fn: {
        required: true,
        minlength: 2,
        maxlength: 25,
      },
      sub_phone: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10,
      },
      sub_email: {
        required: true,
        email: true,
      },
    },
    messages: {
      sub_fn: {
        required: "Please enter your name",
        maxlength: "Please enter only 25 characters.",
      },
      sub_phone: {
        required: "Please enter mobile no. ",
        number: "Please enter valid mobile no. ",
        maxlength: "Please enter only 10 digits.",
      },
      sub_company: {
        required: "Please enter your Company",
      },
      sub_email: {
        required: "Please enter your email address",
        email: "Please enter your valid email address",
      },
    },
    submitHandler: function (form) {
      var str = $("#requestForm").serialize();
      $.ajax({
        url: "contactMail.php",
        type: "POST",
        data: str,
        success: function (response) {
          $(".form-control").val("");
          if (response.status == "Success") {
            // $('.contact-btn').addClass('success').val('Messgage Sent');
          } else {
            // $('.contact-btn').addClass('failure').val('Messgage Not Sent');
          }
          $(".sub_response").show();
        },
        failure: function (response) {
          $(".sub_response")
            .html("Your Form Could not be sumitted")
            .addClass("active");
        },
      });
      $form.submit();
    },
  });

  $("#contactForm").validate({
    debug: true,
    ignore: ".ignore",
    rules: {
      first_name: {
        required: true,
        minlength: 2,
        maxlength: 25,
      },
      mobile: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      first_name: {
        required: "Please enter your name",
        maxlength: "Please enter only 25 characters.",
      },
      mobile: {
        required: "Please enter mobile no. ",
        number: "Please enter valid mobile no. ",
        maxlength: "Please enter only 10 digits.",
      },
      query: {
        required: "Please enter your Query",
      },
      email: {
        required: "Please enter your email address",
        email: "Please enter your valid email address",
      },
    },
    submitHandler: function (form) {
      var str = $("#contactForm").serialize();
      $.ajax({
        url: "contactMail.php",
        type: "POST",
        data: str,
        success: function (response) {
          $(".form-control").val("");
          if (response.status == "Success") {
            // $('.contact-btn').addClass('success').val('Messgage Sent');
          } else {
            // $('.contact-btn').addClass('failure').val('Messgage Not Sent');
          }
          $("#contactSuccess").html(response.msg).show();
        },
        failure: function (response) {
          $(".sub_response")
            .html("Your Form Could not be sumitted")
            .addClass("active");
        },
      });
      $form.submit();
    },
  });
});

/**
 * SVG path for target icon
 */
var targetSVG =
  "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

/**
 * SVG path for plane icon
 */
var planeSVG =
  "M53.3,134.6c-15.2-0.1-27.6,12.2-27.7,27.4c-0.1,15.2,12.2,27.6,27.4,27.7c15.2,0.1,27.6-12.2,27.7-27.4 c0-0.1,0-0.2,0-0.3C80.6,146.9,68.4,134.7,53.3,134.6 M146.5,134.6c-15.2,0-27.6,12.3-27.6,27.6c0,15.2,12.3,27.6,27.6,27.6 c15.2,0,27.6-12.3,27.6-27.6c0,0,0-0.1,0-0.1c0.1-15.2-12.2-27.7-27.4-27.8c-0.1,0-0.2,0-0.3,0L146.5,134.6z M15.1,59.9h170.3 l-12.3-21.3h-20.3l-4.2-15.9h-24.4L93.9,10.2L81.7,31.3l-18-10.4L51.4,42.2H25.6L15.1,59.9z M9.3,78.7l17.6,60.3 c2.1-2.7,4.7-5,7.5-6.8c14-8.7,32.1-6.7,43.9,4.9c8,8,11.7,19.3,9.9,30.4H112c-3.1-19.1,9.9-37.1,29.1-40.2 c12-1.9,24.1,2.5,32.1,11.6l17.6-60.3h5.8V67.6H3.5v11.2L9.3,78.7z";
/**
 * Create the map
 */

var balloonText =
  '<p style="font-size: 120%; font-weight: bold; margin-bottom: 15px;">[[category]]</p>\
  <table>\
    <tr><th>Region</th><th>Sales</th></tr>\
    <tr><td>Europe</td><td>[[europe]]</td></tr>\
    <tr><td>North America</td><td>[[namerica]]</td></tr>\
    <tr><td>Latin America</td><td>[[lamerica]]</td></tr>\
    <tr><td>Asia</td><td>[[asia]]</td></tr>\
    <tr><td>Middle East</td><td>[[meast]]</td></tr>\
    <tr><td>Africa</td><td>[[africa]]</td></tr>\
  </table>';

var map = AmCharts.makeChart("chartdiv", {
  type: "map",
  theme: "black",
  dataProvider: {
    map: "worldLow",
    images: [
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Ghana</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: 7.8984774,
        longitude: -3.2749691,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Nigeria</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: 9.0065062,
        longitude: 4.1795106,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Kenya</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: 0.1540843,
        longitude: 33.4099521,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Sierra Leone</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: 8.420697,
        longitude: -12.9588643,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Liberia</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: 6.4059651,
        longitude: -11.6970099,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Rwanda</h3><p>africa@facturasoftwares.com</p></div>",
        latitude: -1.9435638,
        longitude: 29.3199475,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>UAE</h3><p>uae@facturasoftwares.com</p></div>",
        latitude: 23.7680866,
        longitude: 53.979308,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Baharain</h3><p>baharain@facturasoftwares.com</p></div>",
        latitude: 26.0865374,
        longitude: 50.5227181,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>Bangladesh</h3><p>bangladesh@facturasoftwares.com</p></div>",
        latitude: 23.7286471,
        longitude: 90.1296852,
      },
      {
        svgPath: targetSVG,
        title:
          "<div class='customeMapToltip'><h3>INDIA</h3><p>india@facturasoftwares.com</p></div>",
        latitude: 21.493825,
        longitude: 78.1573341,
      },
    ],
  },

  areasSettings: {
    unlistedAreasColor: "#00A8B4",
    outlineColor: "#00A8B4",
    outlineThickness: "0",
  },

  imagesSettings: {
    color: "#585869",
    rollOverColor: "#00A8B4",
    selectedColor: "#ffffff",
    pauseDuration: 2,
    animationDuration: 3,
    adjustAnimationSpeed: false,
  },
  balloon: {
    adjustBorderColor: true,
    borderThickness: 1,
    borderColor: "#ffffff",
    disableMouseEvents: false,
    color: "#ffffff",
    cornerRadius: 2,
    fillAlpha: 1,
    fillColor: "#134377",
  },
});
