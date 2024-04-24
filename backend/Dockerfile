FROM docker.io/library/node:21-alpine3.18 AS BUILDER

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY src/ ./
COPY tsconfig.json ./
COPY .env ./

# Copy the rest of the application source code
COPY . .

RUN npm ci
RUN npm run build

FROM docker.io/library/node:21-alpine3.18 AS RUNNER

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY --from=BUILDER /app/dist ./dist
COPY --from=BUILDER /app/.env ./

# devDependencies `dotenv` 需要用在 production 環境，因此不能跑 `RUN npm ci --only=production`
COPY --from=BUILDER /app/node_modules ./node_modules

EXPOSE 8888

CMD [ "npm", "start" ]