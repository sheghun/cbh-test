# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're
working on a new feature which will generate reports for our client Facilities containing info on how many hours each
Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including
  some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted
  by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability
for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for
them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail
for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free
to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets,
and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your
work.

## Your Breakdown Here

<br />

<small>
The following assumptions are in place:
<ul>
<li>The facilities table has an id column of type integer</li>
<li>The shifts and agents table has a column `facility_id` that points to `facilities.id` to create a relation between the tables</li>
</ul>
</small>

#### Ticket 1

<hr />

| Title              | Update `facilities` table to add a column for custom IDs                                                                      |
|--------------------|:------------------------------------------------------------------------------------------------------------------------------|
| Description        | Write a migration to alter the facilities table to add the column `facility_id` with a type of integer                        |
| Estimated Duration | 10-30 minutes                                                                                                                 |
| QA                 | The migration should have an up function that does the above and a down function that reverts the table to its previous state |

<br />

#### Ticket 2

<hr />

| Title              | Update `agents` and `shifts` table to update the `facility_id` foreign key column                                                                                   |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Description        | Write two migrations to alter the `shifts` and `agents` table to update the `facility_id` foreign key column link from `facilities.id` to `facilities.facility_id`. |
| Estimated Duration | 20minutes - 1hr                                                                                                                                                     |
| QA                 | The migration should have an up function that does the above and a down function that reverts the table to its previous state                                       |

<br />

#### Ticket 3

<hr />

| Title              | Refactor `getShiftsByFacility()` to be called with `facility_id`                                                                                                                                                                   |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Description        | Refactor the function `getShiftsByFacility()` to be called with `facility_id` instead of the facility `id` for stale facilities data that don't have the new `facility_id` property, facility `id` should be used for fallback.    |
| Estimated Duration | 1-3hr                                                                                                                                                                                                                              |
| QA                 | <ul><li>Existing test cases should pass</li> <li>Add new test cases to test for old data that don't have the new `facility_id` property</li> <li>Add new test cases to test for the new data with `facility_id` property</li></ul> |

<br />

#### Ticket 4

| Title              | Refactor `generateReport()` to use  `facility_id`                                                                                                                                                                                            |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Description        | Refactor the function `generateReport()`, it should use `facility_id` when generating reports instead of the facility `id` for old facilities data that don't have the new `facility_id` property, facility `id` should be used for fallback |
| Estimated Duration | 1-4hr                                                                                                                                                                                                                                        |
| QA                 | <ul><li>Existing test cases should pass</li> <li>Add new test cases to test for old data that don't have the new `facility_id` property</li> <li>Add new test cases to test for the new data with `facility_id` property</li></ul>           |


