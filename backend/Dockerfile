# Backend Dockerfile for Forever Shine Engineering
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --production=false

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Create uploads directory
RUN mkdir -p uploads && chown -R expressjs:nodejs uploads

USER expressjs

EXPOSE 5000

ENV PORT 5000

CMD ["node", "dist/server.js"]
