"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseTodoFromText } from "@/lib/gemini";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/store/todo-store";

interface AiTodoInputProps {
  className?: string;
}

export function AiTodoInput({ className }: AiTodoInputProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAiConvert = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const parsedTodo = await parseTodoFromText(text);
      addTodo({
        title: parsedTodo.title,
        completed: false,
        dueDate: parsedTodo.dueDate,
        priority: parsedTodo.priority,
      });
      setText("");
    } catch (error) {
      console.error("AI 파싱 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="자연어로 할 일을 입력하세요 (예: 내일까지 보고서 작성)"
        className="pr-24"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAiConvert();
          }
        }}
      />
      <Button
        type="button"
        size="sm"
        disabled={isLoading}
        className="absolute right-1 top-1 h-7"
        onClick={handleAiConvert}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        AI 변환
      </Button>
    </div>
  );
}
