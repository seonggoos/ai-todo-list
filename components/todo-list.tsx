"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useTodoStore } from "@/store/todo-store";
import { cn } from "@/lib/utils";
import { EditTodoDialog } from "@/components/edit-todo-dialog";
import { Todo } from "@/types/todo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TodoList() {
  const { toggleTodo, deleteTodo, getFilteredAndSortedTodos } = useTodoStore();
  const [isMounted, setIsMounted] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const todos = getFilteredAndSortedTodos();

  if (!isMounted) {
    return null;
  }

  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "default";
      default:
        return undefined;
    }
  };

  return (
    <>
      <div className="space-y-3">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className="transition-all hover:shadow-md hover:border-primary/20 group"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mt-1 transition-all data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium leading-none mb-1 break-words transition-colors",
                        todo.completed && "line-through text-muted-foreground"
                      )}
                    >
                      {todo.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {todo.dueDate && (
                        <Badge variant="outline" className="text-xs">
                          마감일: {format(new Date(todo.dueDate), "PPP")}
                        </Badge>
                      )}
                      {todo.priority && (
                        <Badge
                          variant={getPriorityColor(todo.priority)}
                          className="text-xs"
                        >
                          {todo.priority === "high" && "높음"}
                          {todo.priority === "medium" && "중간"}
                          {todo.priority === "low" && "낮음"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTodo(todo)}
                    className="hover:bg-secondary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
            <p className="text-muted-foreground mb-2">할 일이 없습니다.</p>
            <p className="text-xs text-muted-foreground">
              새로운 할 일을 추가해보세요!
            </p>
          </div>
        )}
      </div>
      {editingTodo && (
        <EditTodoDialog
          todo={editingTodo}
          open={!!editingTodo}
          onOpenChange={(open) => !open && setEditingTodo(null)}
        />
      )}
    </>
  );
}
