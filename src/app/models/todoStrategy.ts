import { Todo } from "./todo";

export interface TodoStrategy {
    apply(todos: Todo[], newTodo: Todo): Todo[];
}

export class AddStrategy implements TodoStrategy {
    apply(todos: Todo[], newTodo: Todo): Todo[] {
        newTodo.id = Math.max(todos.length + 1, todos[todos.length - 1].id + 1);
        return [...todos, newTodo];
    }
}

export class EditStrategy implements TodoStrategy {
    apply(todos: Todo[], editTodo: Todo): Todo[] {
        const idx = todos.findIndex((todo) => todo.id === editTodo.id);
        if (idx !== -1) {
            todos[idx] = editTodo;
        }
        return todos;
    }
}