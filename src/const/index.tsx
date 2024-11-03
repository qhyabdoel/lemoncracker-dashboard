export const colorHighlight = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    { offset: 0, color: "#4A90E2" }, // Gradient color at top
    { offset: 1, color: "#fff" }, // Gradient color at bottom
  ],
  global: false, // Set to true for global gradient, false for local
};

export const chartTitleList: { [key in ValueKeyProp]: string } = {
  total_interactions: "Total number of interactions",
  average_time_spent: "Average time spent",
  cta_click_count: "Call-to-action (CTA) click count",
  unique_users: "Total number of unique users",
};
