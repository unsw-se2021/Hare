Feature: Quick Scan
As a guest:

So that I can find information about ingredients in a product

I want to take or upload an image of the ingredients to the site

Scenario: Submit an image of an ingredients list to receive information about each ingredient

GIVEN: I am on the main page
AND: I have not logged in
WHEN: I click an ‘Upload’ or 'Camera' button
THEN: I should be on the camera page, or given the option to select a file
WHEN: I submit an image
THEN: I should be on a page with information about the ingredients in the picture
