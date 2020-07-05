# ChitChat

This is the front end for a simple web based chat application that I made using Angular. The backend was developed using
Express and MongoDB; it can be found [here](https://github.com/mebratumd/chitchat-back).

The running application can be found [here](https://chitchatmessage.herokuapp.com/chat).

# Use

<ol>
  <li>Clone repo <code>git clone https://github.com/mebratumd/chitchat-front.git</code></li>
  <li>Navigate into repo and install dependencies <code>npm install</code></li>
  <li>Place this repo into a root folder that will also contain the backend code</li>
  <li>Clone backend repo into root folder: <code>git clone https://github.com/mebratumd/chitchat-back.git</code></li>
  <li>In "angular.json" file update <code>outputPath</code> to "../chitchat-back/public/"</li>
  <li>In .env file set <code>MONGO_URI</code> to your database connection URI</li>
</ol>
