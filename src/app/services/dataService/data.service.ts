import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Todo } from '../../models/todo'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataOb$: BehaviorSubject<Array<Todo>> = new BehaviorSubject<Array<Todo>>([]);
  todos: Todo[] = [];
  
  constructor() {
    this.todos = [
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
    this.dataOb$.next(this.todos);
  }

  getTodos(): Observable<Todo[]> {
    return this.dataOb$.asObservable();
  }

  setTodos(todos: Todo[]): void {
    this.todos = todos;
    this.dataOb$.next(todos);
  }

  createOrEditTodo(newTodo: Todo, action: string): void {
    if (action == 'add') {
      this.todos.push(newTodo);
    }
    else {
      var idx = this.todos.findIndex((x: Todo) => x.id == newTodo.id);
      this.todos[idx] = newTodo;
    }
    this.dataOb$.next(this.todos);
    console.log(this.todos);
  }

  deleteTodo(todo: Todo): void {

    var idx = this.todos.findIndex((x: Todo) => x.id == todo.id);
    this.todos.splice(idx, 1);
  }
 
}
