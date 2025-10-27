# Poker Training Platform – Observability with OpenTelemetry

This project enhances the observability of a **poker training microservices platform** ([checkraise.fr](https://checkraise.fr)) using OpenTelemetry, Grafana, and its associated stack (Loki, Grafana, Tempo, Prometheus).  
It provides a complete view of **logs**, **traces**, and **metrics** across all services to analyze system behavior, detect bottlenecks, and improve reliability.

## Install

1. **Clone the repository:**
```bash
git clone
 ```

2. **Install dependencies for all microservices + frontend:**
```bash
cd apps/auth-service && npm install
cd ../problems-service && npm install
cd ../lives-service && npm install
cd ../../frontend && npm install
```

# Usage

1. **Run the dockers for observability stack and the microservices:**
```bash
cd infra
docker-compose up -d --build
```

2. **Run the Next.js frontend locally:**
```bash
cd ../frontend
npm run dev
```

3. **Access the application:**
Open your browser and navigate to `http://localhost:3001` to access the poker training platform.


4. **Access Grafana dashboard:**
Open your browser and navigate to `http://localhost:3000` to access the Grafana dashboard.  
   - Default credentials: `admin` / `admin` (you will be prompted to change the password on first login)

---

## Architecture

**Services:**
- `auth-service` → Handles authentication and JWT management  
- `problems-service` → Manages poker problem creation and retrieval  
- `lives-service` → Implements a gamified “lives” system  

**Frontend:** Next.js (runs locally)  
**Backend:** Node.js + Express + Prisma + PostgreSQL  
**Deployment:** Docker Compose for all observability components

```
apps/                           # Microservices
├── auth-service
├── problems-service
└── lives-service
frontend/                       # Next.js app (runs locally)
infra/                          # Observability and docker setup
├── Grafana/  
        └── tp1_open...json     # Pre-configured Grafana dashboard
├── OpenTelemetry Collector/
├── Loki/
├── Tempo/
├── Prometheus/
└── docker-compose.yml
```

## OpenTelemetry Integration

Each microservice integrates OpenTelemetry through a `tracing.ts` file.

- **Auto-instrumentations:** HTTP, Express, Prisma  
- **Exporters:**
  - Logs → `OTLPLogExporter → Collector → Loki`
  - Traces → `OTLPTraceExporter → Collector → Tempo`
  - Metrics → `OTLPMetricExporter → Collector → Prometheus`
- **Correlation:** Every log includes `trace_id` and `span_id` for cross-navigation in Grafana.

**Example Log (JSON structured):**
```json
{
  "timestamp": "2025-10-25T14:22:33Z",
  "level": "info",
  "service_name": "auth-service",
  "message": "User authenticated successfully",
  "trace_id": "af23d8c1f5...",
  "span_id": "be09c3..."
}
