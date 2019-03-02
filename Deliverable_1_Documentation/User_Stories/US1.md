Feature: Quick Scan with Camera
As a Guest:

So that I can find information about ingredients in a product

I want to take a picture of the ingredients on a product


Scenario: Take a picture of an ingredients list to receive information about each ingredient

GIVEN: I am on the main page
AND: I have not logged in
WHEN: I click the camera icon
THEN: I should be on the camera preview page
WHEN: I take a picture
AND: Confirm the picture I took is the one I want to use
THEN: I should be on a page with details about the ingredients in the picture
