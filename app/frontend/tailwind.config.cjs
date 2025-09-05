/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
};