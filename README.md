# 🚀 Automated Canary Deployment with Argo Rollouts, Prometheus & NestJS

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Argo Rollouts](https://img.shields.io/badge/Argo%20Rollouts-EF7B4D?style=for-the-badge&logo=argo&logoColor=white)](https://argoproj.github.io/rollouts/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

An enterprise-grade **GitOps Continuous Delivery (CD)** pipeline demonstrating progressive delivery and zero-downtime canary deployments for a NestJS microservice on Kubernetes.

---

## 📌 Architecture & Features

* **Canary Deployment Strategy:** Gradually shifts traffic from `v1` to `v2` (e.g., `20% ➔ 50% ➔ 100%`) using **Argo Rollouts** to prevent downtime.
* **Automated Metric Analysis:** Real-time health validation powered by **Prometheus** via an `AnalysisTemplate`.
* **Self-Healing & Auto-Rollback:** Automatically aborts failed releases and reverts to the last known stable revision if HTTP error thresholds are exceeded.
* **GitOps Alignment:** Declarative Kubernetes manifests versioned and managed cleanly.

---

## 🛠️ Tech Stack

* **Application:** NestJS
* **Containerization:** Docker & Docker Hub
* **Orchestration:** Kubernetes
* **Progressive Delivery:** Argo Rollouts Controller & CLI
* **Monitoring & Alerting:** Prometheus Operator / Stack

---

## 📁 Repository Structure

```text
.
├── k8s/
│   ├── rollout.yaml              # Argo Rollout spec (Canary steps & strategy)
│   ├── analysis-template.yaml    # Prometheus metric validation rules
│   ├── service.yaml              # Kubernetes Service configurations
│   ├── deployment.yaml           # Standard deployment fallback
│   └── ingress.yaml             # Ingress rules for external routing
├── src/                          # NestJS Source Code
├── Dockerfile                    # Multi-stage Docker build config
└── README.md

```

### ⚙️ Deployment Workflow

The progressive delivery workflow follows a structured 4-phase lifecycle to guarantee zero downtime:
```text
[ Developer Push ] ──► [ Docker Build & Push Tag v2.0.0 ]
                                   │
                                   ▼
                       [ Apply k8s Manifests ]
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │       Phase 1: Canary Step (20%)          │
             │ - 1/5 Pods updated to new image tag v2.0.0│
             └─────────────────────┬─────────────────────┘
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │      Prometheus Automated Analysis        │
             │ - Queries HTTP Success Rate Every 10s     │
             └─────────┬───────────────────────┬─────────┘
                       │                       │
           [ Pass: Success Rate >= 95% ]   [ Fail: Metric Error ]
                       │                       │
                       ▼                       ▼
   ┌───────────────────────────────┐     ┌──────────────────────────────┐
   │ Phase 2: Traffic Scale (50%)  │     │       AUTOMATED ROLLBACK     │
   │      Then 100% Promotion      │     │  Aborts rollout, terminates  │
   │  Gracefully scales down v1.0  │     │  v2 pods & reverts to stable │
   └───────────────────────────────┘     └──────────────────────────────┘
```

### Detailed Execution Steps:
1. Build & Release Image: A new application version is built and pushed with a semantic version tag:
   ```
		docker build -t hirumalshika/k8s-gitops-nestjs-pipeline:v2.0.0 .
		docker push hirumalshika/k8s-gitops-nestjs-pipeline:v2.0.0
   ```
2. Trigger Rollout: The k8s/rollout.yaml is updated with the new image tag (v2.0.0) and applied:

	```
	kubectl apply -f k8s/analysis-template.yaml
	kubectl apply -f k8s/rollout.yaml
	```

3. Canary Verification Phase:
   
   * Initial Shift (20%): Argo Rollouts routes 20% of traffic to 1 new Canary Pod.
   * Real-time Metric Check: An AnalysisRun fires Prometheus queries (successCondition: result[0] >= 0.95).
   * Progressive Shift (50% ➔ 100%): Once metrics pass, traffic scales up to 50%, pauses for verification, and finally promotes to 100%.
     
5. Automated Safety Net: If Prometheus records HTTP error spikes (>5%), the AnalysisRun fails, triggering an instant, zero-downtime rollback back to v1.0.0.

### 📊 Live Rollout Status
## Monitoring rollout progression via Argo Rollouts CLI:

Bash
```
kubectl argo rollouts get rollout nestjs-app-rollout --watch
```
## Successful Deployment Preview:
```
Plaintext
Name:            nestjs-app-rollout
Namespace:       default
Status:          ✔ Healthy
Strategy:        Canary
  Step:          4/4
  SetWeight:     100
  ActualWeight:  100
Images:          hirumalshika/k8s-gitops-nestjs-pipeline:v2.0.0 (stable)
Replicas:
  Desired:       5
  Current:       5
  Updated:       5
  Ready:         5
  Available:     5
NAME                                          KIND        STATUS        AGE   INFO
⟳ nestjs-app-rollout                          Rollout     ✔ Healthy     59m  
└──# revision:2                                                         
   ├──⧉ nestjs-app-rollout-57485846cf         ReplicaSet  ✔ Healthy     20m   stable
   │  ├──□ nestjs-app-rollout-57485846cf-q54fz Pod         ✔ Running     11m   ready:1/1
   │  ├──□ nestjs-app-rollout-57485846cf-47hpc Pod         ✔ Running     11m   ready:1/1
   │  ├──□ nestjs-app-rollout-57485846cf-fsb9h Pod         ✔ Running     11m   ready:1/1
   │  ├──□ nestjs-app-rollout-57485846cf-67gr4 Pod         ✔ Running     10m   ready:1/1
   │  └──□ nestjs-app-rollout-57485846cf-r6x9c Pod         ✔ Running     10m   ready:1/1
   └──α nestjs-app-rollout-57485846cf-2.2     AnalysisRun ✔ Successful  11m   ✔ 10
```
### 🚀 Getting Started
## Prerequisites
Kubernetes cluster (Minikube / Kind / EKS / AKS)

Argo Rollouts Controller installed (kubectl create namespace argo-rollouts)

Prometheus Monitoring Stack running in cluster

## Steps
# Clone the repository:
```
git clone [https://github.com/hirumalshika/k8s-gitops-nestjs-pipeline.git](https://github.com/hirumalshika/k8s-gitops-nestjs-pipeline.git)
cd k8s-gitops-nestjs-pipeline
```
# Apply AnalysisTemplate & Service:
```
kubectl apply -f k8s/analysis-template.yaml
kubectl apply -f k8s/service.yaml
```
# Deploy Rollout:

```
kubectl apply -f k8s/rollout.yaml
```
👩‍💻 Author
Hiruni Malshika - [GitHub Profile](https://github.com/hiruniMalshika)

