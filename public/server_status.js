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

function checkValidation(server) {
    fetch("https://api.mcsrvstat.us/3/" + server)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        if(res.ip == "127.0.0.1") {
            return false;
        }
    });
}

function getServerInfo() {
    fetch("https://minecraft-final-project.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
        var count = 0;
        for (let i = 0; i < res.length; i++) {
            if (Boolean(checkValidation(res[i].ip_address))) {
                var div = document.createElement("div");
                div.setAttribute("id", `server${res[i].id}`);
                div.setAttribute("class", "container");
                document.getElementById("server-container").appendChild(div);

                var h1 = document.createElement('h1');
                h1.setAttribute("id", res[i].id);
                h1.innerHTML = `Server Status for ${res[i].server_name}: `;
                div.appendChild(h1);
                getServerStatus(res[i].ip_address, res[i].id);
                count += 1;
            }
            if (count == 10) break;
        }
    });
}

async function createServer() {
    await fetch("https://minecraft-final-project.vercel.app/server", {
        method: 'POST',
        body: JSON.stringify({
            "server_name": `${document.getElementById("serverName").value}`,
            "ip_address": `${document.getElementById("ipAddress").value}`,
            "country": `${document.getElementById("region").value}`,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((res) => {
        
    })
}

window.onload = getServerInfo();