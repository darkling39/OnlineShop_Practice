#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 1.5
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/admin-panel-tutor /usr/share/nginx/html
