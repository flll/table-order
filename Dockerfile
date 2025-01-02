FROM node:22-alpine as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install --production

COPY --from=build /app/dist ./dist

CMD ["npm", "start"]
