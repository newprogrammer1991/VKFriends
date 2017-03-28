/**
 * Created by ALI on 3/14/2017.
 */

(function () {
    "use strict";
    let users=[];
    let lists;
    document.addEventListener("input",function () {
        let target=event.target;
        if(target.className=="sort"){
                let aimedList=document.querySelector(`ul[data-action=${target.dataset.action}]`);
                lists=aimedList.children;
            displayMathes(target);
        }

    });
        function displayMathes(target) {
          findMatchFriends( target.value);

    };

    function findMatchFriends(wordmatch) {
        let count=0;
        let reg = new RegExp(wordmatch, "gi");
        for (var i = 0; i < lists.length; i++) {
        if(!lists[i].children[1].innerHTML.match(reg)){
            lists[i].style.display="none";
        }
        else {
            lists[i].style.display="block";
        }
        }

    };



})();

