-Create a repository
-Initialize the Repository
-node_modules, package.json, package-lock.json
-Install express
-Create a server
-Listen to port 7777
-Write request handlers for /test, /hello
-Install nodemon and update scripts inside package.json

-initialize git
-.gitignore
-Create a remote repo on github
-Push all code to remote origin
-Play with routes and route extensions ex. /hello, /, hello/2, /xyz
-Order of the routes matter a lot
-Install postman app and make a workspace/collection > test GET API call
-Write logic to handle GET,POST,PATCH,DELETE API Calls and test them on Postman
-Explore routing and use of ?, +, (), + in the routes
-params in route handler
-reading dynamic routes

-next();
-Middleware
-dummy auth middleware for user and admin
-Error handling

-create a free cluster on mongoDB official website(Mongo Atlas)
-Install mongoose library
-Connect your application to the Database "Connection-url/devTinder"
-Call the connectDB function and connect to database before starting application on 3007
-Create a userSchema and userModel
-Create POST/signup API to add data to database
-Puse some documents using API calls from postman


-JS object vs JSON Object (Difference)
-Add the express.json middleware to your app
-Make your signup API Dynamic to receive data from the end user
-User.findOne with duplicate emailIDs, which object returned.
-API - get user by email.
-API - FEED API - GET/feed - get all the users from the database.
-API - Update a user
-Explore the Mongoose Documentation for Model methods
-API - create Update and delete APIs

-Explore schema properties of document
-add required, unique, min, max etc;
-create custom validate function for gender
-Improve the DB Schema - Put the custom validation function in each field
-Add timestamps to userSchema
-Add API level validation on patch and post APIs
-Use validator
-Explore validator library like isEmail, isStrongPassword etc.
-///Never trust req.body///

-validate data in signup/post API
-Install Bcrypt package
-Create a password Hash Save the users with  encrypted password
-Create Login API
-Compare password using bcrypt.compare and throw errors if email or password is invalid

-install jsonwebtoken and cookie-parser
-create get/profile API
-create a JWT Token and send it back to user in cookies
-read the cookies insider your profile API and find the logged in user
-add the userAuth middlewarein profile API
-set the expiry of JWT and cookies to 7 days

-Explore tinder APIs
-Create a list all API you can think in DevTinder
-Group multiple routes under respective routers
-Create routes folder for managing auth, profile, request routers.  
-Import these routers in app.js
-Create POST/logout API
-Create PATCH/profile/edit
-Create PATCH/profile/password
-Make sure you validated all data in every POST, PATCH API.
-Test all APIs

-Create ConnectionRequestSchema
-create Connection Request API in requests.js
-Properly validate the data
-$or and $and query in mongoose. 
-Read more about indexes and compound indexes in MongoDB
-Why do we need indexes in DB?
-Adv and Disadv. of creating indexes?
-schema.pre("save", function(){});

-Write API for requestRouter.post("/request/review/:action/:requestId)
-Thought Process - POST vs GET

-Logic for get/FEED API
-Explore $nin, $ne etc..
-Add pagination to your /feed API