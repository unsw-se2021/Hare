# Databasing Spec (Wk5-Wk6)  

## Overview 

At this stage, we know that users must be able to send images up to the server for an OCR analysis, and in return are 
sent back a results page. We also know that users must have access to persistent data in the form of logging in and out. 

To accomodate for this, we must have a system of data storage that allows for images to be stored along with their results,
and user data to be keyed together. 

## Data types 

### User Information
When a user registers with us, an instantiation of a user ID keyed with their authenticaiton information must be made. This
Data will appear as: 

<DT 1 "Registration Data"> 
* A database object ID 
* A user ID number (Originating from database object ID) 
* Username
* Password (Not encrypted for now) 
* Date of account creation (based on when DT1 is made) 

<DT 2 "Profile Data"> 
* Database object ID 
* User ID (inherited from DT1) 
* User account creation date (Inherited from DT1) 
* User email object:
*	Set: true/false
*	email: "their email" 
* Number of saved products 
* List of ID's of DT4's for products scanned and saved 
* ID of DT3 containing ingredient preferences 

<DT 3 "Ingredient Preferences linked to User"> 
* Database object ID 
* User ID (Inherited from DT1/DT2) 
* Default Preference selected: True/False
* List of key-paired substance categories (0, 1, 2, 3, 4, 5, #)
* List of key-pairs of ingredients colours (0 - Blue, 1 - Green, 2 - Yellow, 3 - Orange, 4 - Red, 5 - Purple, #XXXXXX - Custom)

<DT 4 "Product Result Profile"> 
* Database object ID 
* Name: ""
* Date: "" (Generated upon save) 
* List of img srcs: "" (Route) 
* List of DT5's

### Ingredient/Substance Data 

<DT 5 "Ingredient Passive Type">
* Database object ID 
* Ingredient name: "" 
* Ingredient synonyms: "", "", "", "", "", "", ... 
* Description: ""
* Appearances: (long long int) 

<DT 6 "Substance data cache"> (Optional, List is ranked alphabetically by object name) 
* Database object ID 
* List of ingredient triples with appearance numbers: (DT5 object ID, Name: "", Appearances: (long long int)) 

### System logging 

<DT 7 "User database log">
* Database object ID 
* User ID (Inherited from DT1) 
* List of objects in the form of:
*	"FUNCTION" (i.e [STORE] Registering User)
*	Database ID of particular action

## Functional Requirements 

For each of the specified data types, there must be functions in place to INSERT, EDIT, DELETE, GET.
Objects which inherit from another object must be created when the parent is created, with their forms filled. 

Only fields in each type that will be modified more than once should be modifiable in EDIT. If they are 
written to only once, their fields should be filled in INSERT. 

The DELETE function should have logical prompting to prevent de-rooting (I.e deleting a parent user data 
object before children would be indicative of a mistake). If an entire user's profile is to be deleted, there
should be a specific routing to delete children-upwards. 





