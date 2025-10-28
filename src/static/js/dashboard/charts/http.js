import { BASE_URL, ENDPOINTS, colors } from "../config.js";

export function drawHttpChart(Plot) {
  fetch(BASE_URL + ENDPOINTS.http)
    .then(r => r.json())
    .then(data => {
      const chart = Plot.plot({
        color: { legend: true, range: colors.sender },
        x: { label: "Time →", type: "utc" },
        y: { label: "HTTP Status" },
        marks: [
          Plot.dot(
            data.filter(d => d.status === 200),
            { x: "timestamp", y: "status", fill: "sender", r: 4, symbol: "circle" }
          ),
          Plot.dot(
            data.filter(d => d.status === 500),
            { x: "timestamp", y: "status", fill: "sender", r: 6, symbol: "x" }
          ),
        ],
      });
      document.getElementById("httpTimeline").append(chart);
    });
}
