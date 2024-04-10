function setupLocoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}
setupLocoScroll();

function wordAnimation(selector) {
  const content = document.querySelector(selector);
  content.innerHTML = content.textContent
    .trim()
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  gsap.to(`${selector}>span`, {
    scrollTrigger: {
      trigger: `${selector}>span`,
      start: "top bottom",
      end: "bottom top",
      scroller: "#main",
      scrub: 0.5,
    },
    stagger: 0.01,
    color: "#fff",
  });
}
wordAnimation(".content");
wordAnimation(".content2");

// video animation is done here
function setupCanvasAnimation() {
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    // Provide correct file paths here
    return `./priority1/priority1_${("00" + (index + 1)).slice(-3)}.jpg`;
  }

  const frameCount = 86;
  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "#page3",
      start: "top top",
      end: "250% top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    trigger: "#page3",
    pin: true,
    start: "top top",
    end: "250% top",
    scroller: "#main",
  });
}
setupCanvasAnimation();

// page 4 word animation starts here
function wordAnimation1() {
  var clutter = " ";

  document
    .querySelector("#page4>div>p")
    .textContent.split("")
    .forEach(function (dets) {
      clutter += `<span>${dets}</span>`;

      document.querySelector("#page4>div>p").innerHTML = clutter;
    });

  gsap.to("#page4>div>p>span", {
    scrollTrigger: {
      trigger: "#page4>div>p>span",
      start: "top bottom",
      end: "bottom top",
      scroller: "#main",
      scrub: 1,
      // markers:true,
    },
    stagger: 0.1,
    color: "#fff",
  });
}
wordAnimation1();

