# E-Commerce Microservices

This repository contains a scalable e-commerce website using:

- React + Vite frontend
- .NET API backend microservices: Catalog and Orders
- PostgreSQL database
- Docker containers and Kubernetes deployment manifests

## Project Structure

- `frontend/` — React app
- `services/catalog/CatalogApi/` — Catalog microservice
- `services/orders/OrdersApi/` — Orders microservice
- `k8s/` — Kubernetes manifests

## Local setup

1. Install dependencies:
   - `cd frontend && npm install`
   - `dotnet restore services/catalog/CatalogApi/CatalogApi.csproj`
   - `dotnet restore services/orders/OrdersApi/OrdersApi.csproj`

2. Run backend services:
   - `cd services/catalog/CatalogApi && dotnet run`
   - `cd services/orders/OrdersApi && dotnet run`

3. Run frontend:
   - `cd frontend && npm run dev`

## Docker build

- `docker build -t ecommerce-catalog-api:latest ./services/catalog/CatalogApi`
- `docker build -t ecommerce-orders-api:latest ./services/orders/OrdersApi`
- `docker build -t ecommerce-frontend:latest ./frontend`

## Docker Compose

- `docker compose up --build`
- Open the frontend at `http://localhost:3000`

## Kubernetes

- `kubectl apply -f k8s/postgres-deployment.yaml`
- `kubectl apply -f k8s/catalog-deployment.yaml`
- `kubectl apply -f k8s/orders-deployment.yaml`
- `kubectl apply -f k8s/frontend-deployment.yaml`

> Note: `frontend` nginx proxy configuration now routes API requests to `catalog-api` and `orders-api` services in container orchestration.
