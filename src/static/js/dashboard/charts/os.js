import { BASE_URL, ENDPOINTS, colors } from "../config.js";

export function drawOsChart(Plot) {
  fetch(BASE_URL + ENDPOINTS.os)
    .then(r => r.json())
    .then(data => {
      const chart = Plot.plot({
        color: { legend: true, domain: Object.keys(colors).slice(0, 3), range: Object.values(colors).slice(0, 3) },
        x: { label: "OS Type →" },
        y: { label: "Count" },
        marginBottom: 60,
        marks: [
          Plot.barY(
            data,
            Plot.groupY(
              { y: "count" },
              {
                x: d => `${d.type} ${d.version}`,
                fill: "hypervisor",
                title: d => `${d.hypervisor}: ${d.version}`,
              }
            )
          ),
        ],
      });
      document.getElementById("osChart").append(chart);
    });
}
