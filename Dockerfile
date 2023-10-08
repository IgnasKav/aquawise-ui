FROM node:16-alpine as build

WORKDIR /app

COPY ./ ./

RUN npm ci

RUN npm run build

FROM node:16-alpine as serve

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "npm", "run", "start" ]