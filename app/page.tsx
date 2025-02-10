import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";
import { TodoFilters } from "@/components/todo-filters";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-3xl p-4 py-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            할 일 목록
          </h1>
          <p className="text-muted-foreground">
            할 일을 추가하고 관리할 수 있습니다.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm space-y-6">
          <TodoFilters />
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </main>
  );
}
