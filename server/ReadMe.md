## Node Application with MongoDB as database

This application uses the mongoose package to save the user demographic data and an image to mongoDB

>To run the application
***ServerSide***
*   Add your mongoDB server url and database of your wish ( Collection is predefined in the code.) in the ```server.js``` in the server directory
*   run 
```
npm install
node start 
```
*   If any errors are raised with DB Connection, they will be logged in terminal.
***Client Side***
*   Run following commands in client directory 
```
npm install
npm start 
```

> To maintain client server module differently ( may be in different servers), concurrent execusion of both server and client with single command is excluded. Can be added on user interest.
> Upon retrieval  the data is loaded as a list instead of grid, will update the feature as soon as possible.

