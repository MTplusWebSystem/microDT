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
                const on = ["#start"]
                const off = ["#ctry", "#conf","#sendmsg"]
                show.enable(on)
                show.disable(off)
            });
        }
    }

    const Instance = new App();
});
