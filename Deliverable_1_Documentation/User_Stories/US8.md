Feature: Select define custom colour code methods for categorising ingredients
As a member:

So that I can easily identifiy hazardous or other ingredients

I want to create a pre-set to highlight chosen ingredients or ingredient categories

Scenario: Create a colour code pre-set in my preferences

GIVEN: I am logged in
AND: I am on the preferences page
WHEN: I click "Create Category Pre-Set"
THEN: I should be on a category creation page
WHEN: I give my pre-set a name
AND: I Assign colours to ingredients and/or ingredient categories
AND: I press save
THEN: I should be on the preferences page
AND: My new pre-set should be selected
