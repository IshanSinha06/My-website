const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var time_line = gsap.timeline();

    time_line.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })

    .to('.boundingElem', {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })

    .from('#herofooter', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1.2,
        ease: Expo.easeInOut,
    });
}

var timeout;

function circleFlat() {
    //Define scale value
    var xscale = 1;
    var yscale = 1;

    var xprevious = 0;
    var yprevious = 0;
    window.addEventListener("mousemove", function(details) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, details.clientX - xprevious);
        yscale = gsap.utils.clamp(.8, 1.2, details.clientY - yprevious);

        xprevious = details.clientX;
        yprevious = details.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = settimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    });
}


function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(details){
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleFlat();
circleMouseFollower();
firstPageAnim();

/*
- Select all 3 element, and then apply "mousemove" property on them. When the mouse moves figure out where the mouse is at that point.
- Replace the x, y position of the mouse with the image and then moce the image.
- While moving rotate the image and increase its rotation according to the speed of the mouse movement.
*/

document.querySelectorAll(".element").forEach(function (element) {
    var rotate = 0;
    var diffrot = 0;
  
    element.addEventListener("mouseleave", function (dets) {
      gsap.to(element.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    element.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - element.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(element.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });

//To get the real-time into the footer.
`use strict`
var datetime = new Date().toLocaleTimeString();
  document.getElementById("time").textContent = datetime + " (IST)";
