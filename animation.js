gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true,
});

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

var tl = gsap.timeline();
gsap.set(".big--text p", { y: 0, opacity: 1 });

function slowlyShowDown(element) {
  let anim = gsap.from(element, {
    ease: "power3.out",
    opacity: 0,
    duration: 1.5,
    y: () => -innerHeight,
  });

  return anim;
}

function showUp(element) {
  let anim = gsap.from(element, {
    ease: "expo.out",
    duration: 1.5,
    y: () => element.offsetHeight,
  });
  return anim;
}

function slowlyShowUp(element) {
  let anim = gsap.from(element, {
    ease: "power3.out",
    opacity: 0,
    duration: 2,
    y: () => element.offsetHeight,
  });
  return anim;
}

function imageWipeDown(element) {
  let anim = gsap.from(element, {
    duration: 1.5,
    clipPath: "inset(0 0 100% 0)",
  });
  return anim;
}

function imageWideSideWay(element) {
  let anim = gsap.from(element, {
    duration: 1.5,
    clipPath: "inset(0 100% 0 0)",
  });
  return anim;
}

function fadeIn(element) {
  let anim = gsap.from(element, { duration: 1.5, opacity: 0 });
  return anim;
}

function scaleDown(element) {
  let anim = gsap.from(element, { duration: 1.3, scale: 1.3 });
  return anim;
}

tl.add(slowlyShowDown(document.querySelector(".nav--container")), 0);
tl.add(showUp(document.querySelector(".big--text p")), 1);
tl.add(imageWipeDown(document.querySelector(".image--cover")), 1);
tl.add(fadeIn(document.querySelector(".social--icons")), 1.3);
tl.add(slowlyShowUp(document.querySelector(".small--text")), 1.5);
tl.add(slowlyShowUp(document.querySelector(".mini--nav")), 1.6);

var productArray = gsap.utils.toArray(".product--section");
productArray.forEach((product) => {
  let anim = gsap.timeline({
    scrollTrigger: {
      scroller: ".smooth-scroll",
      trigger: product,
      start: "top top",
    },
  });
  // anim.add(slowlyShowDown(product), 0);
  anim.add(imageWipeDown(product.querySelectorAll(".product--image")), 0);
  anim.add(
    imageWideSideWay(
      product.querySelectorAll(".secondary--product--image .image")
    ),
    0
  );
  anim.add(scaleDown(product.querySelectorAll(".product--section img")[0]), 0);
  anim.add(scaleDown(product.querySelectorAll(".product--section img")[1]), 0);
  // anim.add(slowlyShowUp(product.querySelectorAll(".sale")), 0);
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
