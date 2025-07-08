start:
	npx start-server -s ./frontend/dist
install:
	npm ci
	cd frontend && npm ci
build:
	cd frontend && npm run build
dev:
	cd frontend && npm run dev




