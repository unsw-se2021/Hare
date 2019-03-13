# Using the AWS environment for development 
  
The development environment we are using for this project is the exact same for every member. This is to ensure that we don't run into dependency issues or version conflicts when using code. This also presents new issues in the form of dealing with the server itself. Here is a useful guide for doing some basic operations with the server. 
  
## Getting into your server 
  
It is assumed that by now you have registered for Amazon Web Services, and that you have launched and EC2 instance with Ubuntu 18.04 LTS (HVM) running.  
You should have also downloaded a `*.pem` key when you launched this instance. This is essential for getting access to your server. If you don't have this, you will have no option but to terminate your current EC2 instance and launch another. Save it somewhere you will never lose it, and that you can access it from anywhere.  
  
  
This guide does not account for people using an OS other than MacOS (Sierra or later) or Linux. 
  
First, navigate into the folder in which you saved your `.pem` key, for most people this is `~/Downloads` which can be navigated to using:   
```
cd ~/Downloads
```
  
Then, on your AWS console, right click on your running instance and click the `connect` option. You will be presented with a screen that looks somewhat like this:  
![My AWS connect screen]() 
  
The bottom command, for me `.`, will be used to connect to your AWS server for the first time. If you would like to add this key to your keychain with a custom command, you will need to manually add it to your `~/.ssh/authenticated_keys` file. 

## General use of the server 

## Installing our dependencies 

## Updating Vim (Optional) 

## Using Vim (Optional) 

## Coping files from your local PC to the server

## Copying files from the server to your local PC 

## Rebooting the server 

## Installing packages 

## Common issues 
