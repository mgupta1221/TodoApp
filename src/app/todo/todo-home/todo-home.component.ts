  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { Subscription } from 'rxjs';
  import { Todo, TodoFactory } from 'src/app/models/todo';
  import { AddStrategy, EditStrategy } from 'src/app/models/todoStrategy';
  import { DataService } from 'src/app/services/dataService/data.service';
  import { ObserverService } from 'src/app/services/observerService/observer.service';
  import { StrategyService } from 'src/app/services/strategyService/strategy.service';

  @Component({
    selector: 'todo-home',
    templateUrl: './todo-home.component.html',
    styleUrls: ['./todo-home.component.css']
  })
  export class TodoHomeComponent implements OnInit {
    @ViewChild('editModal') editModal: ElementRef;
    todoEditForm: FormGroup;
    todos: Todo[] = [];
    faTrash = faTrash;
    faPen = faPen;
    todoAction = '';
    addStrategy = new AddStrategy();
    editStrategy = new EditStrategy();
    completionSubscription: Subscription;
    totalCompleted: number;
    

    constructor(private dataService: DataService,
      private strategyService: StrategyService,
      private observerService: ObserverService,
      private formBuilder: FormBuilder) {
      this.todoEditForm = this.formBuilder.group({
        id: [''],
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
      
    }

    ngOnInit() {
      // Populating todos via data Service
      // Data is hardcoded but still used service so that it can be extended later to pull data 
      // via Http call, if required
      this.dataService.getTodos().subscribe((data) => {
        this.todos = data;
      });
      this.completionSubscription = this.observerService.getTotalCompletedTodos().subscribe((totalCompleted) => {
        this.totalCompleted = totalCompleted;
      });
    }

    // This method is commonly used to add and edit todos
    onTodoSubmit() {
      const todo = this.todoEditForm.value;

      // Object creation via Factory pattern
      const newTodo: Todo = TodoFactory.createTodo(todo.id,
        todo.title,
        todo.description,
        todo.isCompleted);

      // Using Strategy pattern to situationally Adding and Editing todo item
      if (todo.id == undefined) {
        this.strategyService.setStrategy(this.addStrategy);
        this.strategyService.applyStrategy(this.todos, newTodo);
      }
      else {
        this.strategyService.setStrategy(this.editStrategy);
        this.strategyService.applyStrategy(this.todos, newTodo);
      }
      this.closeModal();
    }

    // Populating modal window with todo to be edited
    openEditModal(todo: any, isEdit: boolean) {
      this.todoAction = isEdit ? 'Edit' : 'Add';
      if (isEdit) {
        this.todoEditForm.patchValue({
          id: todo.id,
          title: todo.title,
          description: todo.description
        });
      }
      else {
        this.todoEditForm.reset();
      }

      this.editModal.nativeElement.style.display = 'block';
    }

    //deleting todo
    deleteTodo(todo: Todo) {
      this.dataService.deleteTodo(todo);
      this.observerService.updateTotalCompleted();
    }

    //Utilising Observer pattern to update total count of 'completed' todos
    markAsCompleted(todoId: number) {
      this.observerService.toggleCompletion(todoId);
    }

    //closing modal window
    closeModal() {
      this.editModal.nativeElement.style.display = 'none';
    }
  }
