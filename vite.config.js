import { defineConfig } from "vite";

// Exports Vite configuration
export default defineConfig({
    // Ensures relatuve path for assets
    base: "./",
    build: {
        // Uses Terser to minify the code, reducing file size and improving performance
        minify: "terser",
    },
});