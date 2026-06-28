import { buildQuotationExternalGateReport } from "./quotation-gate-state.mjs";

const report = buildQuotationExternalGateReport();

console.log(JSON.stringify(report, null, 2));
process.exitCode = report.ready ? 0 : 1;
