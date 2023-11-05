export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
}

export class TodoFactory {
    static createTodo(id: number,
        title: string,
        description: string,
        isCompleted: boolean): Todo {
        return {
            id,
            title,
            description,
            isCompleted
        };
    }
}
