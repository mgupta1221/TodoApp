import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Todo } from 'src/app/models/todo';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return todos', () => {
    const expectedTodos: Todo[] = [
      {
        id: 1,
        title: 'First work Anniversary',
        description: 'Anniversary is on 25 Nov, 2023',
        isCompleted: false
      },

      {
        id: 2,
        title: 'Meeting with the team',
        description: 'Get sprint tasks defined, connect with scrum master',
        isCompleted: false
      },

      {
        id: 3,
        title: 'Pay the bills',
        description: 'Pay elctricity and washing bill',
        isCompleted: false
      }
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos).toEqual(expectedTodos);
    });
  });

  it('should add a new todo item', () => {
    const initialTodos: Todo[] = [];
    service.setTodos(initialTodos);

    const newTodo: Todo = { id: 1, title: 'First work Anniversary', description: 'Anniversary is on 25 Nov, 2023', isCompleted: false };
    service.createOrEditTodo(newTodo, 'add');
    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual(newTodo);
    });
  });

  it('should edit an existing todo', (done: DoneFn) => {
    const todos: Todo[] = [
      { id: 1, title: 'First work Anniversary', description: 'Anniversary is on 25 Nov, 2023', isCompleted: false },
      { id: 2, title: 'Meeting with the team', description: 'Get sprint tasks defined, connect with scrum master', isCompleted: false }
    ];

    service.setTodos(todos);

    const updatedTodo: Todo = { id: 1, title: 'Second work Anniversary', description: 'Anniversary is on 25 Nov, 2024', isCompleted: true };

    service.createOrEditTodo(updatedTodo, 'edit');

    service.getTodos().subscribe((updatedTodos) => {
      expect(updatedTodos.length).toBe(2);
      const editedTodo = updatedTodos.find((todo) => todo.id === updatedTodo.id);
      expect(editedTodo).toEqual(updatedTodo);
      done();
    });
  });
});
