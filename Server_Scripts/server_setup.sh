#!/bin/bash

sudo -s
echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Installing GNU tools & Ubuntu runtime packages..."
echo "================================================="
echo "================================================="
echo "================================================="
apt-get install build-essential
apt-get install curl
apt-get install git 
apt-get install default-jre
apt-get install nginx 
apt-get install php 
apt-get update
apt-get upgrade
apt-get install grunt 
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
apt-get install nodejs 
npm install -g create-react-app
npm install -g node-inspector 
npm install -g gulp 
npm i -g eslint 
clear
echo "================================================="
echo "================================================="
echo "================================================="
echo "================================================="
echo "Creating vimrc and pluginstall files..."
echo "================================================="
echo "================================================="
echo "================================================="
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
wget -O ~/.vimrc https://gist.githubusercontent.com/Michael-Lloyd/acd6309947e01fb2f48ef22d4acf8a8d/raw/088bc6ed4db34d40985af1655e7f7b171fcb3370/gistfile1.txt; 
clear 
echo "INSTALLATION COMPLETE."
echo "PLEASE VISIT YOUR AWS INSTANCE ON THE WEBPAGE"
echo "AND REBOOT. DO NOT REBOOT FROM TERMINAL (known bugs)"
echo "..."
echo "TO ENABLE OPTIMIZED VIM, IN VIM TYPE :PlugInstall"
echo "OUTSIDE OF ANY SELECTION/EDIT MODE"

