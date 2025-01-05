FROM node:22-alpine as build
WORKDIR /app
COPY . .
RUN npm --loglevel silly ci --omit=dev
RUN npm run build


FROM gcr.io/distroless/nodejs22-debian12:nonroot
LABEL org.opencontainers.image.source="https://github.com/flll/table-order" \
      org.opencontainers.image.title="テーブル注文システム" \
      org.opencontainers.image.description="https://table-order-demo.lll.fish/" \
      org.opencontainers.image.created="2025-01-04" \
      org.opencontainers.image.licenses="MIT"
COPY --from=build /app /app
WORKDIR /app
CMD ["start"]
STOPSIGNAL SIGTERM
