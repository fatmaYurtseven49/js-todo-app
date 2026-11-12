// LocalStorage işlemleri (veri katmanı)
const KEY = "novatask.tasks.v1";

export function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}
