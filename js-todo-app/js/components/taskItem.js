// Tek bir görev satırı bileşeni (DOM güvenli oluşturulur, innerHTML kullanılmaz)
const PRIO_LABEL = { low: "Düşük", medium: "Orta", high: "Yüksek" };

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function createTaskItem(task, { onToggle, onEdit, onDelete }) {
  const li = el("li", `list-group-item task-item d-flex align-items-start${task.done ? " done" : ""}`);

  const check = el("input", "form-check-input mt-2 flex-shrink-0");
  check.type = "checkbox";
  check.checked = task.done;
  check.setAttribute("aria-label", "Tamamlandı olarak işaretle");
  check.addEventListener("change", () => onToggle(task.id));

  const body = el("div", "flex-grow-1");
  const head = el("div", "d-flex flex-wrap align-items-center gap-2");
  head.append(el("span", "title", task.title), el("span", `badge badge-prio-${task.priority}`, PRIO_LABEL[task.priority]));
  body.append(head);

  if (task.description) body.append(el("div", "desc", task.description));
  if (task.due) {
    const today = new Date().toISOString().slice(0, 10);
    const overdue = !task.done && task.due < today;
    body.append(el("small", overdue ? "overdue" : "text-muted", `Son tarih: ${formatDate(task.due)}${overdue ? " (gecikti)" : ""}`));
  }

  const actions = el("div", "btn-group btn-group-sm flex-shrink-0");
  const editBtn = el("button", "btn btn-outline-primary", "Düzenle");
  editBtn.type = "button";
  editBtn.addEventListener("click", () => onEdit(task.id));
  const delBtn = el("button", "btn btn-outline-danger", "Sil");
  delBtn.type = "button";
  delBtn.addEventListener("click", () => onDelete(task.id));
  actions.append(editBtn, delBtn);

  li.append(check, body, actions);
  return li;
}
