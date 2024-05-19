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
    getServerStatus("mc.hypixel.net", "1");
    getServerStatus("play.aesthetiful.com", "2");
    getServerStatus("mcsl.cosmosmc.org", "3")
    getServerStatus("mcsugars.com", "4")
    getServerStatus("mc.jahcraft.net", "5")
}

/*
function getServerInfo() {
    let servers = fetch("https://inst-377-group27.vercel.app/servers")
    .then((res) => res.json())
    .then((res) => {
        for (let i = 0; i < res.length; i++) {
            getServerStatus(res[i].ip_address, res[i].id);
        }
    });
}
*/

window.onload = function() {
    includeNavbar();
    includeFooter();
    getServerInfo();
};
