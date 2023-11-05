import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHomeComponent } from './todo-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from 'src/app/services/dataService/data.service';
import { ObserverService } from 'src/app/services/observerService/observer.service';
import { of } from 'rxjs';

describe('TodoHomeComponent', () => {
  let component: TodoHomeComponent;
  let fixture: ComponentFixture<TodoHomeComponent>;
  let dataService: DataService;
  let observerService: ObserverService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoHomeComponent],
      imports: [ReactiveFormsModule, FontAwesomeModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoHomeComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    observerService = TestBed.inject(ObserverService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate todos on initialization', () => {
    const todos = [
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
    spyOn(dataService, 'getTodos').and.returnValue(of(todos));

    fixture.detectChanges();

    expect(component.todos).toEqual(todos);
  });

  it('should call dataService deleteTodo method when it is called', () => {
    const spy = spyOn(dataService, 'deleteTodo');
    const todo = { id: 1, title: 'First work Anniversary', description: 'Anniversary is on 25 Nov, 2023', isCompleted: false };

    component.deleteTodo(todo);

    expect(spy).toHaveBeenCalledWith(todo);
  });

  it('should update totalCompleted count when markAsCompleted is called', () => {
    const spy = spyOn(observerService, 'toggleCompletion');
    component.markAsCompleted(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should close the modal', () => {
    const todo = { id: 1, title: 'First work Anniversary', description: 'Anniversary is on 25 Nov, 2023', isCompleted: false };
    component.openEditModal(todo, true);

    const modalElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('#editModal');
    component.editModal = { nativeElement: modalElement };
    component.closeModal();
    fixture.detectChanges();
    expect(modalElement.style.display).toBe('none');
  });
});
