// Function to include the navbar content
function includeNavbar() {
    fetch('Nav_bar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching navbar:', error));
}

// Function to include the footer content
function includeFooter() {
    fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching footer:', error));
}

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

function getServerInfo() {
    getServerStatus("mc.hypixel.net", "firstServer");
    getServerStatus("play.aesthetiful.com", "secondServer");
    getServerStatus("mcsl.cosmosmc.org", "thirdServer")
    getServerStatus("mcsugars.com", "fourthServer")
    getServerStatus("mc.jahcraft.net", "fifthServer")
}

function getServerInfo() {
    let servers = fetch("https://inst-377-group27.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
            getServerStatus(res[i].ip_address, res[i].id);
        }
    });
}

window.onload = function() {
    includeNavbar();
    includeFooter();
    getServerInfo();
};
