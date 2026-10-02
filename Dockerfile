# --- ETAPA 1: Compilación de Angular ---
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código fuente y compilar
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npx ng build --configuration production

# --- ETAPA 2: Servidor Web Nginx ---
FROM nginx:alpine

# Copiar los estáticos compilados a la carpeta pública de Nginx
COPY --from=build /app/dist/RPA_Bot_Operations_Center/browser /usr/share/nginx/html/

# Exponer el puerto 80 del contenedor
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
