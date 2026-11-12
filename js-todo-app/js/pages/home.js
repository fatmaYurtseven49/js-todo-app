// Ana sayfa: Ekle - Listele - Güncelle - Sil akışının tamamı
import { loadTasks, saveTasks } from "../storage.js";
import { createTaskItem } from "../components/taskItem.js";

export function initHomePage() {
  let tasks = loadTasks();
  let filter = "all";
  let query = "";

  const $ = (id) => document.getElementById(id);
  const list = $("task-list");
  const form = $("task-form");
  const editForm = $("edit-form");
  const modal = new bootstrap.Modal($("edit-modal"));

  const persist = () => { saveTasks(tasks); render(); };

  // ---- EKLE (Create)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("task-title").value.trim();
    $("task-title").classList.toggle("is-invalid", !title);
    if (!title) return;
    tasks.unshift({
      id: crypto.randomUUID(),
      title,
      description: $("task-desc").value.trim(),
      priority: $("task-priority").value,
      due: $("task-due").value,
      done: false,
      createdAt: Date.now(),
    });
    form.reset();
    $("task-priority").value = "medium";
    persist();
  });

  // ---- GÜNCELLE (Update)
  const openEdit = (id) => {
    const t = tasks.find((x) => x.id === id);
    if (!t) return;
    $("edit-id").value = t.id;
    $("edit-title").value = t.title;
    $("edit-desc").value = t.description;
    $("edit-priority").value = t.priority;
    $("edit-due").value = t.due;
    $("edit-title").classList.remove("is-invalid");
    modal.show();
  };

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("edit-title").value.trim();
    $("edit-title").classList.toggle("is-invalid", !title);
    if (!title) return;
    const t = tasks.find((x) => x.id === $("edit-id").value);
    if (t) {
      t.title = title;
      t.description = $("edit-desc").value.trim();
      t.priority = $("edit-priority").value;
      t.due = $("edit-due").value;
    }
    modal.hide();
    persist();
  });

  const toggle = (id) => {
    const t = tasks.find((x) => x.id === id);
    if (t) t.done = !t.done;
    persist();
  };

  // ---- SİL (Delete)
  const remove = (id) => {
    const t = tasks.find((x) => x.id === id);
    if (t && confirm(`"${t.title}" görevi silinsin mi?`)) {
      tasks = tasks.filter((x) => x.id !== id);
      persist();
    }
  };

  $("clear-done").addEventListener("click", () => {
    if (tasks.some((t) => t.done) && confirm("Tamamlanan tüm görevler silinsin mi?")) {
      tasks = tasks.filter((t) => !t.done);
      persist();
    }
  });

  // ---- Filtre / arama
  $("filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter;
    document.querySelectorAll("#filters .btn").forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
  $("search").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); render(); });

  // ---- LİSTELE (Read)
  function render() {
    $("count-all").textContent = tasks.length;
    $("count-active").textContent = tasks.filter((t) => !t.done).length;
    $("count-done").textContent = tasks.filter((t) => t.done).length;

    const visible = tasks.filter((t) =>
      (filter === "all" || (filter === "done" ? t.done : !t.done)) &&
      (!query || t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)));

    list.replaceChildren();
    if (!visible.length) {
      const li = document.createElement("li");
      li.className = "list-group-item empty";
      li.textContent = tasks.length ? "Bu filtreyle eşleşen görev yok." : "Henüz görev yok. Yukarıdan ilk görevini ekle!";
      list.append(li);
      return;
    }
    visible.forEach((t) => list.append(createTaskItem(t, { onToggle: toggle, onEdit: openEdit, onDelete: remove })));
  }

  render();
}
