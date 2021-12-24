FROM node:12.22.0

WORKDIR /usr/soundgif-api/


COPY nest-cli.json ./
COPY nodemon.json ./
COPY package.json ./


RUN yarn add @nestjs/cli
RUN yarn

COPY .env ./
COPY src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]