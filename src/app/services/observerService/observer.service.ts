import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { DataService } from '../dataService/data.service';

@Injectable({
  providedIn: 'root'
})

//This service utitlizes Obserevr pattern to notify the view with total count of completed Todos
export class ObserverService {
  private totalCompletedObj$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  todos: Todo[];
  constructor(private dataService: DataService) {
    this.dataService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.updateTotalCompleted();
    });
  }

  toggleCompletion(todoId: number) {
    const todo = this.todos.find((t) => t.id === todoId);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.updateTotalCompleted(); // Notify observers about the todo's completion status change
    }
  }

  //updating Observer with new Total completed todos count value which is subscribed 
  updateTotalCompleted() {
    const totalCompleted = this.todos.filter((todo) => todo.isCompleted).length;
    this.totalCompletedObj$.next(totalCompleted);
  }

  getTotalCompletedTodos() {
    return this.totalCompletedObj$.asObservable();
  }
}
