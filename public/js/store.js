// public/js/store.js
import { MOCK_DATA } from "./mock-data.js";

const KEY = "recomendadores_pt_proto_v2";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return structuredClone(MOCK_DATA);
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (_) {}
}

export const store = {
  state: load(),

  reset() {
    this.state = structuredClone(MOCK_DATA);
    save(this.state);
    return this.state;
  },

  getRecommender(handle = "rita-nogueira") {
    return this.state.recommenders[handle] || this.state.recommenders["rita-nogueira"];
  },

  getBusiness(slug = "cafe-oriente") {
    return this.state.businesses[slug] || this.state.businesses["cafe-oriente"];
  },

  listBusinesses() {
    return Object.values(this.state.businesses);
  },

  addRecommendation(handle, { businessSlug, quote }) {
    const rec = this.getRecommender(handle);
    const biz = this.getBusiness(businessSlug);
    if (!rec || !biz || !quote.trim()) return null;

    rec.recommendations.push({
      id: `rec_${Date.now()}`,
      businessSlug: biz.slug,
      businessName: biz.name,
      category: biz.category,
      city: biz.city,
      offerTitle: biz.productShort,
      offerPriceEur: biz.priceEur,
      quote: quote.trim(),
      linkSlug: `${rec.handle}.${biz.slug}`,
      clicks: 0,
      sales: 0,
      earningsEur: 0,
    });
    save(this.state);
    return rec;
  },

  removeRecommendation(handle, id) {
    const rec = this.getRecommender(handle);
    rec.recommendations = rec.recommendations.filter((r) => r.id !== id);
    save(this.state);
  },

  updateLedgerStatus(businessSlug, movementId, nextStatus, refNote = "") {
    const biz = this.getBusiness(businessSlug);
    const item = biz.ledgerMovements.find((m) => m.id === movementId);
    if (!item) return;
    item.status = nextStatus;
    if (nextStatus === "Paga") {
      item.note = `pago hoje${refNote ? ` · ref. ${refNote}` : ""}`;
      item.method = "Liquidada";
    } else if (nextStatus === "Retida") {
      item.note = "confirmada · em janela de reembolso de 30 dias";
    } else if (nextStatus === "Cancelada") {
      item.note = "reembolsada / cancelada";
    }
    save(this.state);
  },
};