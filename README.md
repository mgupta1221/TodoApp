## Installation and execution
The application can be executed by running following two commands 
1)	npm install 
2)	ng serve -o


## Features in the app:
Todo App is created that allows following functionalities:
1)	Create new todos using '+' option on screen 
2)	Edit existing todos 
3)  Delete existing todos
3)	Mark the existing todos as Completed
4)	Show the Completed todos via Strikethrough in the grid
5)	Shows the total number of ‘Completed’ todos

## Comments
The app is duly commented at relevant places to signify what the code is doing

## Design patterns
There are 3 design patterns implemented in this application namely:
1)  Factory pattern  - To create a new todo 
[Refer]  -'onTodoSubmit()' method in todoHome component

2)  Strategy pattern - To decide whether to edit a existing todo, or, add a new todo. Based on the uses selection specific strategy is implemented
[Refer] - Strategy.service.ts in 'Services' folder, 'onTodoSubmit()' method in todoHome component

3)  Observer pattern - Once the user mark any existing todo as completed, the Completed todo count is updated using observer pattern
[Refer] - Observer.service.ts in 'Services' folder, 'markAsCompleted()' method in todoHome component


## Unit testing
There are total 14 test cases are written to provide the full code coverage via unit testing using Jasmine framework the test cases can be found in app component and data service

