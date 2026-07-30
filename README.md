# NestJS GitOps Portfolio API

A production-ready NestJS REST API designed for showcasing Kubernetes, CI/CD, and GitOps practices in portfolio projects.

## Features

- Health check endpoint at `/health`
- CRUD sample API at `/api/v1/products`
- Structured logging and environment-based configuration
- Multi-stage Docker build for production deployment

## Local development

```bash
npm install
npm run build
npm test
npm run start:dev
```

## Run with Docker locally

```bash
docker build -t nestjs-gitops-portfolio .
```

If port 3000 is free on your machine, use:

```bash
docker run --rm -p 3000:3000 nestjs-gitops-portfolio
```

If port 3000 is already in use, pick another host port:

```bash
docker run --rm -p 3001:3000 nestjs-gitops-portfolio
```

To find what is already listening on port 3000:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

Once running, test:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/products
```

If you used the alternate host port, replace 3000 with 3001 in the curl commands.
