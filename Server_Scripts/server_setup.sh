#!/bin/bash

echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Installing GNU tools & Ubuntu runtime packages..."
echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
sudo apt-get install build-essential
sudo apt-get install curl
sudo apt-get install git 
sudo apt-get install default-jre
sudo apt-get install nginx 
sudo apt-get install php 
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install grunt 

echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Installing NodeJS and NPM packages..."; 
echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
sudo apt-get install nodejs 
sudo npm install -g create-react-app
sudo npm install -g node-inspector 
sudo npm install -g gulp 

clear 
echo "INSTALLATION COMPLETE."
echo "PLEASE VISIT YOUR AWS INSTANCE ON THE WEBPAGE"
echo "AND REBOOT. DO NOT REBOOT FROM TERMINAL (known bugs)"
echo "..."
echo "TO ENABLE OPTIMIZED VIM, IN VIM TYPE :PlugInstall"
echo "OUTSIDE OF ANY SELECTION/EDIT MODE"
