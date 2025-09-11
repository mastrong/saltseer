# Makefile for Django project "main" using uv + Docker

# Default settings
DJANGO_SETTINGS_MODULE ?= main.settings.dev
PYTHON := uv run python
MANAGE := DJANGO_SETTINGS_MODULE=$(DJANGO_SETTINGS_MODULE) $(PYTHON) src/manage.py

# Docker
# DOCKER_COMPOSE := docker compose
DOCKER_COMPOSE := docker compose
DOCKER_PROJECT := saltseer  # name your compose project

.PHONY: help runserver shell migrate makemigrations createsuperuser test lint format clean \
        build up down restart logs bash services ps

help:
	@echo "Makefile commands:"
	@echo "  --- Django ---"
	@echo "  make runserver        Run Django dev server locally"
	@echo "  make shell            Open Django shell"
	@echo "  make migrate          Apply database migrations"
	@echo "  make makemigrations   Create new migrations"
	@echo "  make createsuperuser  Create a Django superuser"
	@echo "  make test             Run pytest with test settings"
	@echo "  make lint             Run Ruff linter"
	@echo "  make format           Run Black formatter"
	@echo "  make clean            Remove __pycache__ and *.pyc files"
	@echo ""
	@echo "  --- Docker ---"
	@echo "  make build            Build Docker images"
	@echo "  make up               Start all containers (detached)"
	@echo "  make services         Start only db + salt-master + salt-minion"
	@echo "  make down             Stop containers"
	@echo "  make restart          Restart containers"
	@echo "  make logs             Tail logs"
	@echo "  make ps               Show container status"
	@echo "  make bash             Open shell inside web container (if defined later)"

# Django management commands
runserver:
	$(MANAGE) runserver 0.0.0.0:8000

shell:
	$(MANAGE) shell

migrate:
	$(MANAGE) migrate

makemigrations:
	$(MANAGE) makemigrations

createsuperuser:
	$(MANAGE) createsuperuser

# Testing
test:
	DJANGO_SETTINGS_MODULE=config.settings.test uv run pytest -v

# Code quality
lint:
	uv run ruff check src tests

format:
	uv run black src tests

# Cleanup
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

# Docker commands
build:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) build

up:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) up -d

services:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) up -d db salt-master salt-minion

down:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) down

restart: down up

logs:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) logs -f

ps:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) ps

bash:
	$(DOCKER_COMPOSE) -p $(DOCKER_PROJECT) exec web bash

