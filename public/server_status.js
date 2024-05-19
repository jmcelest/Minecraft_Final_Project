function getServerStatus(server, element) {
    fetch("https://api.mcsrvstat.us/3/" + server)
    .then((res) => res.json())
    .then((res) => {
        if(res.online == true) {
            document.getElementById(element).innerHTML += "Online";
        }
        else {
            document.getElementById(element).innerHTML += "Offline";
        }
    });
}

var host = window.location.origin;
console.log(host)

function getServerInfo() {
    fetch("https://minecraft-final-project.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            var div = document.createElement("div");
            div.setAttribute("id", `server${res[i].id}`);
            div.setAttribute("class", "container");
            document.getElementById("server-container").appendChild(div);

            var h1 = document.createElement('h1');
            h1.setAttribute("id", res[i].id);
            h1.innerHTML = `Server Status for ${res[i].server_name}: `;
            div.appendChild(h1);
            getServerStatus(res[i].ip_address, res[i].id);
        }
    });
}

window.onload = getServerInfo();