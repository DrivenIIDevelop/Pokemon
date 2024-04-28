# Driven II Develop - Team Pokemon Back-end server

The back-end server of this application is handled particulary Express.js a web framework for Node.js that provides a simple but powerful features for building web applications and API's as well as MongoDB a NoSQL database that stores data in a flexible, JSON format. The reason for the use of these two technologies are due to their data flexbility and maleability allows for the use of API without worrying about a predefined

# how to run back-end server:

1. Fork and clone `https://github.com/DrivenIIDevelop/Pokemon.git` into desired project directory via terminal
2. Once cloned a new directory will be named "pokemon"
3. Navigate/CD into newly created server direcotry of the project
4. Create a `.env` file to add a MongoDB connection as there are created functions to ensure the anominity
5. Once access has been grated in MongoDB connect and add the created database cluster to `.env` as `MongoDB_URI`
6. Run the server through `node server.mjs`

# creating an access token

1. in terminal run `node`
2. type in `require('crpto').randomBytes(64).toString('hex')`
