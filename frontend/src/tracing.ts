import { NodeSDK } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { LoggerProvider, BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { metrics, Attributes } from '@opentelemetry/api';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import {logs, SeverityNumber} from "@opentelemetry/api-logs";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const serviceName = process.env.SERVICE_NAME || 'frontend';
const otelTracesUrl = process.env.OTEL_TRACES_URL || 'http://otel-collector:4318/v1/traces';
const otelMetricsUrl = process.env.OTEL_METRICS_URL || 'http://otel-collector:4318/v1/metrics';
const otelLogsUrl = process.env.OTEL_LOGS_URL || 'http://otel-collector:4318/v1/logs';

// Exporters
const traceExporter = new OTLPTraceExporter({ url: otelTracesUrl });
const metricExporter = new OTLPMetricExporter({ url: otelMetricsUrl });
const logExporter = new OTLPLogExporter({ url: otelLogsUrl });

// NodeSDK
const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: serviceName }),
  traceExporter,
  metricReaders: [new PeriodicExportingMetricReader({ exporter: metricExporter, exportIntervalMillis: 5000 })],
  instrumentations: [getNodeAutoInstrumentations()],
});

// Logs
const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: serviceName }),
  processors: [new BatchLogRecordProcessor(logExporter)],
});
logs.setGlobalLoggerProvider(loggerProvider);
const logger = logs.getLogger(serviceName);
logger.emit({
  body: 'OpenTelemetry initialized successfully',
  severityNumber: SeverityNumber.INFO,
  severityText: 'INFO',
  attributes: { component: 'init' },
});

const meter = metrics.getMeter('problems-service-meter');

export async function initOtel() {
  await sdk.start();
  console.log('OpenTelemetry SDK started');
}

// Démarre le SDK et crée le compteur
initOtel().catch(console.error);
