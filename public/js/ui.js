// public/js/ui.js
export function formatEur(value) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function showToast(msg) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove("is-visible"), 2600);
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`Link copiado: ${text}`);
  } catch (_) {
    showToast(text);
  }
}

export function statusBadgeClass(status) {
  const map = {
    "Pendente": "badge-pendente",
    "Retida": "badge-retida",
    "A pagar": "badge-apagar",
    "Paga": "badge-paga",
    "Cancelada": "badge-pendente",
  };
  return map[status] || "badge-pendente";
}