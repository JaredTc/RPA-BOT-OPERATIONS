# --- ETAPA 1: Compilación de Angular ---
FROM node:18-alpine AS build

WORKDIR /app

# Copiar manifiestos e instalar dependencias
COPY package*.json ./
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Ajustes de memoria y restricción de recursos para la compilación
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npx ng build --configuration production --max-workers=1

# --- ETAPA 2: Servidor Web Nginx ---
FROM nginx:alpine

# Copiar archivos estáticos compilados
# Nota: Si tu versión no genera la subcarpeta /browser, elimina "/browser" del final
COPY --from=build /app/dist/RPA_Bot_Operations_Center/browser /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
