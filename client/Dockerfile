FROM node:12.22.6

WORKDIR /usr/soundgiph-frontend/

COPY package.json ./

ENV MODE production 
ENV HOST 0.0.0.0

COPY ./src ./src
COPY ./public ./public
COPY ./setupProxy.js ./setupProxy.js

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]