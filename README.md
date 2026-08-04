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

🚀 Getting Started
Prerequisites
Kubernetes cluster (Minikube / Kind / EKS / AKS)

Argo Rollouts Controller installed (kubectl create namespace argo-rollouts)

Prometheus Monitoring Stack running in cluster

Steps
Clone the repository:

Bash
git clone [https://github.com/hirumalshika/k8s-gitops-nestjs-pipeline.git](https://github.com/hirumalshika/k8s-gitops-nestjs-pipeline.git)
cd k8s-gitops-nestjs-pipeline
Apply AnalysisTemplate & Service:

Bash
kubectl apply -f k8s/analysis-template.yaml
kubectl apply -f k8s/service.yaml
Deploy Rollout:

Bash
kubectl apply -f k8s/rollout.yaml
👩‍💻 Author
Hiruni Malshika - GitHub