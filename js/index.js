document.addEventListener("DOMContentLoaded", function() {
    class Renderer {
        openVh(id, height, width) {
            const view = document.querySelector(id);
            if (view) {
                view.style.transition = "0.3s";
                view.style.height = height;
                view.style.width = width;
                return id;
            }
            return null;
        }

        closeVh(id) {
            const view = document.querySelector(id);
            if (view) {
                view.style.transition = "0.6s";
                view.style.height = "60px";
                view.style.width = "65px";
                console.log(view);
            }
        }
    }

    class EventManager {
        click(element, callback) {
            element.addEventListener("click", callback);
        }
    }

    class VisibilityManager {
        enable(elements) {
            elements.forEach(element => {
                document.querySelector(element).style.display = "flex";
            });
        }

        disable(elements) {
            elements.forEach(element => {
                document.querySelector(element).style.display = "none";
            });
        }
    }

    class App {
        constructor() {
            const visibilityManager = new VisibilityManager();
            const eventManager = new EventManager();
            const renderer = new Renderer();
            const startButton = document.getElementById("start");
            const menuButton = document.getElementById("_start");
            const confView = document.getElementById("conf");
            const createCountryButton = document.getElementById("ctry");

            eventManager.click(startButton, () => {
                renderer.openVh("#home", "40vh", "60px");
                const on = ["#ctry", "#conf", "#sendmsg"];
                const off = ["#start"];
                visibilityManager.disable(off);
                visibilityManager.enable(on);
            });

            eventManager.click(createCountryButton, () => {
                const off = [".infos", ".notifications", ".cardButtons",".conf", "#ctry", "#conf", "#sendmsg"];
                const on = ["#_start", ".ctry"];
                renderer.openVh("#home", "60px", "65px");
                visibilityManager.enable(on);
                visibilityManager.disable(off);
            });

            eventManager.click(menuButton, () => {
                renderer.openVh("#home", "40vh", "65px");
                const on = [".ctry", "#ctry", "#conf", "#sendmsg"];
                const off = ["#_start"];
                visibilityManager.disable(off);
                visibilityManager.enable(on);
            });

            eventManager.click(confView ,()=>{
                const off = [".infos", ".notifications", ".cardButtons",".ctry","#ctry", "#conf", "#sendmsg"];
                const on = ["#start",".conf"]
                renderer.openVh("#home", "60px", "65px");
                visibilityManager.disable(off);
                visibilityManager.enable(on);
            })
        }
    }

    const hexInput = document.getElementById('hex-input');
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const colorPreview = document.getElementById('color-preview');

    function updateColor() {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);
        const hexValue = rgbToHex(red, green, blue);
        colorPreview.style.backgroundColor = hexValue;
        hexInput.value = hexValue;
    }

    function componentToHex(c) {
        const hex = c.toString(16).toUpperCase();
        return hex.length == 1 ? '0' + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    hexInput.addEventListener('input', function() {
        const hexValue = hexInput.value;
        const isValidHex = /^#[0-9A-Fa-f]{6}$/g.test(hexValue);
        if (isValidHex) {
            const rgbValues = hexToRgb(hexValue);
            redSlider.value = rgbValues.r;
            greenSlider.value = rgbValues.g;
            blueSlider.value = rgbValues.b;
            colorPreview.style.backgroundColor = hexValue;
        }
    });

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    const Instance = new App();
});
