# Etapa 1: Build
FROM node:22.13.0-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor (Nginx)
FROM nginx:alpine
# Copiamos tus archivos compilados
COPY --from=builder /app/dist /usr/share/nginx/html

# SOBREESCRIBIMOS la configuración de Nginx para asegurar que sirve tu app correctamente
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]