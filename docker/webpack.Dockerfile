FROM node:6.10.0

WORKDIR /app/local/webpack
RUN npm install -g webpack gulp
RUN yarn install

CMD npm start