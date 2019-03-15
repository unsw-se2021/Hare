# How to start using the App environment 

To run this app, unlike in the past, you will need to install the packages and set up the configuration files to work with your running environment. Before you begin to use this, make sure that you have run the server_setup.sh script in the root of the Git repository.   
  
# 01 - Install the dependencies 
  
To install all of the nodejs dependencies make sure you run the following command: 
```
npm install
```
  
You may also want to install the global dependencies: 
```
npm i -g create-react-app
```  
  
# 02 - Running server commands 
  
The new structure of the server allows us to run some unique commands for separate parts of the server. Notably, automated testing is now packed into this build to reduce the ambiguity on black-box requirements between modules for each developer. We also now how ways of building and modifying the server quickly and efficiently. 
  
Below are some of the current available test commands: 

#### Test API Handling inputs/outputs on the backend: 
```
npm run test_api_handling
```
#### Test database storage on the backend: 
```
npm run test_database_storage
```

#### Test database storage from API calling: 
```
npm run test_database_calling_in
```

#### Test database retrieval on backend: 
```
npm run test_database_retrieval 
```

#### Test database retrieval from API calling: 
``` 
npm run test_database_calling_out
```

