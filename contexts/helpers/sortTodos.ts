import { ToDo } from "@/contexts/ToDoContext";

export const sortTodos = (todos: ToDo[]) =>
  todos.sort((a, b) => {
    if (a.deleted && b.deleted) {
      return 0;
    }
    if (a.deleted) {
      return 1;
    }
    if (b.deleted) {
      return -1;
    }
    return 0;
  });
