---
lang: en-US
title: Testing Reference
description: Reference for adding tests to SODA
head:
    - - meta
    - name: og:image
      content: 'https://kalai.fairdataihub.org/api/generate?app=soda-for-sparc&title=Build%20%7C%20SODA%20for%20SPARC&org=fairdataihub&description=How%20to%20build%20SODA%20for%20SPARC'
---

# Overview 

This document should be used as a reference to be referred to when adding tests to SODA for SPARC.   


# Table of contents 

- Testing tools  

- Testing Outlook 

- Test organization  

- Adding front end tests to SODA 

- Vanilla JS tests 

- React tests  

- Adding back end tests to SODA 

- Python tests  

 
# Testing Tools 

## Front end testing tools: 

- Jest 

- @testing-library/react  

- React-test-renderer 

- Storybook  

## Back end testing tools: 

- Pytest (current) 

- Postman (legacy) 

- CI/CD Pipeline 

- Github Actions 

- Static Analysis 

- Sonarcloud 

- Sourcery 

- Add the ones from latest JOSS response too 

 

# Testing Outlook 

## Front end 

- The primary goal of testing the front end of SODA is to test user-initiated workflows via integration testing.  

- This will include a primary emphasis on front to back end flows but also the flows between these steps when there are greater amounts of variables to test for particularly complex components connecting these systems. 

- To best accomplish these goals focus on these kinds of tests in this order: 

## Integration tests 

- Snapshot tests  

- Unit tests 

- E2E tests 

- Would be higher but E2E tests can take long to write and so we prefer the other testing types 

Back end 

The primary goal of testing the back end of SODA is to test each endpoints workflow.  

To best accomplish these goals focus on these kinds of tests in this order: 

Integration tests 

Unit tests 

Test organization 

Front end tests 

Place front end integration tests inside of src/renderer/tests/workflowName 

Place front end tests for Snapshot React components in a test.jsx file within the component’s folder. 

Place front end tests for unit tests similarly  

Back end  

Add a test folder at the src/pyflask root with test as a prefix and the module you will test as a suffix. E.g., test_manage_datasets 

Within the folder create an __init__.py file 

Create test_module_name.py file 

Within the file create a test class ‘TestModuleName’ and define the tests there 

Adding front end tests to SODA 

Integration tests 

Vanilla Integration Tests not connected to React/Zoostand 

Mock any api requests if they are involved so no requests get sent to Pennsieve  

Import any functions/components involved in the test ( globals might make this hard )  

Example: 

Link to example here:  

Vanilla Integration Tests connected to React/Zoostand  

Set up a new version of Zoostand for each test  

Mock any api requests if they are involved so no requests get sent to Pennsieve 

Import any components involved in the test  

Example: 

Link to example here:  

Snapshot: 

When to bother: 

For a heavy use component e.g., account cards 

How to: 

Import react-test-renderer 

Import @tesing-library/react           

Example: React Snapshot Test 

Unit test (vanilla JS): 

When to bother: 

When a worfklow or component relies upon a particularly complex algorithm that you want to test more thoroughly than time would allow for integration tests 

How to: 

Example: Vanilla JS Unit Test 

Unit test (React): 

When to bother: 

Same as for when to write a unit test for vanliaa js 

How to: 

Example: Unit test example 

Adding back end tests to SODA 

Integration tests 

Example: Test gathering local files and folders count 

Unit tests 

These would be the same setup as for the above integration test s