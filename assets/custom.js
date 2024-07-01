/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */


jQuery("#featuredcarousel").owlCarousel({
    autoplay: false,
    loop: true,
    /* use rewind if you don't want loop */
    margin: 31,
    /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    autoplayTimeout: 5000,
    smartSpeed: 800,
    stagePadding:50,
    nav: false,
   dotsEach: 4,
    responsive: {
        0: {
          dotsEach: 3,
            items: 1
        },

        600: {
          
            items: 2
        },
            700: {
            items: 3
        },

        1024: {
            items: 4
        },

        1366: {
         
            items: 5
           
        },
       1467: {
           stagePadding:100,
            items: 5
        }
    }
});


$(document).ready(function() {
    function checkProductItems() {
        $('.product-item').each(function() {
            if ($(this).find('.product-item-meta__swatch-list').length > 0) {
                $(this).addClass('hasElement');
            } else {
                $(this).addClass('notHasElement');
            }
        });
    }

    // Execute on page load
    checkProductItems();

    // Execute on .tabs-nav__item click
    $('.tabs-nav__item').on('click', function() {
        checkProductItems();
    });
});

//   Featured Tabbing
// Show the first tab by default
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

// Change tab class and dis<p>lay content
$('.tabs-nav a').on('mouseover', function (event) {
    event.preventDefault();
    $('.tabs-nav li').removeClass('tab-active');
    $(this).parent().addClass('tab-active');
    $('.tabs-stage div').hide();
    $($(this).attr('href')).show();
});

// ,,,,,


document.addEventListener('DOMContentLoaded', function() {
    // Select all tab links
    const tabLinks = document.querySelectorAll('.tabs-nav a');

    // Add click event listener to each tab link
    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Remove 'tab-active' class from all tab items
            document.querySelectorAll('.tabs-nav li').forEach(item => {
                item.classList.remove('tab-active');
            }); 

            // Add 'tab-active' class to the clicked tab item
            this.parentElement.classList.add('tab-active');

            // Hide all tab content items
            document.querySelectorAll('.tabs-stage > div').forEach(tabContent => {
                tabContent.style.display = 'none';
            });

            // Display the corresponding tab content
            const tabId = this.getAttribute('href').substring(1);
            document.getElementById(tabId).style.display = 'block';
        });
    });
});


// Shop Product Tabbing

const tabButtons = document.querySelectorAll('.tab-btn')

tabButtons.forEach((tab) => {
    tab.addEventListener('click', () => tabClicked(tab))
})

function tabClicked(tab) {

    tabButtons.forEach(tab => {
        tab.classList.remove('active')
    })
    tab.classList.add('active')

    const contents = document.querySelectorAll('.content')


    contents.forEach((content) => {
        content.classList.remove('show')
    })

    const contentId = tab.getAttribute('content-id')
    const contentSelected = document.getElementById(contentId)

    contentSelected.classList.add('show')
    //console.log(contentId)
}

// Happy Customer Slider

jQuery(document).ready(function() {
    var owl = jQuery("#customercarousel");
    var currentSlide = jQuery("#current-slide");
    var totalSlides = jQuery("#total-slides");

    owl.owlCarousel({
        autoplay: false,
        rewind: false, // use rewind if you don't want loop
        responsiveClass: true,
        // autoHeight: true,
        // autoplayTimeout: 7000,
        // smartSpeed: 800,
        nav: true,
        navText: [
            '<span class="slickPrev slide-arrow prev-arrow"><img src="https://cdn.shopify.com/s/files/1/0576/3999/3526/files/left-arrow.svg" alt="arrow"></span>',
            '<span class="slickNext slide-arrow next-arrow"><img src="https://cdn.shopify.com/s/files/1/0576/3999/3526/files/right-arrow.svg" alt="arrow"></span>'
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1024: {
                items: 1
            },
            1366: {
                items: 1
            }
        },
        onInitialized: updateCounter,
        onTranslated: updateCounter
    });

    function updateCounter(event) {
        // Total items
        var itemCount = event.item.count;
        totalSlides.text(itemCount);

        // Current item index (note: event.item.index starts from 0)
        var currentIndex = event.item.index + 1;
        currentSlide.text(currentIndex);
    }
});




//   About us slider

$('.meet-team-prnt').owlCarousel({
    loop: true,
    margin: 32,
    responsiveClass: true,
    navigation: false,
    center: true,
    nav: false,
    autoplay: true,
    responsive: {
        0: {
            items: 1,
            nav: false,
        },
        600: {
            items: 3,
            nav: false,
            margin: 20,
        },
        1000: {
            items: 3.5,
            nav: false,
            loop: true,
            margin: 20,
        },
        1200: {
            items: 4,
            nav: false,
            loop: true,
        },
        1440: {
            items: 4.45,
            nav: false,
            loop: true,
        }

    }
})

// Contact Page Phone number

document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('number');

    numberInput.addEventListener('input', () => {
        // Remove any non-numeric characters
        numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
    });
});


// Hamburger

$(document).ready(function () {

    $('.first-button').on('click', function () {

        $('.animated-icon1').toggleClass('open');
    });
    $('.second-button').on('click', function () {

        $('.animated-icon2').toggleClass('open');
    });
    $('.third-button').on('click', function () {

        $('.animated-icon3').toggleClass('open');
    });
});
$(document).ready(function () {
    $(".hamburger").click(function () {
        $(this).toggleClass("is-active");
        $('.menusflex').toggleClass('active');
    });
});
// body Fix

$(document).ready(function () {
    $(".hamburger").click(function () {
        $("body").toggleClass("body-fix");
    });
});


// Shop detail Thumbnail slider

$(document).ready(function () {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: false,
        dots: true,
        loop: true,
        responsiveRefreshRate: 200,
        navText: [
            '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
            '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'
        ],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 1, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});

