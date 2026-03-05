# Estágio 1: Compilação (Build)
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# # Estágio 2: Servidor (Produção)
# FROM nginx:stable-alpine
# # Copia o resultado do estágio anterior para a pasta do Nginx
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# # Copia sua configuração personalizada
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Copy Caddyfile to the container image.
COPY Caddyfile ./
# Copy local code to the container image.
RUN caddy fmt Caddyfile --overwrite
# Copy files to the container image.
COPY --from=build /app/dist ./dist
# Use Caddy to run/serve the app
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]