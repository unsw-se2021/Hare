Feature: Scan an Uploaded Image
As a member:

So that I can find information about ingredients in a product and categorise them in a useful way

I want to upload an image of the ingredients on a product

Scenario: Upload an image of an ingredients list to receive catagorised information about each ingredient

GIVEN: I am on the main page
AND: I am logged in
WHEN: I click the 'Scan' button
AND: I click the upload icon
THEN: I should be in a file selection window/page
WHEN: I select a picture
AND: I press upload
THEN: I should be on a colour coded page with information about the ingredients in the picture
