// pushLog.js
const fetch = require('node-fetch');

const collectorUrl = process.env.OTEL_LOGS_URL || 'http://localhost:4318/v1/logs';

// Structure minimale OTLP HTTP log payload
const payload = {
  resourceLogs: [
    {
      resource: {
        attributes: [
          { key: 'service.name', value: { stringValue: 'auth-service' } },
        ],
      },
      scopeLogs: [
        {
          scope: {},
          logRecords: [
            {
              timeUnixNano: Date.now() * 1e6, // timestamp en nanosecondes
              severityText: 'INFO',
              body: { stringValue: 'This is a test log from Node.js script' },
              attributes: [
                { key: 'custom.attr', value: { stringValue: 'test-123' } },
              ],
            },
          ],
        },
      ],
    },
  ],
};

(async () => {
  try {
    const res = await fetch(collectorUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Log sent:', res.status, res.statusText);
    console.log('Check Grafana Explore / Loki for the log');
  } catch (err) {
    console.error('Error sending log:', err);
  }
})();
