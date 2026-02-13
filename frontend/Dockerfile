# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY public ./public
COPY src ./src
COPY tsconfig.json tailwind.config.js postcss.config.js ./

# Inject API URL at build time only (overridable via --build-arg)
ARG REACT_APP_API_URL=http://localhost:7070/api

RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build

# ---- Stage 2: Serve ----
FROM node:20-alpine

WORKDIR /app

# Install lightweight static server
RUN npm install -g serve@14 && npm cache clean --force

# Copy built assets from build stage
COPY --from=build /app/build ./build

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
