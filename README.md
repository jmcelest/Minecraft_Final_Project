# Minecraft_Final_Project

Our project is a website that shows the server status of popular Minecraft servers. We are using the Minecraft Server Status API to check the status of the servers. We created a database to store information about the Minecraft servers.


Developer Manual


1. Introduction


Project Overview

This project is a web application designed to monitor and display the status of various Minecraft servers. The application is developed using HTML, CSS, JavaScript, and Node.js with Express and Supabase for backend services.


Purpose of the Manual

This manual provides the necessary information for future developers to set up, run, and maintain the application. It includes installation instructions, API documentation, and guidelines for future development.


2. Installation


System Requirements


        •        Node.js (version 14.x or higher)

        •        npm (version 6.x or higher)


Step-by-Step Installation Guide


        1.        Cloning the Repository


git clone <repository_url>

cd <repository_directory>



        2.        Installing Dependencies

Ensure you are in the root directory of the project, then run:


npm install




3. Running the Application


Starting the Server


        1.        Start the application using the command:


npm start



        2.        Accessing the Application

Open a web browser and navigate to:


http://localhost:3000




4. Testing the Application


Running Tests

Currently, no specific tests have been written for this application. Future developers are encouraged to implement tests using a framework like Mocha or Jest.


5. API Documentation


Overview

The backend API is developed using Express and interacts with Supabase to manage server data.


GET Endpoints


        •        /servers

        •        Description: Fetches the list of all Minecraft servers and their statuses.

        •        Response:


[

  {

    "id": 1,

    "ip_address": "mc.hypixel.net",

    "server_name": "HyPixel Network",

    "country": "US"

  },

  ...

]




POST Endpoints


        •        /server

        •        Description: Adds a new server to the database.

        •        Request Body:


{

  "ip_address": "new.server.ip",

  "server_name": "New Server",

  "country": "US"

}


        •        

        •        Response:


{

  "id": 2,

  "ip_address": "new.server.ip",

  "server_name": "New Server",

  "country": "US"

}




Example Requests and Responses


        •        GET /servers


curl -X GET http://localhost:3000/servers



        •        POST /server


curl -X POST http://localhost:3000/server -H "Content-Type: application/json" -d '{"ip_address":"new.server.ip","server_name":"New Server","country":"US"}'




6. Using the Minecraft API and Webpage Descriptions


Minecraft API Integration

The Minecraft server status is fetched using the MCSrvStat API. This API provides detailed information about Minecraft servers, including their status, player count, and version.


Fetching Server Status

In the script.js file, the getServerStatus function fetches server status using the API:


function getServerStatus(server, element) {

    fetch("https://api.mcsrvstat.us/3/" + server)

    .then((res) => res.json())

    .then((res) => {

        if (res.online) {

            document.getElementById(element).innerHTML += "Online";

        } else {

            document.getElementById(element).innerHTML += "Offline";

        }

    });

}


Fetching Server Information

The getServerInfo function calls getServerStatus for each server:


function getServerInfo() {

    getServerStatus("mc.hypixel.net", "1");

    getServerStatus("play.aesthetiful.com", "2");

    getServerStatus("mcsl.cosmosmc.org", "3");

    getServerStatus("mcsugars.com", "4");

    getServerStatus("mc.jahcraft.net", "5");

}


Webpage Descriptions

Home.html:

        •        Displays general information about Minecraft, including news and updates about servers and versions.

About_Us.html:

        •        Provides information about the development team and the project’s goals.

Contact.html:

        •        Contains a form for users to submit inquiries or feedback. Submissions are redirected to Contact_Submitted.html.

Contact_Submitted.html:

        •        Confirms the successful submission of the contact form and redirects users to the homepage.

Help.html:

        •        Offers frequently asked questions (FAQs) and helpful tips for users experiencing issues with Minecraft servers.

Server_status.html:

        •        Displays the current status of various Minecraft servers. This page fetches and displays server status using the MCSrvStat API.

Nav_bar.html:

        •        Provides a navigation bar for easy access to different sections of the website.


7. Known Bugs


Current Issues


        1.        Navbar and footer sometimes fail to load due to fetch errors.

        2.        Server status might show outdated information if API data is cached.


8. Future Development



9. Additional Notes


File Structure

        •        HTML Files: Contain the structure and content of the webpages.

        •        CSS Files: Define the styles and layout of the application.

        •        JavaScript Files: Include scripts for dynamic content and API interactions.

        •        Node.js Backend: Manages the server and API endpoints.


Glossary


        •        API: Application Programming Interface

        •        Supabase: A backend-as-a-service that provides a Postgres database and other services

        •        Express: A web application framework for Node.js

        •        Node.js: A JavaScript runtime built on Chrome’s V8 JavaScript engine


References


        •        Official documentation for Node.js: https://nodejs.org/en

        •        Express framework: https://expressjs.com/

        •        Supabase services: https://supabase.com/docs