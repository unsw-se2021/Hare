Feature: Scan an Uploaded Image
As a member:

So that I can view categorized information about the usage or purpose of ingredients in a product.

I want to upload an image of the ingredients on a product

Scenario: Upload an image of an ingredients list to receive information about each ingredient

GIVEN: I am on the main page
AND: I am logged in
WHEN: I click the upload icon
THEN: I should be in a file selection window/page
WHEN: I select a picture
AND: I press upload
THEN: I should be on a page with information about the ingredients in the picture
