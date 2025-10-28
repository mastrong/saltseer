import { BASE_URL, ENDPOINTS } from "../config.js";

export function drawStatusTimeline(Plot) {
  Promise.all([
    fetch(BASE_URL + ENDPOINTS.db).then(r => r.json()),
    fetch(BASE_URL + ENDPOINTS.master).then(r => r.json()),
  ]).then(([dbData, masterData]) => {
    const chart = Plot.plot({
      height: 200,
      x: { type: "utc", label: "Time →" },
      y: { domain: [0, 1], label: "Reachable (1 / 0)" },
      marks: [
        Plot.lineY(dbData, { x: "timestamp", y: "success", stroke: "#137547", title: "Database" }),
        Plot.lineY(masterData, { x: "timestamp", y: "success", stroke: "#3CBB75", title: "Salt Master" }),
      ],
    });
    document.getElementById("statusTimeline").append(chart);
  });
}
