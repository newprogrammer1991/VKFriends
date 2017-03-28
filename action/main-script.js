
(function () {
    "use strict";
    let leftList=document.querySelector('ul[data-action=all');
    let rightList=document.querySelector('ul[data-action=added]');
    let allUsers = [];
    let html = [];

    function download() {
        return new Promise(function (resolve, reject) {
            VK.init({
                apiId: 5919205
            });
            VK.Auth.login(function (response) {
                if (response.session) {
                    resolve(response.session);
                }
                else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            });
        })
    };

    function get(method, params) {
        return new Promise(function (resolve, reject) {
            VK.api(method, params, function (result) {
                if (result) {
                    resolve(result.response);
                }
                else {
                    reject();
                }
            })
        })
    };

    let p = download();
    p.then(function (answer) {
       getUser();
    }, function (answer) {
        console.log(answer);
    });
    function getUser() {
        let p = get("friends.get", {fields: "photo_50"});
        p.then(function (answer) {

                allUsers.push(...answer);
                display(answer);

            },
            function () {
                console.log("answer");
            })
    };
    function display(users) {

        for (var i = 0; i < users.length; i++) {
            let photo = users[i]["photo_50"];
            let name = users[i]["first_name"] + " " + users[i]["last_name"];
            html.push(`<li class="dragable"><img src=${photo}><span>${name}</span><img class="add" src="image/friendadd.png"></li>`);
        }
        leftList.innerHTML = html.join('');
    };
    img/friendadd.png
    document.addEventListener("click",move);
    function move(){
        let target=event.target;
         if(target.className=="add"){
             if(leftList.contains(target)){
                 rightList.appendChild(target.parentNode);
             }
             else {
                 leftList.appendChild(target.parentNode);
             }
         }
    }
})();



