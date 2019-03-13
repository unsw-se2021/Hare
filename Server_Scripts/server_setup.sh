#!/bin/bash

echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Installing GNU tools & Ubuntu runtime packages..."
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
clear
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
sudo npm i -g eslint 
sudo npm install grommet 

clear
echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Creating vimrc and pluginstall files..."
echo "================================================="
echo "================================================="
echo "================================================="
sudo curl -fLo ~/.vim/autoload/plug.vim --create-dirs \https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
sudo wget -O ~/.vimrc https://gist.githubusercontent.com/Michael-Lloyd/acd6309947e01fb2f48ef22d4acf8a8d/raw/088bc6ed4db34d40985af1655e7f7b171fcb3370/gistfile1.txt; 
clear 
echo "INSTALLATION COMPLETE."
echo "PLEASE VISIT YOUR AWS INSTANCE ON THE WEBPAGE"
echo "AND REBOOT. DO NOT REBOOT FROM TERMINAL (known bugs)"
echo "..."
echo "TO ENABLE OPTIMIZED VIM, IN VIM TYPE :PlugInstall"
echo "OUTSIDE OF ANY SELECTION/EDIT MODE"
echo "NOTE: YOU ARE NO LONGER ROOT."

