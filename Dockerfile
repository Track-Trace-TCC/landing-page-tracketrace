# Stage 1: Build
FROM node:18-alpine AS builder

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all other project files to working directory
COPY . .
# Run the next build process and generate the artifacts

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL ${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}

RUN npm run build

# Stage 2: Serve
FROM node:18-alpine
WORKDIR /app

# Copy the build files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules 

# Add a non-root user
RUN adduser -D nextuser
USER nextuser

# Expose the port the app runs on
EXPOSE 3000

# Start the application
ENV NODE_ENV=production
CMD ["npm", "start"]
