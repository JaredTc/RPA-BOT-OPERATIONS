# --- ETAPA 1: Compilación de Angular ---
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias e instalarlas exactamente como en package-lock.json
COPY package*.json ./
RUN npm ci

# Copiar el código del frontend
COPY . .

# Aumentar la memoria para Node.js y ejecutar la compilación de producción
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npx ng build --configuration production

# --- ETAPA 2: Servidor Web Nginx ---
FROM nginx:alpine

# Copiar directamente el contenido estático generado por Angular a la raíz de Nginx
# Ajustado a la salida estándar de Angular (dist/<nombre-app>/browser)
COPY --from=build /app/dist/RPA_Bot_Operations_Center/browser /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
