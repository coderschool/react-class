FROM node:6.10.0

WORKDIR /app/local/webpack
RUN npm install webpack gulp -g
RUN yarn install

CMD npm start