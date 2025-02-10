import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface ParsedTodo {
  title: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

export async function parseTodoFromText(text: string): Promise<ParsedTodo> {
  const prompt = `
사용자의 자연어 입력을 Todo 항목으로 변환해주세요.
날짜는 반드시 YYYY-MM-DD 형식으로 반환해주세요 (예: 2024-02-10).
다음 형식의 JSON으로 응답해주세요:
{
  "title": "할 일 제목",
  "dueDate": "YYYY-MM-DD" (선택, 언급된 경우만),
  "priority": "low" | "medium" | "high" (문맥에 따라 판단)
}

예시:
입력: "내일까지 보고서 작성"
출력: {
  "title": "보고서 작성",
  "dueDate": "2024-02-11",
  "priority": "medium"
}

입력: "${text}"
`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const todoData = JSON.parse(response.text());

  return {
    title: todoData.title,
    dueDate: todoData.dueDate,
    priority: todoData.priority,
  };
}
