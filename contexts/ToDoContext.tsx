import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import uuid from "react-native-uuid";
import { sortTodos } from "@/contexts/helpers/sortTodos";

export interface ToDoContextInterface {
  todos: ToDo[];
  addTodo: (input: string) => void;
  removeTodo: (id: string) => void;
  reactivateTodo: (id: string) => void;
  archiveTodo: (id: string) => void;
}

export interface ToDo {
  toDo: string;
  id: string;
  deleted?: Date | null;
  archived?: Date | null;
}

const mockTodoData = [
  {
    toDo: "Buy milk",
    id: "1",
  },
  {
    toDo: "Buy eggs",
    id: "2",
  },
  {
    toDo: "Buy milk",
    id: "3",
  },
  {
    toDo: "Buy eggs",
    id: "4",
  },
  {
    toDo: "Buy milk",
    id: "5",
  },
  {
    toDo: "Buy eggs",
    id: "6",
  },
  {
    toDo: "Buy milk",
    id: "7",
  },
  {
    toDo: "Buy eggs",
    id: "8",
  },
];

export const ToDoContext = createContext({} as ToDoContextInterface);

export const useToDoContext = () => useContext(ToDoContext);

function ToDoContextProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<ToDo[]>(mockTodoData);
  const [archivedTodos, setArchivedTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    const archived = todos.filter((todo) => todo.archived);
    setArchivedTodos(archived);
  }, [todos]);

  const addTodo = (input: string) => {
    const newId = uuid.v4() as string;
    setTodos([
      {
        toDo: input,
        id: newId,
      },
      ...todos,
    ]);
  };

  const archiveTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    // TODO Finish archive
    if (item) {
      const newTodos = [...todos];
      newTodos[todos.indexOf(item)].archived = new Date();
      setTodos(sortTodos(newTodos));
    }
  };

  const removeTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      const newTodos = [...todos];
      newTodos[todos.indexOf(item)].deleted = new Date();
      setTodos(sortTodos(newTodos));
    }
  };

  const reactivateTodo = (id: string) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      const newTodos = [...todos];
      newTodos[todos.indexOf(item)].deleted = null;
      setTodos(sortTodos(newTodos));
    }
  };

  return (
    <ToDoContext.Provider
      value={{ todos, addTodo, removeTodo, reactivateTodo, archiveTodo }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export default ToDoContextProvider;
