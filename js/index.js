document.addEventListener("DOMContentLoaded", function () {
    class System {

    }
    class EventManager {
        click(id, callback) {
            id.addEventListener("click", callback)
        }
    }

    class Render {

    }

    class Show {

        enable(elements) {
            elements.forEach(element => {
                document.querySelectorAll(element).forEach(off => {
                    off.style.display = "flex";
                });
            });
        }

        disable(elements) {
            elements.forEach(element => {
                document.querySelectorAll(element).forEach(off => {
                    off.style.display = "none";
                });
            });
        }
    }

    class App {
        constructor() {
            const event = new EventManager()
            const show = new Show()
            const CreateConfig = document.getElementById("createConfig")

            event.click(CreateConfig, () => {
                const disable = [".itensCard", ".viewVersion", ".viewNotas", ".viewCategory"]
                console.log("olá")
                show.disable(disable)
            })
        }

        Config() {

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

    hexInput.addEventListener('input', function () {
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
