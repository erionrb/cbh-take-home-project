# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Estimation Effort
1, 2, 3 ,5 ,8, 13
From 8 - 13 maybe could ne break it down to more tickets to reduce complexity

Ticket-1
name: Custom id relationship table
description:
    A table named custom_agent_id should be created with the following columns:
    custom_id varchar[256]
    agent_id  varchar[256]
    The columns should ne a composed primary key and the agent_id should be a foreing key to internal table id
OBS: Please take a look ate the tables and figure out wich one is the agent_id related one.
Effort - 3

Ticket-2
name: Refactoring report search on agents
description:
    Look in the code for functions that make use of legacy angent id and refactore it to accomodate the new table custom_agent_id.
    For any agent_id that does not has a equivalent custom_id return appropriate error when custom id has been requested by user.
    Also enable user to generate the report using the new custom_id when available.
    Make sure that the functions `getShiftsByFacility` and `generateReport` are also covered.
Effort - 5