document.addEventListener("DOMContentLoaded", function() {

    class System {
        constructor() {
            this.initialize();
        }
    
        async initialize() {
            var data = await this.Data(); 
            this.auth = {
                "password": null,
                "username": null,
                "v2ray_uuid": null
            }
            this.category = {
                "color": "#77BB1CD4",
                "created_at": data,
                "id": 3281,
                "name": "VIVO",
                "sorter": 1,
                "status": "ACTIVE",
                "updated_at": data,
                "user_id": "961c3094-020a-486f-927e-b2bb4aec4871"
            }
    
            console.log(this.category);
        }
    
        async Data() {
            var dataHoraAtual = new Date();
            var ano = dataHoraAtual.getFullYear();
            var mes = dataHoraAtual.getMonth() + 1;
            var dia = dataHoraAtual.getDate();
            var horas = dataHoraAtual.getHours();
            var minutos = dataHoraAtual.getMinutes();
            var segundos = dataHoraAtual.getSeconds();
    
            var data = ano + "-" + mes + "-" + dia + " " + horas + ":" + minutos + ":" + segundos;
            return data;
        }
    
        ValueCategory(color, ordem, nome, status) {
            const callback = status;
            const ColorIten = document.querySelector(color).value;
            const OrdemIten = document.querySelector(ordem).value;
            const ItenName = document.querySelector(nome).value;
            
            console.log(callback,ColorIten,OrdemIten,ItenName)
        }
    }
    
    class EventManager {
        click(element, callback) {
            element.addEventListener("click", callback);
        }
    
        select(id) {
            var select = document.querySelector(id);
            var valorSelecionado = select.value;
            console.log("Valor selecionado: " + valorSelecionado);
            return valorSelecionado;
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
            const system = new System()
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

            eventManager.click(document.getElementById("_SalveCategory"), function() {
                var valorSelecionado = eventManager.select("#_status");
                system.ValueCategory("#hex-input", "#_ordem", "#_categoryName", valorSelecionado);
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
