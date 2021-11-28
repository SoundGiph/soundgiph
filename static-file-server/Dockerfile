FROM node:12.22.6

WORKDIR /usr/soundgiph-backend/

COPY package.json ./

ENV MODE production 
ENV HOST 0.0.0.0

COPY ./src ./src

RUN yarn

EXPOSE 8080


CMD ["yarn", "start"]