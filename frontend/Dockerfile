FROM docker.io/library/node:21-alpine3.18 AS BUILDER

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY src/ ./
COPY tsconfig.json ./

# Copy the rest of the application source code
COPY . .

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine as production-stage

WORKDIR /app

# Copy nginx configuration
#COPY nginx.conf /etc/nginx/conf.d/

# Copy built assets from build-stage
COPY --from=BUILDER /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]