import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, SortType, FilterType } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortType;
  addTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: FilterType) => void;
  setSortBy: (sortBy: SortType) => void;
  getFilteredAndSortedTodos: () => Todo[];
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: "all",
      sortBy: "createdAt",

      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          ),
        })),

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),

      getFilteredAndSortedTodos: () => {
        const state = get();
        let filteredTodos = [...state.todos];

        // 필터링
        switch (state.filter) {
          case "completed":
            filteredTodos = filteredTodos.filter((todo) => todo.completed);
            break;
          case "active":
            filteredTodos = filteredTodos.filter((todo) => !todo.completed);
            break;
          case "dueClose":
            const today = new Date();
            const threeDaysFromNow = new Date(
              today.setDate(today.getDate() + 3)
            );
            filteredTodos = filteredTodos.filter(
              (todo) =>
                todo.dueDate &&
                new Date(todo.dueDate) <= threeDaysFromNow &&
                !todo.completed
            );
            break;
        }

        // 정렬
        return filteredTodos.sort((a, b) => {
          switch (state.sortBy) {
            case "dueDate":
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              );
            case "priority":
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              const aPriority = a.priority ? priorityOrder[a.priority] : 3;
              const bPriority = b.priority ? priorityOrder[b.priority] : 3;
              return aPriority - bPriority;
            default:
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
          }
        });
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
