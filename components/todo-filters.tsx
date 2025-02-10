"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTodoStore } from "@/store/todo-store";
import type { FilterType, SortType } from "@/types/todo";
import { Filter, SortAsc } from "lucide-react";

export function TodoFilters() {
  const { filter, sortBy, setFilter, setSortBy } = useTodoStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center gap-3 flex-1">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select
          value={filter}
          onValueChange={(value: FilterType) => setFilter(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="필터 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">진행중</SelectItem>
            <SelectItem value="completed">완료됨</SelectItem>
            <SelectItem value="dueClose">마감임박</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 flex-1">
        <SortAsc className="h-4 w-4 text-muted-foreground" />
        <Select
          value={sortBy}
          onValueChange={(value: SortType) => setSortBy(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">생성일</SelectItem>
            <SelectItem value="dueDate">마감일</SelectItem>
            <SelectItem value="priority">우선순위</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
