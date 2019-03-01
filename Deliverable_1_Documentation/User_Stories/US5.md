Feature: Log In
As a member:

So that I can set my own personal preferences, create custom categories and access additional app features

I want to log into the app with my Google account

Scenario: Log In with Google

GIVEN: I am on any page within the web app
AND: I am not logged in
WHEN: I click the 'Log In' button
THEN: I should be on a Google Log In page
WHEN: I correctly enter my credtials
THEN: I should be on the previous page, logged in
