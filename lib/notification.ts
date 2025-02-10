import { Todo } from "@/types/todo";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export function scheduleNotification(todo: Todo) {
  if (!todo.notifyAt || !("Notification" in window)) return;

  const notifyTime = new Date(todo.notifyAt).getTime();
  const now = new Date().getTime();
  const timeUntilNotification = notifyTime - now;

  if (timeUntilNotification <= 0) return;

  setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("할 일 알림", {
        body: `${todo.title}${
          todo.dueDate
            ? ` - 마감일: ${new Date(todo.dueDate).toLocaleDateString()}`
            : ""
        }`,
      });
    }
  }, timeUntilNotification);
}
