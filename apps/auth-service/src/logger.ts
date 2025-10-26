import pino from 'pino';
import { context, trace } from '@opentelemetry/api';

const serviceName = process.env.SERVICE_NAME || 'unknown-service';

export const logger = pino({
  base: {
    service: serviceName,
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

/**
 * Log avec traceId si dispo
 */
export function logInfo(component: string, msg: string, contextData: any = {}) {
  const span = trace.getSpan(context.active());
  const traceId = span?.spanContext().traceId;
  logger.info({ component, traceId, ...contextData }, msg);
}

export function logError(component: string, msg: string, error?: Error) {
  const span = trace.getSpan(context.active());
  const traceId = span?.spanContext().traceId;
  logger.error({ component, traceId, error: error?.message }, msg);
}
