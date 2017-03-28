/**
 * Created by ALI on 3/12/2017.
 */
(function () {
    "use strict";

    let element, shiftX, shiftY, coords, startX, startY, moveX, moveY;
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
    document.ondragstart = function () {
        return false;
    };

    function OnMouseDown() {
        let target = event.target;
        while (target != this) {
            if (target.tagName == "LI") {
                element = target;
                coords = getCoords(element);
                startX = coords.left;
                startY = coords.top;
                shiftX = event.pageX - startX;
                shiftY = event.pageY - startY;
                console.log(element);
                document.onmousemove = OnMouseMove;
                return;
            }
            target = target.parentNode;
        }
    };
    function OnMouseMove(event) {
        moveX = event.pageX - startX;
        moveY = event.pageY - startY;
        if (element) {
            element.style.position = "fixed";
            element.style.left = event.pageX - shiftX + "px";
            element.style.top = event.pageY - shiftY + "px";
        }
    }

    function OnMouseUp() {
        let result = findDrobable(event);
        if (result && Math.abs(moveX) > 3 && Math.abs(moveY) > 3) {
            // element.setAttribute("data-id","added") //element.setAttribute("data-id","all");
            result.firstElementChild.appendChild(element);

            cancel();
        }
        else {
            cancel();
        }
    };

    function findDrobable(event) {
        if (element) {
            element.style.display = "none";
            let elements = document.elementFromPoint(event.clientX, event.clientY);
            element.style.display = "block";
            return elements.closest(".dropZone") || elements.closest(".from");
        }
    };

    function cancel() {
        if (element) {
            element.style.position = "";
            moveX = 0;
            moveY = 0;
            document.onmousemove = null;
            element = null;
        }
    };
    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    };
})();


