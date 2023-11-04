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
            eventManager.click(conf, () => {
                const offView = [".itensCard",".viewVersion",".viewNotas"];
                const onView =[".viewConfig",".containerView"]
                visibilityManager.disable(offView);
                visibilityManager.enable(onView)
            });
        }
        
    }

    const Instance = new APP();
});
