import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import { drawOsChart } from "./charts/os.js";
import { drawHttpChart } from "./charts/http.js";
import { drawStatusTimeline } from "./charts/status.js";
import { drawJobsChart } from "./charts/jobs.js";

drawOsChart(Plot);
drawHttpChart(Plot);
drawStatusTimeline(Plot);
drawJobsChart(Plot);
