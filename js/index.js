document.addEventListener("DOMContentLoaded", function() {
    class Render {
        open_vh(id, ht, wt) {
            const show = new Show();
            const view = document.querySelector(id);
            if (view) {
                const on = ["#ctry", "#conf","#sendmsg"];
                const off = ["#start"];
                show.enable(on);
                show.disable(off)
                view.style.transition = "0.3s";
                view.style.height = ht;
                view.style.width = wt;
                return id;
            }
            return null;
        }

        close_vh(id) {
            const view = document.querySelector(id);
            if (view) {
                view.style.transition = "0.6s";
                view.style.height = "60px";
                view.style.width = "65px";
                console.log(view);
            }
        }
    }

    class Event {
        click(id, callback) {
            id.addEventListener("click", callback);
        }
    }

    class Show {
        enable(list) {
            list.forEach(element => {
                document.querySelector(element).style.display = "flex";
            });
        }
        disable (list) {
            list.forEach(element => {
                document.querySelector(element).style.display = "none";
            });
        }
    }

    class App {
        constructor() {
            const show = new Show();
            const eventClick = new Event();
            const render = new Render();
            const start = document.getElementById("start");
            const creat_ctry = document.getElementById("ctry");
            eventClick.click(start, () => render.open_vh("#home", "40vh", "60px"));

            eventClick.click(creat_ctry, ()=> {
                const off = [".infos",".notifications",".cardButtons",]
                show.disable(off)
            })
            eventClick.click(creat_ctry, () =>{
                render.open_vh("#home", "60px", "65px")
                const on = ["#start",".ctry"]
                const off = ["#ctry", "#conf","#sendmsg"]
                show.enable(on)
                show.disable(off)
            });
        }
    }

    const hexInput = document.getElementById('hex-input');
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const colorPreview = document.getElementById('color-preview');
    
    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;
        const hexValue = rgbToHex(red, green, blue);
        colorPreview.style.backgroundColor = hexValue;
        hexInput.value = hexValue;
    }
    
    function componentToHex(c) {
        const hex = c.toString(16);
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
