import { BASE_URL, ENDPOINTS } from "../config.js";

export function drawJobsChart(Plot) {
  fetch(BASE_URL + ENDPOINTS.jobs)
    .then(r => r.json())
    .then(data => {
      const chart = Plot.plot({
        color: { legend: true, range: ["#004E1A", "#CFFFE5"], domain: ["Success", "Fail"] },
        y: { label: "Count" },
        marks: [
          Plot.barY(
            data,
            Plot.groupY(
              { y: "count" },
              {
                x: "module",
                fill: d => (d.success ? "Success" : "Fail"),
                title: d => `${d.module} - ${d.success ? "✅" : "❌"}`,
              }
            )
          ),
        ],
      });
      document.getElementById("jobsChart").append(chart);
    });
}
