document.addEventListener("DOMContentLoaded", function() {
    let autoId = 1000;
    let autoCategory = 0;
    let listas = {
        category:[],
        nameID:[],
        delete:[]
    }
    let listView ={
        category : 0,
        payload:0,
        offline:0,
    }
    let Config = ["zero"]

    class Render{
        
        card (name, chave, category) {
            const cardContainer = document.querySelector(".viewList"); 

            const card = document.createElement("div");
            card.classList.add( 'justify-evenly-vw', 'config', 'col-9');
            card.id = chave
            const editView = document.createElement("div");
            editView.classList.add("editView", "col-8", "justify-evenly-vw");
            
            const editButton = document.createElement("button");
            const editIcon = document.createElement("i");
            editIcon.classList.add("fi", "fi-rs-edit-alt");
            editButton.appendChild(editIcon);
            editView.appendChild(editButton);
            
            const duplicateButton = document.createElement("button");
            const duplicateIcon = document.createElement("i");
            duplicateIcon.classList.add("fi", "fi-rs-duplicate");
            duplicateButton.appendChild(duplicateIcon);
            editView.appendChild(duplicateButton);
            
            const deleteButton = document.createElement("button");
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fi", "fi-rs-trash");
            deleteButton.appendChild(deleteIcon);
            editView.appendChild(deleteButton);
            
            const wifiButton = document.createElement("button");
            const wifiIcon = document.createElement("i");
            wifiIcon.classList.add("fi", "fi-rs-wifi-exclamation");
            wifiButton.appendChild(wifiIcon);
            editView.appendChild(wifiButton);
            
            const nameGroup = document.createElement("div");
            nameGroup.classList.add("grup-vH", "justify-evenly-vw", "col-4");
            const nameHeading = document.createElement("h4");
            nameHeading.textContent = "Nome";
            const nameSpan = document.createElement("span");
            nameSpan.textContent = name
            nameGroup.appendChild(nameHeading);
            nameGroup.appendChild(nameSpan);
            
            const categoryGroup = document.createElement("div");
            categoryGroup.classList.add("grup-vH", "justify-evenly-vw", "col-4");
            const categoryHeading = document.createElement("h4");
            categoryHeading.textContent = "Categoria";
            const categorySpan = document.createElement("span");
            categorySpan.textContent = category
            categoryGroup.appendChild(categoryHeading);
            categoryGroup.appendChild(categorySpan);
            
            card.appendChild(editView);
            card.appendChild(nameGroup);
            card.appendChild(categoryGroup);
            
            cardContainer.appendChild(card);
            
        }
    }
    class System {
        Data() {
            const dataHoraAtual = new Date();
            const ano = dataHoraAtual.getFullYear();
            const mes = dataHoraAtual.getMonth() + 1;
            const dia = dataHoraAtual.getDate();
            const horas = dataHoraAtual.getHours();
            const minutos = dataHoraAtual.getMinutes();
            const segundos = dataHoraAtual.getSeconds();
            return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
        }

        category(vetores) {
            const data = this.Data();
            const selectElement = document.getElementById("category"); 
            
            function crete () {
                autoCategory++;
                const option = document.createElement("option");
                option.value = autoCategory;
                option.textContent = vetores.item3;
                selectElement.appendChild(option);
            };
            crete()
            
            return {
                color: vetores.item1,
                created_at: data,
                id: autoId++,
                name: vetores.item3,
                sorter: vetores.item4,
                status: vetores.item5,
                updated_at: data,
                user_id: "961c3094-020a-486f-927e-b2bb4aec4871"
            };
        }

        ValueCategory(color, ordem, nome, status) {
            const ColorIten = document.querySelector(color).value;
            const OrdemIten = document.querySelector(ordem).value;
            const ItenName = document.querySelector(nome).value;
            return {
                item1: ColorIten,
                item2: autoId++,
                item3: ItenName,
                item4: OrdemIten,
                item5: status
            };
        }

        auth(user, pass, v2ray) {
            return {
                password: user || null,
                username: pass || null,
                v2ray_uuid: v2ray || null
            };
        }
    }

    class EventManager {
        click(element, callback) {
            element.addEventListener("click", callback);
        }

        select(id) {
            const select = document.querySelector(id);
            return select ? select.value : null;
        }
        delete(id){

        }
    }

    class VisibilityManager {
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

    class APP {
        constructor() {
            const render = new Render();
            const system = new System();
            const eventManager = new EventManager();
            const visibilityManager = new VisibilityManager();
            const conf = document.querySelector("#creatConfig");
            const home = document.querySelector("#home");
            const category = document.querySelector("#creatCategory");
            const viewList = document.querySelector("#viewList");
            const saveCategory = document.querySelector("#_SalveCategory");
            const saveConfig = document.querySelector("#_SalveConfig")

            eventManager.click(conf, () => {
                visibilityManager.disable([".itensCard", ".viewVersion", ".viewNotas", ".viewCategory",".viewList"]);
                visibilityManager.enable([".viewConfig", ".containerView"]);
            });

            eventManager.click(category, () => {
                visibilityManager.disable([".itensCard", ".viewVersion", ".viewNotas", ".viewConfig",".viewList"]);
                visibilityManager.enable([".containerView", ".viewCategory"]);
                
            });

            eventManager.click(viewList, () => {
                visibilityManager.disable([".itensCard", ".viewVersion", ".viewNotas", ".viewConfig",".viewCategory"]);
                visibilityManager.enable([".containerView", ".viewList"]);
                
            });
            eventManager.click(home,()=>{
                visibilityManager.disable([,".containerView"]);
                visibilityManager.enable([".itensCard", ".viewVersion", ".viewNotas", ".viewConfig",".viewCategory"]);
            })
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
              }
            eventManager.click(saveCategory, ()=> {
                const categoria = document.getElementById('card_category')
                const valorSelecionado = eventManager.select("#_status");
                const category = valorSelecionado == 1 ? system.ValueCategory("#hex-input", "#_ordem", "#_categoryName", "ACTIVE") : null;
                const savedCategoryData = category ? system.category(category) : null;
                listas.category.push(savedCategoryData)
                listView.category++; 
                console.log(listas)
                const valor = listView.category;
                if (valor <= 9) {
                    categoria.textContent = "00" + valor;
                } else if (valor <= 99) {
                    categoria.textContent = "0" + valor;
                } else {
                    categoria.textContent = valor;
                }
                
            })

            eventManager.click(saveConfig, function() {
                const categoria = document.getElementById('card_payload')
                const selectValor = document.getElementById("category").value
                
                console.log(selectValor)
                listView.payload++; 
                
                const valor = listView.payload;
                if (valor <= 9) {
                    categoria.textContent = "00" + valor;
                } else if (valor <= 99) {
                    categoria.textContent = "0" + valor;
                } else {
                    categoria.textContent = valor;
                }
                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                  }
                  
                  const numeros = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                  const randomI= getRandomInt(0, numeros.length - 1);
                  const randomII= getRandomInt(0, numeros.length - 1);
                  const randomIII= getRandomInt(0, numeros.length - 1);
                  const n = numeros[randomI];
                  const n2 = numeros[randomII];
                  const n3 = numeros[randomII];
                  
                  
                const type = eventManager.select("#_type");
                var payload =  document.getElementById("payload").value;
                var description =  document.getElementById("description").value;
                var dns1 =  document.getElementById("dns1").value;
                var dns2 =  document.getElementById("dns2").value;
                var icon =  document.getElementById("icon").value;
                var nome =  document.getElementById("name").value;
                var server =  document.getElementById("server").value;
                var udp_ports =  document.getElementById("udp_ports").value;
                var checkuser = document.getElementById("checkuser").value;
                var port =  document.getElementById("port").value;
                var ordem =  document.getElementById("ordem").value;
                const user = document.getElementById("user").value;
                const pass = document.getElementById("pass").value;
                const v2ray = document.getElementById("v2ray").value;
                let chave = n+n2+n3
                const nameOrdem = {
                    name: nome,
                    id: system.Data()
                }
                listas.nameID.push(nameOrdem)
                console.log(listas.nameID)
                const categoryData = listas.category[selectValor]
                console.log(nameOrdem)
                const auth = system.auth(user, pass, v2ray);
                if (type == 1) {
                    var ssh_direct ={
                        "auth":auth,
                        "category":categoryData,
                        "category_id":autoId,
                        "config_openvpn":null,
                        "config_payload":{
                           "payload":payload,
                           "sni":null
                        },
                        "config_v2ray":null,
                        "created_at":system.Data(),
                        "description":null,
                        "dns_server":{
                           "dns1":dns1,
                           "dns2":dns2
                        },
                        "icon":icon,
                        "id":113438,
                        "mode":"SSH_DIRECT",
                        "name":nome,
                        "proxy":{
                           "host":null,
                           "port":null
                        },
                        "server":{
                           "host":server,
                           "port":port
                        },
                        "sorter":ordem,
                        "status":"ACTIVE",
                        "tls_version":"TLSv1.2",
                        "udp_ports":[
                            udp_ports
                        ],
                        "updated_at":system.Data(),
                        "url_check_user":checkuser,
                        "user_id":"9bc2f4c4-8916-42f7-9065-0a907e806ed6"
                     }
                    const category = document.querySelector("#_categoryName").value;
                    render.card(nome,system.Data(),category)
                    console.log(ssh_direct)
                }
                else if (type == 2) {
                    var ssh_proxy = {
                        "auth":auth,
                        "category":categoryData,
                        "category_id":autoId,
                        "config_openvpn":null,
                        "config_payload":{
                            "payload":payload,
                            "sni":null
                         },
                        "config_v2ray":null,
                        "created_at":system.Data(),
                        "description":null,
                         "description":description,
                         "dns_server":{
                            "dns1":dns1,
                            "dns2":dns2
                         },
                         "icon":icon,
                         "id":autoId,
                         "mode":"SSH_PROXY",
                         "name":nome,
                         "proxy":{
                            "host":server,
                            "port":port
                         },
                         "server":{
                            "host":server,
                            "port":port
                         },
                         "sorter":ordem,
                         "status":"ACTIVE",
                         "tls_version":"TLSv1.2",  
                         "udp_ports":[udp_ports],
                         "updated_at":system.Data(),
                         "url_check_user":checkuser,
                         "user_id":"961c3094-020a-486f-927e-b2bb4aec4871"                       
                    }
                    
                    const category = document.querySelector("#_categoryName").value;
                    render.card(nome,system.Data(),category)
                    console.log(ssh_proxy)
                } else if ( type == 8){
                    var vIIray = {
                        "auth":auth,
                        "category":categoryData,
                        "category_id":autoId,
                        "config_openvpn":null,
                        "config_payload":{
                           "payload":null,
                           "sni":null
                        },
                        "config_v2ray":v2ray,
                        "created_at":system.Data(),
                        "description":description,
                        "dns_server":{
                           "dns1":dns1,
                           "dns2":dns2
                        },
                        "icon":icon,
                        "id":autoId,
                        "mode":"V2RAY",
                        "name":nome,
                        "proxy":{
                           "host":null,
                           "port":null
                        },
                        "server":{
                           "host":null,
                           "port":null
                        },
                        "sorter":ordem,
                        "status":"ACTIVE",
                        "tls_version":"TLSv1.2",
                        "udp_ports":[
                           
                        ],
                        "updated_at":"2023-09-28 23:57:52",
                        "url_check_user":checkuser,
                        "user_id":"9bc2f4c4-8916-42f7-9065-0a907e806ed6"
                     }
                    const category = document.querySelector("#_categoryName").value;
                    render.card(nome,system.Data(),category)
                    console.log(vIIray)
                }

                
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
