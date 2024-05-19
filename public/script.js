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

window.onload = function() {
    includeNavbar();
    includeFooter();
};
