Feature: Scan with Camera
As a member:

So that I can find information about ingredients in a product and categorise them in a useful way

I want to take a picture of the ingredients on a product

Scenario: Take a picture of an ingredients list to receive catagorised information about each ingredient

GIVEN: I am on the main page
AND: I am logged in
WHEN: I click the 'Scan' button
AND: I click the camera icon
THEN: I should be on a camera preview page
WHEN: I take a picture
AND: I confirm the picture I took is the one I want to use
THEN: I should be on a colour coded page with information about the ingredients in the picture
