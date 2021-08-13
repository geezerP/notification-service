# notification-service

This is a Notification service build with [nodejs](https://nodejs.org/en/), it uses [express](https://expressjs.com/), [mongoose](https://mongoosejs.com/) and [firebase-admin sdk](https://firebase.google.com/docs/admin/setup) to send notifications. It let's you

1. send notification to all the subscribed users, to a specific user or users, to a group of users with a common topic.

2. Send sms' to all the subscribed users, to a specific user or users. (SMS provider integration needed)
 ** Here since we want to reduce dependency we could have our own implementation of an SMSC or build on ontop of [Kannel](https://www.kannel.org/)

3. Refresh firebase tokens.

## Instructions

To Run the Project:
* Clone the repository here: https://github.com/geezerP/notification-service

* Cd into the directory of the project from the terminal

* Head to the [Firebase console](https://console.firebase.google.com/u/0/)

* Create a new project from the firebase console and give it a name, or select an existing project.

* Go to your project's settings, then to service accounts, then generate new private key and download it.

* Copy the content of the private key file you just downloaded into `serviceAccountKey.json`

* Configure your mongo database in `mongoose.js` in my case i use a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), and it's password will be in  `nodemon.json`

* Install all project dependencies with `npm install`

* Run the project with `npm start` and it will be listening at localhost:3000

* Test the project with `npm test`

***To Run the Service with Docker:***
* Ensure you have Docker instaled.
* Ensure you have docker-compose installed
* run `sudo docker-compose up` it will be listening at localhost:3000

***The API contains 6 endpoints*** 

**You can see a full Documentation for the API and examples from [here](https://documenter.getpostman.com/view/8583612/Tzz7PHnJ)**


  1. /notifications
     * /notifications/send-notifications-to-all
     * /notifications/send-individual-notification
     * /notifications/send-to-group
  2. /sms
     * /sms/group-sms
     * /sms/individual-sms
  3. /token
  
***Architecture Diagram***
* [Here](https://miro.com/app/board/o9J_l2FtDBM=/) is the architecture diagram. (Some components will need to be fleshed out) 

***How other Microservices can communicate with this service:***

* As indicated on the design diagram as part of improvement I would need to implement some RPC queue to enable full service communication. 

* Currently all other services will communicate with this service through the restful service exposed through endpoints 

***Future IMprovements:***

* Implement the AMQP and MQTT consumers and publishers to enable microservice communication. 
* Implement the API Gateway.
* Refactor based on feedback.



