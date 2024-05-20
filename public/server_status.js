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

function checkValidation() {
    var server = document.getElementById("ipAddress").value;
    fetch("https://api.mcsrvstat.us/3/" + server)
    .then((res) => res.json())
    .then((res) => {
        console.log(res.ip);
        if(res.ip == "127.0.0.1") {
            alert("The IP Address is Invalid");
        } else {
            createServer();
        }
    });
}

function getServerInfo() {
    fetch("https://minecraft-final-project.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
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

    updateServerStatusChart();
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
    alert("Your server is now on the list!");
    window.location.reload();
}

// Fetch the server status data from the API and update the chart accordingly
function updateServerStatusChart() {
    fetch("https://minecraft-final-project.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
        let onlineCount = 0;
        let offlineCount = 0;
        let totalServers = res.length;
        let checkedServers = 0;

        res.forEach(server => {
            fetch("https://api.mcsrvstat.us/3/" + server.ip_address)
            .then((serverRes) => serverRes.json())
            .then((serverRes) => {
                if(serverRes.online) {
                    onlineCount++;
                } else {
                    offlineCount++;
                }

                checkedServers++;
                // Update the chart data after checking all servers
                if (checkedServers === totalServers) {
                    createServerStatusChart(onlineCount, offlineCount);
                }
            });
        });
    });
}

// Function to create the server status chart
function createServerStatusChart(online, offline) {
    var ctx = document.getElementById('serverStatusChart').getContext('2d');
    var serverStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Online Servers', 'Offline Servers'],
            datasets: [{
                label: 'Server Status',
                data: [online, offline],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Server Status'
                }
            }
        }
    });
}

window.onload = getServerInfo();