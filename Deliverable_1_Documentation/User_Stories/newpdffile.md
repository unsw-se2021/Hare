# US-1 

>>>>>>>>As a Guest I want to have a Quick Scan of packaging of my desired product with Camera,So that I can find information about ingredients in a product.<<<<<<<<<

**Feature**: Quick Scan of packaging with Camera
**As a** Guest

**So that** I can find information about ingredients in a product

**I want to** take a picture of the ingredients on a product
<hr>

**Scenario:** Take a picture of an ingredients list to receive information about each ingredient  

**GIVEN:** I am on the default landing page  
**AND:** I have not logged in  
**WHEN:** I click the camera icon   
**THEN:** I should be on the camera preview page   
**WHEN:** I take a picture of the packaging information   
**AND:** Confirm the picture I took is the one I want to use   
**THEN:** I see a page with information about the product
    
# US-2 
>>>>>>>>As a Guest I want to have a Quick Scan of packaging of my desired product with Uploaded image of it from my cameraroll, so that I can find information about ingredients in a product.<<<<<<<<<

**Feature:** Quick Scan of packaging with Uploaded image\
**As a** guest  
 
**So that** I can find information about ingredients in a product

**I want to** upload a picture of the ingredients on a product
<hr>

**Scenario:** Upload a picture of an ingredients list to receive 
information about each ingredient\

**GIVEN:** I am on the main page\
**AND:** I have not logged in\
**WHEN:** I click the upload icon\
**THEN:** I should be on a file selection window/page\
**WHEN:** I select an image\
**AND:** I click upload\
**THEN:** I should be on a page with details about the ingredients in the picture  
  

# US-3 

>>>>>>>>>As a Member I want to Scan packaged item with Camera, so that I can view categorized information about the usage or purpose of ingredients in a product.<<<<<<<<<

**Feature:** Scan packaged item with Camera 
As a Member

**So that** I can view categorized information about the usage\ 
or purpose of ingredients in a product.

**I want to** take a picture of the ingredients on a product
<hr> 

**Scenario:** Take a picture of an ingredients list to receive 
information about each ingredient\

**GIVEN:** I am on the default landing page\
**AND:** I am logged in\
**WHEN:** I click the camera icon\
**THEN:** I should be on a camera preview page\
**WHEN:** I take a picture of the packaging\
**AND:** I confirm the picture I took is the one I want to use\
**THEN:** I should be on a page with information about the   
ingredients in the picture

  
# US-4
>>>>>As a member I want to Scan an Uploaded Image of product packaging, so that I can view categorized information about the usage or purpose of ingredients in a product.<<<<<<<
 

**Feature:** Scan an Uploaded Image of product packaging  
**As a** member  
  
**So that** I can view categorized information about the usage   
or purpose of ingredients in a product.  

**I want to** upload an image of the ingredients on a product  
<hr> 

**Scenario:** Upload an image of an ingredients list to receive   
information about each ingredient  

**GIVEN:** I am on the main page  
**AND:** I am logged in  
**WHEN:** I click the upload icon  
**THEN:** I should be in a file selection window/page  
**WHEN:** I select a picture  
**AND:** I press upload  
**THEN:** I should be on a page with information about the   
ingredients in the picture  

# US-5 

>>>>>As a Member I want to be able to Log In to my personal profile, so that I can set my own personal preferences, create   
custom categories of ingredients to highlight and access  
additional app features.<<<<<<<<<<<<

**Feature:** Log In  
**As a** Member  

**So that** I can set my own personal preferences, create   
custom categories of ingredients to highlight and access  
additional app features.  

**I want** to log into the app 
<hr> 

**Scenario:** Log In  

**GIVEN:** I am on any page within the web app  
**AND:** I am not logged in  
**WHEN:** I click the 'Log In' button  
**THEN:** I should be on a Login page  
**WHEN:** I correctly enter my credtials  
**THEN:** I should be on the previous page, logged in  

# US-6 
>>>>>>As a Member I want to be able to log out, so that I can safely leave the Web App.<<<<<<<


**Feature:** Log Out  
**As a** Member  
  
**So that** I can safely leave the Web App  
  
**I want to** log out of the app  
<hr> 
  
**Scenario:** Log Out  
  
**GIVEN:** I am on any page within the web ap  
**AND:** I am logged in  
**WHEN:** I click the 'Settings' button  
**THEN:** I see all of my profile settings and account information  
**WHEN:** I click 'Logout'  
**THEN:** I am taken to the default landing page and am not longer logged in  
  
# US-7 
>>>>>>>>>>As a** Member I want to Select pre-set highlighting preferences for ingredients, so that I can easily identifiy ingredients of common preferences.

**Feature:** Select pre-set highlighting preferences for ingredients  
**As a** Member  
  
**So that** I can easily identifiy ingredients of common preferences  
  
**I want to** choose a pre-set to highlight these ingredients  
<hr> 
  
**Scenario:** Select a pre-set in my ingredients preferences  
  
**GIVEN:** I am logged in  
**AND:** I am on the 'settings' page  
**WHEN:** I click the 'highlighting' drop-down menu  
**AND:** Select a preference from the group of pre-defined settings  
**THEN:** Future ingredient scans should colour code certain ingredients  
  
# US-8
As a Member I want to be able to Define custome highlighting rules for viewing ingredients, so that I can easily identifiy ingredients.

 
**Feature:** Define custome highlighting rules for viewing ingredients  
**As a** Member  

**So that** I can easily identifiy ingredients  

**I want to** create a pre-set to highlight chosen ingredients or ingredient categories  
<hr>
  
**Scenario:** Create a highlighting rule set in my preferences  
  
**GIVEN:** I am logged in  
**AND:** I am on the settings page  
**AND:** I have opened the 'highlighting' drop-down menu  
**WHEN:** I click "Create new highlighting rules"  
**THEN:** I should be on a 'custom highlighting' page  
**WHEN:** I give my pre-set a name  
**AND:** I Assign colours to ingredients and/or ingredient categories  
**AND:** I press save  
**THEN:** I should be on the settings page with the 'highlighting drop-down open  
**AND:** My new pre-set should be selected  
  
# US-9 
As a** Member I want to Compare the ingredients of two packaged items, so that can make a well-informed decision about which product to buy. 
  
**Feature:** Compare the ingredients of two packaged items  
**As a** Member  
  
**So that** I can make a well-informed decision about which product to buy  
  
**I want to** obtain a side-by-side comparison of the ingredients list of two chosen products  
<hr>  
  
**Scenario:** Chose two products to receive a detailed description and an ingredients list of both products for comparison  
  
**GIVEN:** I am on the default landing page   
**AND:** I am logged in   
**AND:** I have scanned, then saved, at least two items  
**WHEN:** I click the "compare" menu item
**THEN:** A drop-down modal appears with items I have saved
**WHEN:** I select two items from the modal
**THEN:** I see a page with a side-by-side comparison of the two items. 
# US-10
Feature: Translate ingredients list from a foreign language to english As a member

So that I can find information about ingredients written in a langauge I do not understand

I want to view ingredients on a product in english

Scenario: Translate a products ingredients list from a foreign langauge to english 

GIVEN: I am on the main page
AND: I have logged in
WHEN: I click an ‘Upload’ or 'Camera' button
THEN: I should be on the camera page, or given the option to select a file
WHEN: I submit an image with text in a foreign language
THEN: I should be on a page with information about the ingredients on the picture in english
