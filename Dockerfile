FROM node:23-alpine3.20 AS build

WORKDIR /app

COPY package*.json ./

COPY .env ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]