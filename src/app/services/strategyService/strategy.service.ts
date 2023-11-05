import { Injectable } from '@angular/core';
import { TodoStrategy } from 'src/app/models/todoStrategy';
import { DataService } from '../dataService/data.service';
import { Todo } from 'src/app/models/todo';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private strategy: TodoStrategy;
  constructor(private dataService: DataService) { }


  setStrategy(strategy: TodoStrategy) {
    this.strategy = strategy;
  }

  applyStrategy(todos: Todo[], newTodo: Todo): void {
    const updatedTodos = this.strategy.apply(todos, newTodo);
    this.dataService.setTodos(updatedTodos);
  }
}
