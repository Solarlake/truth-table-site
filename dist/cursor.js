const cursor = document.querySelector(".cursor-base");
const cursorFill = document.querySelector(".cursor-fill");

let targetX;
let targetY;
const defaultCursorRadius = 10;

document.addEventListener("mousemove", (e) => {
    targetX = e.clientX - defaultCursorRadius / 2;
    targetY = e.clientY - defaultCursorRadius / 2;
});

document.addEventListener("mouseenter", (e) => {
    cursorFill.classList.remove("cursor-hide");
    let x = e.clientX - defaultCursorRadius / 2;
    let y = e.clientY - defaultCursorRadius / 2;
    cursor.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
});

document.addEventListener("mouseleave", (e) => {
    cursorFill.classList.add("cursor-hide");
});

let animateCursor = () => {
    request = requestAnimationFrame(animateCursor);
    let style = window.getComputedStyle(cursor);
    let matrix = new WebKitCSSMatrix(style.transform);
    let currentX = matrix.m41
    let currentY = matrix.m42

    currentX += 0.14 * (targetX - currentX);
    currentY += 0.14 * (targetY - currentY);

    cursor.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";
}