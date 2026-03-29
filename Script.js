// 🔥 Page load animation
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// 🔥 Cursor circle
const circle = document.querySelector("#minicircle");

let cx = 0, cy = 0;
let targetCX = 0, targetCY = 0;

window.addEventListener("mousemove", (e) => {
    targetCX = e.clientX;
    targetCY = e.clientY;
});

function animateCircle() {
    cx += (targetCX - cx) * 0.08;
    cy += (targetCY - cy) * 0.08;

    circle.style.left = cx + "px";
    circle.style.top = cy + "px";

    requestAnimationFrame(animateCircle);
}
animateCircle();

// 🔥 Image hover effect
const elems = document.querySelectorAll(".elem");

elems.forEach((elem) => {
    const img = elem.querySelector("img");

    let x = 0, y = 0;
    let targetX = 0, targetY = 0;
    let prevX = 0;

    // 👉 Mouse move inside element
    elem.addEventListener("mousemove", (e) => {
        const rect = elem.getBoundingClientRect();

        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        // 🔥 velocity tilt
        let deltaX = e.clientX - prevX;
        prevX = e.clientX;

        let rotate = deltaX * 0.5;

        img.style.transform = `
            translate(-50%, -50%)
            rotate(${rotate}deg)
        `;
    });

    // 🔥 IMPORTANT FIX (no left flash)
    elem.addEventListener("mouseenter", (e) => {
        const rect = elem.getBoundingClientRect();

        x = targetX = e.clientX - rect.left;
        y = targetY = e.clientY - rect.top;

        img.style.left = x + "px";
        img.style.top = y + "px";

        img.style.opacity = 1;
    });

    // 🔥 Smooth follow animation
    function animateImage() {
        x += (targetX - x) * 0.15;
        y += (targetY - y) * 0.15;

        img.style.left = x + "px";
        img.style.top = y + "px";

        requestAnimationFrame(animateImage);
    }

    animateImage();

    // 👉 Mouse leave
    elem.addEventListener("mouseleave", () => {
        img.style.opacity = 0;

        // reset tilt
        img.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });
});