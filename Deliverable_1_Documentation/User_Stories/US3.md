Feature: Scan with Camera
As a Member:

So that I can view categorized information about the usage or purpose of ingredients in a product.

I want to take a picture of the ingredients on a product

Scenario: Take a picture of an ingredients list to receive information about each ingredient

GIVEN: I am on the main page
AND: I am logged in
WHEN: I click the camera icon
THEN: I should be on a camera preview page
WHEN: I take a picture
AND: I confirm the picture I took is the one I want to use
THEN: I should be on a page with information about the ingredients in the picture
