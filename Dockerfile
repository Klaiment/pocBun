FROM oven/bun:latest AS builder
EXPOSE 3000
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/bun.lockb ./
COPY --from=builder /app/package.json ./

CMD ["bun", "run", "start"]
