# Etapa 1: Build de Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Aumentar límite de memoria RAM para la compilación de Angular en Docker
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npx ng build --configuration production

# Etapa 2: Servidor Web Nginx
FROM nginx:alpine
COPY --from=build /app/dist/RPA_Bot_Operations_Center/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
