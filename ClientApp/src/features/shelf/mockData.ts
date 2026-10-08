export const beans = [
  { id: 1, roaster: "Friedhats", name: "Kii AA", origin: "Kenya", roastLevel: "light", freshnessWeeks: 6, createdAt: "2026-08-18T10:00:00Z" },
  { id: 2, roaster: "Bonanza Coffee", name: "El Paraiso Lychee", origin: "Colombia", roastLevel: "light", freshnessWeeks: 5, createdAt: "2026-09-23T09:30:00Z" },
  { id: 3, roaster: "Manhattan Coffee Roasters", name: "Gesha Village Oma Lot 74", origin: "Ethiopia", roastLevel: "light", freshnessWeeks: 8, createdAt: "2026-06-08T14:15:00Z" },
  { id: 4, roaster: "Lot61", name: "Santa Barbara", origin: "Honduras", roastLevel: "medium", freshnessWeeks: 6, createdAt: "2026-08-22T11:45:00Z" },
  { id: 5, roaster: "Coffee Collective", name: "Daterra Sweet Collection", origin: "Brazil", roastLevel: "medium", freshnessWeeks: 7, createdAt: "2026-06-27T08:20:00Z" },
  { id: 6, roaster: "Toby's Estate", name: "Sumatra Lintong", origin: "Indonesia", roastLevel: "dark", freshnessWeeks: 4, createdAt: "2026-04-28T16:00:00Z" },
  { id: 7, roaster: "Square Mile", name: "Red Brick Espresso", origin: "Brazil, Colombia, Ethiopia", roastLevel: "medium", freshnessWeeks: 6, createdAt: "2026-09-28T13:10:00Z" },
  { id: 8, roaster: "La Cabra", name: "Finca El Diviso Pink Bourbon Anaerobic Natural Extended Fermentation Microlot No. 7 – Huila Highlands Selection", origin: "Colombia", roastLevel: "light", freshnessWeeks: 6, createdAt: "2026-08-24T15:40:00Z" },
];

export const bags = [
  { id: 1, beanId: 1, holderId: 1, grams: 250, arrivalDate: "2026-09-20", finished: false, createdAt: "2026-09-20T17:05:00Z" },
  { id: 2, beanId: 3, holderId: 1, grams: 100, arrivalDate: "2026-08-12", finished: false, createdAt: "2026-08-12T18:30:00Z" },
  { id: 3, beanId: 6, holderId: 1, grams: 250, arrivalDate: "2026-05-02", finished: true, createdAt: "2026-05-02T12:00:00Z" },
  { id: 4, beanId: 7, holderId: 1, grams: 1000, arrivalDate: "2026-09-30", finished: false, createdAt: "2026-09-30T16:45:00Z" },
  { id: 5, beanId: 8, holderId: 1, grams: 200, arrivalDate: "2026-08-26", finished: false, createdAt: "2026-08-26T19:15:00Z" },
  { id: 6, beanId: 2, holderId: 2, grams: 250, arrivalDate: "2026-09-25", finished: false, createdAt: "2026-09-25T10:20:00Z" },
  { id: 7, beanId: 5, holderId: 2, grams: 500, arrivalDate: "2026-07-01", finished: true, createdAt: "2026-07-01T09:00:00Z" },
  { id: 8, beanId: 4, holderId: 2, grams: 250, arrivalDate: "2026-08-25", finished: false, createdAt: "2026-08-25T14:35:00Z" },
  { id: 9, beanId: 1, holderId: 3, grams: 250, arrivalDate: "2026-08-20", finished: false, createdAt: "2026-08-20T11:50:00Z" },
  { id: 10, beanId: 6, holderId: 3, grams: 250, arrivalDate: "2026-09-28", finished: false, createdAt: "2026-09-28T17:40:00Z" },
  { id: 11, beanId: 3, holderId: 4, grams: 100, arrivalDate: "2026-06-10", finished: false, createdAt: "2026-06-10T13:25:00Z" },
  { id: 12, beanId: 5, holderId: 4, grams: 250, arrivalDate: "2026-10-02", finished: false, createdAt: "2026-10-02T18:00:00Z" },
];

export const brewingNotes = [
  { id: 1, bagId: 1, writerId: 1, method: "V60", doseGrams: 15, grind: "medium-fine", result: "Bright blackcurrant and tomato acidity, very juicy.", isReference: true, createdAt: "2026-09-22T08:15:00Z" },
  { id: 2, bagId: 2, writerId: 1, method: "V60", doseGrams: 12, grind: "medium-fine", result: "Delicate jasmine and bergamot, best at 93°C.", isReference: false, createdAt: "2026-08-16T07:40:00Z" },
  { id: 3, bagId: 3, writerId: 1, method: "frenchPress", doseGrams: 30, grind: "coarse", result: "Heavy body with earthy cedar notes, a bit flat by now.", isReference: false, createdAt: "2026-05-06T19:20:00Z" },
  { id: 4, bagId: 11, writerId: 4, method: "V60", doseGrams: 12, grind: "medium-fine", result: "Florals have mostly faded, now quite tea-like.", isReference: false, createdAt: "2026-08-28T09:05:00Z" },
  { id: 5, bagId: 4, writerId: 1, method: "espresso", doseGrams: 18, grind: "fine", result: "Milk chocolate and hazelnut, great in a flat white.", isReference: false, createdAt: "2026-10-01T07:30:00Z" },
  { id: 6, bagId: 4, writerId: 1, method: "V60", doseGrams: 15, grind: "medium", result: "Surprisingly sweet as filter, but a little muted.", isReference: false, createdAt: "2026-10-03T10:10:00Z" },
  { id: 7, bagId: 4, writerId: 1, method: "aeropress", doseGrams: 16, grind: "medium-fine", result: "Caramel sweetness, inverted method works best.", isReference: false, createdAt: "2026-10-06T14:45:00Z" },
  { id: 8, bagId: 5, writerId: 1, method: "V60", doseGrams: 14, grind: "medium-fine", result: "Strawberry and rose, intense but slightly boozy.", isReference: false, createdAt: "2026-09-02T08:00:00Z" },
  { id: 9, bagId: 6, writerId: 2, method: "aeropress", doseGrams: 15, grind: "fine", result: "Lychee sweetness comes through clearly, very clean cup.", isReference: true, createdAt: "2026-09-27T12:30:00Z" },
  { id: 10, bagId: 8, writerId: 2, method: "V60", doseGrams: 15, grind: "medium", result: "Stone fruit and brown sugar with a clean finish.", isReference: false, createdAt: "2026-09-01T07:55:00Z" },
  { id: 11, bagId: 9, writerId: 3, method: "V60", doseGrams: 15, grind: "medium-fine", result: "Grapefruit acidity has softened, still pleasant.", isReference: false, createdAt: "2026-08-24T18:10:00Z" },
  { id: 12, bagId: 10, writerId: 3, method: "espresso", doseGrams: 18, grind: "fine", result: "Dark chocolate and spice, low acidity, thick crema.", isReference: true, createdAt: "2026-09-30T09:20:00Z" },
];

export type Bean = (typeof beans)[number];
export type Bag = (typeof bags)[number];
export type BrewingNote = (typeof brewingNotes)[number];