document.addEventListener("DOMContentLoaded", function() {
    class Render {
        open_vh(id, ht, wt) {
            const show = new Show();
            const view = document.querySelector(id);
            if (view) {
                const list = ["#ctry", "#conf"];
                show.itens(list);
                view.style.transition = "0.6s";
                view.style.height = ht;
                view.style.width = wt;
                start.id = "home_close";
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
        itens(list) {
            list.forEach(element => {
                document.querySelector(element).style.display = "flex";
            });
        }
    }

    class App {
        constructor() {
            const eventStart = new Event();
            const render = new Render();
            const start = document.getElementById("start");

            eventStart.click(start, () => render.open_vh("#home", "40vh", "60px"));
        }
    }

    const Instance = new App();
});
