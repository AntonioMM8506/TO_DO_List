# TO_DO_List
## SDJS-02 Examination


![](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white) ![](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white) ![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white) ![](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white) ![](https://img.shields.io/badge/freecodecamp-27273D?style=for-the-badge&logo=freecodecamp&logoColor=white) ![](https://img.shields.io/badge/Udemy-EC5252?style=for-the-badge&logo=Udemy&logoColor=white) ![](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white
) ![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) 


## **Instructions**

Clone this repo, depending whether you have **Docker** installed in your machine is how you can run it.

First. in the **_server_** folder, create a **_.env_** file.

If you have Docker, add the following variable, save the file and close it
```
ATLAS_URI=mongodb://mongodb:29011/new-docker-db
```

If not, you will have to configure the env with your own database created in your MongoDB account. You will have to create the Database and the Collection and then add the URL. It would look like this:
```
ATLAS_URI=mongodb+srv://YourUserName:YourPassword@your.database.mongodb.net/
```


## Run with Docker
In the terminal, in the root folder run the command:
```
docker compose build
```

The containers will be created.

Then, to run the containers run the command:
```
docker-compose up
```

Wait until the containers are mounted and running. Then navigate to:
```
http://localhost:3000
```

To terminate the process and stop all the containers, just type Ctrl+C in the terminal.

>**If you need to edit any part from the server side, remember that you will always have to stop the containers, build the project and mount the containers once again.**

## Run without Docker - Localhost

In the client folder, locate the package.json file and edit the line of "proxy"

```
"proxy" : "http://localhost:5000"
```

Then open 2 terminals. In one locate into the **_server_** folder, and in the other one locate into the **_client_** folder. 

In the **_server_** terminal. Run the following command:
```
npm run dev
```

Wait until the service starts. Then proceed to run in the **_client_** terminal the following command:
```
npm build
```

When it finishes, then run the following command:
```
npm start
```
When the service is ready you can access to:
```
http://localhost:3000
```

>**You can see the evidence of the project in the _Evidence_ folder**
