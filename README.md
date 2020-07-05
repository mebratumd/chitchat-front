# ChitChat

This is the front end for a simple web based chat application that I made using Angular. The backend was developed using
Express and MongoDB; it can be found [here](https://github.com/mebratumd/chitchat-back).

The running application can be found [here](https://chitchatmessage.herokuapp.com/).

# Set up

<ol>
  <li>Clone back end repo <code>git clone https://github.com/mebratumd/chitchat-back.git</code></li>
  <li>Navigate into back end repo and install dependencies <code>npm install</code></li>
  <li>Place this repo into a root folder that will also contain the repo for the front end</li>
  <li>Clone front end repo into root folder: <code>git clone https://github.com/mebratumd/chitchat-front.git</code></li>
  <li>Navigate into front end rep and install dependencies <code>npm install</code></li>
  <li>In "angular.json" file update <code>outputPath</code> to "../chitchat-back/public/"</li>
  <li>In .env file set <code>MONGO_URI</code> to your database connection URI</li>
</ol>

# Use

<ol>
  <li>Navigate into "chitchat-back" and run <code>node server.js</code></li>
  <li>Navigate into "chitchat-front" and run <code>ng build --watch</code></li>
  <li>The application will be running on localhost:5000</li>
</ol>
