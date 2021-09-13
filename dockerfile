FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build
RUN npm prune

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]