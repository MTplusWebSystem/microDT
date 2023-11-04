document.addEventListener("DOMContentLoaded", function() {
    class EventManager {

        click(element, callback) {
            element.addEventListener("click", callback);
        }
    }
    
    class VisibilityManager {
        enable(elements) {
            elements.forEach(element => {
                const offElements = document.querySelectorAll(element);
                offElements.forEach(off => {
                    off.style.display = "flex";
                });
            });
        }

        disable(elements) {
            elements.forEach(element => {
                const offElements = document.querySelectorAll(element);
                offElements.forEach(off => {
                    off.style.display = "none";
                });
            });
        }
    }

    class APP {
        constructor() {
            const eventManager = new EventManager();
            const visibilityManager = new VisibilityManager();
            const conf = document.querySelector("#creatConfig");
            const category = document.querySelector("#creatCategory");
            eventManager.click(conf, () => {
                const offView = [".itensCard",".viewVersion",".viewNotas",".viewCategory"];
                const onView =[".viewConfig",".containerView"]
                visibilityManager.disable(offView);
                visibilityManager.enable(onView)
            });
            eventManager.click(category, () => {
                const offView = [".itensCard",".viewVersion",".viewNotas",".viewConfig"];
                const onView =[".containerView",".viewCategory"]
                visibilityManager.disable(offView);
                visibilityManager.enable(onView)
            });
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

    const Instance = new APP();
});
