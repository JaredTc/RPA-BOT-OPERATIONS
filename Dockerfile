# --- ETAPA 1: Compilación de Angular ---
FROM node:18-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el código del frontend y generar la build de producción
COPY . .
RUN npm run build -- --configuration production

# --- ETAPA 2: Servidor Web Nginx para servir los estáticos ---
FROM nginx:alpine

# Copiar los archivos compilados de Angular al directorio web de Nginx
# NOTA: Reemplaza "nombre-de-tu-app" por la carpeta resultante en dist/ (suele ser el name de tu package.json)
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
