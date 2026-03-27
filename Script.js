window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

const circle = document.querySelector("#minicircle");

let x = 0, y = 0;
let targetX = 0, targetY = 0;

window.addEventListener("mousemove", (e) => {
    // 👉 distance (offset add kiya)
    targetX = e.clientX ;  // right side gap
    targetY = e.clientY ;  // bottom gap
});

function animate() {
    // 👉 slow movement (lag effect)
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;

    circle.style.left = x + "px";
    circle.style.top = y + "px";

    requestAnimationFrame(animate);
}

animate();

const elems = document.querySelectorAll(".elem");

elems.forEach((elem) => {
    const img = elem.querySelector("img");

    let x = 0, y = 0;
    let targetX = 0, targetY = 0;
    let prevX = 0;

    elem.addEventListener("mousemove", (e) => {
        const rect = elem.getBoundingClientRect();

        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        // 🔥 velocity-based tilt
        let deltaX = e.clientX - prevX;
        prevX = e.clientX;

        let rotate = deltaX * 0.5;

        img.style.transform = `
            translate(-50%, -50%)
            rotate(${rotate}deg)
        `;
    });

    function animate() {
        // 🔥 smooth follow (FIXED)
        x += (targetX - x) * 0.15;
        y += (targetY - y) * 0.15;

        img.style.left = x + "px";
        img.style.top = y + "px";

        requestAnimationFrame(animate);
    }

    animate();

    elem.addEventListener("mouseenter", () => {
        img.style.opacity = 1;
    });

    elem.addEventListener("mouseleave", () => {
        img.style.opacity = 0;

        // 🔄 reset tilt
        img.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });
});