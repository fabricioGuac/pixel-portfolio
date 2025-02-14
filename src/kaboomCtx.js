import kaboom from "kaboom";

// Initializes and exports the kaboom instance
export const k = kaboom({
    // Prevents kaboom from automatically adding everything to the global scope
    global: false,
    // Converts touch events to mouse events
    touchToMouse: true,
    // Binds kaboom to the canvas elemet
    canvas: document.getElementById("game"),
})