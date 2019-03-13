# How to add your AWS server to your Github permissions list

To set up your AWS Server so that you can clone and push the git repository for this project, you will need to generate an SSH key, add it to your ~/.ssh directory, then match that on github by adding it to your profile. In more detail: 

## Generating an SSH key: 
  
First, move into the directory in which you would like to store you SSH key. For our purposes, this will be inside of `~/.ssh`. You can navigate to this folder by running the command:  

```
cd ~/.ssh
``` 
   
Next, we want to create a file that will contain the SSH key, public and private. To do this, run the command:   
```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" 
```  
  
Make sure to replace the `your_email@example.com` with the email that you have registered with on GitHub.   

It may ask you to specify a name for the file. Here, we will be calling it `github_key`, but you may name it something different and replace all instances of `github_key` in the rest of this guide with your custom naming.  

You may also be prompted with the following:   
```
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```    
  
If you would like to enter a password to enter every time you use Git (to stop other people or services) you may, although if you are the only person with access to your AWS it may be easier to ignore this by pressing enter.   
  
## Adding the SSH key to your AWS SSH-Agent: 

To add the key you have generated to your ssh keychain, you will need to first start an ssh-agent process. Ssh-agent is responsible for managing your keychain. You may need to run this again in the future if you have troubles with publickey authentication.   

To start the ssh-agent, type:  
```
eval "$(ssh-agent -s)"
``` 
   
You may will get a response in the form of `Agent pid XXXXX` if this is successful.   

Now that ssh-agent is running in the background, run the ssh-add command:   
```
ssh-add ~/.ssh/github_key
```
    
You have successfully added your generated SSH key to your keychain if you have not recieved any issues by this point. 
   
## Registering your SSH key with Github: 
   
To register the SSH key you have just registered with your GitHub account, you will need to be ready to copy the contents of `github_key.pub`. To have the contents of this displayed in standard output on your terminal, type:   
```
cat github_key.pub
```
  
From here, copy the contents of this into your clipboard, and open your GitHub profile on your internet browser. Navigate to your "settings" then "SSH and GPG Keys".  
  
Click the green button that says "New SSH Key". You will be presented with a screen that looks like:   
![SSH page screen](https://help.github.com/assets/images/help/settings/ssh-key-paste.png)   
  
In the largest box, paste the contents of `github_key.pub`, and at the top where you are asked for a "Title" give it a custom name that you will recognize. If you have done all of this without an error, you have now added your SSH key to your GitHub, and you will be able to clone repositories on your AWS server. 
  
## Setting your username and email with Git
  
You may find that when you try to run the command `git push` you are met with the following error message: 
```
>Warning: Permanently added the RSA host key for IP address 'XXX.XXX.XXX.XXX' to the list of known hosts.
>git@github.com: Permission denied (publickey).
>fatal: Could not read from remote repository.

>Please make sure you have the correct access rights
>and the repository exists.
```
  
To be able to push to the git repository, you will need to set your Username and your Email to your git configuration. To do this, we can make use of the command `git config` or (read further) for a more detailed configuration method using the `~/.gitconfig` file. 
  
To set your github username, type:   
```
git config --global user.name "Your-User-Name"
```
   
Replace Your-User-Name with the username that you have registered on GitHub. 
  
To set your github email, type:   
```
git config --global user.email "you@your-email.com"
```
   
Replace you@your-email.com with the email that you registered with on GitHub. *If you recieve no error messages, you are done and can close this guide*   
  
If none of the above methods are successful, you may want to make sure that your `~/.gitconfig` file matches your username and email. It should look something like this:   
```
[user]
	name = Michael-Lloyd
	email = michaelwoodgerlloyd@gmail.com
```
   
Where in this case, these are the details I have used for my git configuration. If yours does not have a set name and email, you may want to replicate it by filling in the fields. 
  
  
