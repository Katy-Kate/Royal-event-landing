

$(document).ready()
{


   //-----mobilemenu-----
    $('.mobile-nav-button').on('click', function() {
        $( ".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)" ).toggleClass( "mobile-nav-button__line--1");
        $( ".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)" ).toggleClass( "mobile-nav-button__line--2");
        $( ".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)" ).toggleClass( "mobile-nav-button__line--3");
        $('.mobile-menu').toggleClass('mobile-menu--open');
        return false;
    });
    //------Slider -------
    $(window).load(function () {
        $('.flexslider').flexslider({
            animation: "slide"
        });
    });
    $('.carousel').slick( );

     //----gallery -  START------------

    function openModal() {
        document.getElementById('myModal').style.display = "block";
    }

    function closeModal() {
        document.getElementById('myModal').style.display = "none";
    }

    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        // captionText.innerHTML = dots[slideIndex-1].alt;
    }


    //----gallery -  AND------------
    $("body").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('html').animate({scrollTop: top}, 1500);
    });
};