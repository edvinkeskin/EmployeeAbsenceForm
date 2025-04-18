# EmployeeAbsenceForm

## Setup
Pre-reqs

- Python
- NodeJS

For backend install the necessary libraries via

`cd my-app/src/api` (from project root)

`pip install -r requirements.txt`

alt `python -m pip install -r requirements.txt`

For frontend install the necessary libraries via

`cd my-app (from project root)`

`npm install`

## Running the project
To run the backend

`cd my-app/src/api` (from project root)

`uvicorn main:app --reload --port 8000`

To run the frontend

`next dev --turbopack`

~or~

`next build`

`next start`

Please let me know if there are any issues with running, I made use of the scripts in `package.json`

## Project Introduction and Features
This project intends to record and act as an user input platform for employee absences.

The following libraries/frameworks have been used
- React
- Next
- FastAPI
- MUI
- and more

The following features have been implemented
- Employee name input (via dropdown)
- Absence start date input
- Absence end date input
- File upload input
- User Interface validation for all fields
  - make sure an employee is picked
  - make sure an start date is picked
  - make sure an end date is picked
  - make sure an file is uploaded
- UI for which files have been selected 
  - and options to remove it
- toast/alert for when a submission is made (or rejected)
- API routes for POST and GET (list and unique retrival)

## Future steps for this project
This project could be expanded much more. For example,
- Add a database
- Setup a Docker environment to handle containerization
- Page for viewing the uploaded forms
- more rigorous backend validation for API parameters
- API route for deleting forms
- Switching the dropdown menu into something that's more extensive (and not static data)

## Known Issues
Google Analytics Opt-out Add-on extension throws a hydration error (not a unique issue to this project)