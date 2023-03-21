# GlenAddressBook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.

## INTERVIEW TEST

This project was completed as part of a previous interview test for a senior Angular position, I spent 4 hours completing it and decided to keep it on my github profile for future interviewers' visibility. The requirements for the test were as below:

## TEST REQUIREMENTS
Use Angular or React framework
● You must make use of the RXJS library.
● Support from zero to a “large number” of entries.
● Store address entries in memory
● Entries should contain:
○ A first and last name.
○ An optional phone number.
● Provide functionality to:
○ Add an entry.
○ Remove an entry.
○ Retrieve entries in alphabetical order, sorted by first name.
○ Retrieve entries in alphabetical order, sorted by last name.
○ Retrieve entries whose first or last name exactly or partially match a supplied search string,
from the beginning of the name (e.g. searching for “Dan” would match any entries with
“Daniel” as well as any “Dan”).
■ Make this matching case insensitive.
● Provide a unit test for at least one component

## Issues
My goal was to complete the test within the alloted time, I focused on my use of RxJS and Jasmine unit testing.
- Ideally pagination would be a separate component, I built a resuable component for a personal project but did not think it fair to reuse in a time-gated test.
- The mock data request (getAddresses) is not unsubscribed to, as this would normally be an HTTP request which would auto-unsubscirbe, however in this scenario it is just an of()'d array and so should really be unsubscribed to.
