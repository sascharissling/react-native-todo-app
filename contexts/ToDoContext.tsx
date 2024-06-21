import { createContext, PropsWithChildren, useContext, useState } from "react";
import uuid from "react-native-uuid";

export interface ToDoContextInterface {
  todos: ToDo[];
  addTodo: (input: string) => void;
  removeTodo: (id: string) => void;
  reactivateTodo: (id: string) => void;
}

export interface ToDo {
  toDo: string;
  id: string;
  deleted?: Date | null;
}

export const ToDoContext = createContext({} as ToDoContextInterface);

export const useToDoContext = () => useContext(ToDoContext);

function ToDoContextProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (input: string) => {
    const newId = uuid.v4() as string;
    setTodos([
      ...todos,
      {
        toDo: input,
        id: newId,
      },
    ]);
  };

  const removeTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      item.deleted = new Date();
      setTodos([...todos]);
    }
  };

  const reactivateTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      item.deleted = null;
      setTodos([...todos]);
    }
  };

  return (
    <ToDoContext.Provider
      value={{ todos, addTodo, removeTodo, reactivateTodo }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoContextProvider;
