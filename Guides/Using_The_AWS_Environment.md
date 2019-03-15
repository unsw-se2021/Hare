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
![My AWS connect screen]('./a1.png') 
  
The bottom command, for me `ssh -i "seng_key.pem" ubuntu@ec2-54-252-168-81.ap-southeast-2.compute.amazonaws.com`, will be used to connect to your AWS server for the first time. If you would like to add this key to your keychain with a custom command, you will need to manually add it to your `~/.ssh/authenticated_keys` file. 
  
Paste this command and press enter in your terminal. You will be asked if you want to remember it as a host, type `yes` and press enter. 
  
## General use of the server 
  
### Logging in 
To get into the server, you will always be using the `ssh` command from your terminal. If you would like to create a custom command, for example, I have `ssh sengaws`, you must navigate 
  
### Copying files to the server
  
### Copying files from the server 
  
  
### 
## Installing our dependencies 

## Updating Vim (Optional) 

## Using Vim (Optional) 

## Rebooting the server 

## Installing packages 

## Common issues 
