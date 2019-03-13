# Permission Issues on AWS files 
  
When working on AWS, you may frequently encounter issues in which a command is unsuccessful because you lack permission. This is typically caused by the normal "ubuntu" user not having access rights to something that root may have. When the command `sudo -s` is run, your user is changed to `root` which you can see reflected in your bash shell, as your user changes from `ubuntu@` to `root@`.   
  
Note: To return to `ubuntu` as a user, you type `exit`, but if you type `exit` as `ubuntu` you will close your SSH connection with AWS. 
    
## Determining the cause of the permission issue 
  
To determine what can be done to solve a permissions issue, you will need to determine if it is because:  
* No user, including root, is able to use the file
* The file has been given permissions for execution, reading, or writing 
* The file has been given permissions for the root, but not the user
* The file has been given permission for the user, but not the root user 
   
A classic error I have encountered while working on AWS is the following:    
```
root@ip-XXX-XXX-XXX-XXX:~/Hare/Guides# git pull
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
  
This is caused by the fact that when our github ssh key was registered, we did it only under the permissions of users.  
Return to the standard user with `exit` if you are `root`.   
   
## Using chmod 
  
If you encounter the permission message:   
```
-bash: a1.png: Permission denied 
```
This means that the current user has not been given permissions to access the file. You can overcome this by using the command `chmod` which modifies permissions on the file.   
   
To set access for all users (warning, dangerous) the command `chmod a+wrx <filename>` will give all (`a`) users `+w` write, `+r` read, and `+x` execute priviledges. To change permissions for only one user, refer to the following permissions groups:   
```
Identities:
a		"All"
u		"User with ownership (see chown)" 
g		"Group which user belongs to" 
o		"Others (not user or user's owner)"

Permission Types:
r		"Read, allows users to open and read content"
w		"Write, allows users to modify files" 
x		"Executive, allows users to run files as programs"

Operators 
+		"Add, union-add permissions to user group" 
-		"Minus, selective-remove permissions from user group" 
=		"Select/AND, make the only permissions for user group"
```
  
## Using chown
   
One error you might encounter on AWS is that no user has permissions to `git pull`. The error message may appear as: 
```
error: unable to create file <File you are trying to git pull>: Permission denied
```
   
And this can be solved by giving the user `ubuntu` ownership permissions to the entire `.git` directory in the repository. Type:   
```
chown ubuntu:root -R Hare/*
```
   
This will give root and the ubuntu user complete permissions to all of the files and folders inside of the repository. 

