# 1. Use official Node.js image
FROM node:20-alpine AS builder

WORKDIR /app

# 2. Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# 3. Copy the rest of the app and build
COPY . .
RUN npm run build

# 4. Production image, copy built files and install only prod deps
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app

# 5. Expose port and set start command
EXPOSE 3000
CMD ["npm", "start"]