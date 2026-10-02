# --- ETAPA 1: Compilar la aplicación Angular ---
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación para producción
COPY . .
RUN npm run build -- --configuration production

# --- ETAPA 2: Servir los archivos con Nginx ---
FROM nginx:alpine

# Copiar la configuración de Nginx (para evitar errores 404 al recargar rutas)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de la etapa de build a Nginx
# Nota: Ajusta 'nombre-de-tu-app' según el "name" que tengas en tu package.json
# En Angular 17/18 la ruta suele ser dist/nombre-de-tu-app/browser
COPY --from=build /app/dist/nombre-de-tu-app/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
