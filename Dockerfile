FROM denoland/deno:alpine

EXPOSE 8080
WORKDIR /app
COPY . .
USER deno
