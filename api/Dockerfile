FROM node:12.22.0

WORKDIR /usr/soundgif-api/


COPY nest-cli.json ./
COPY nodemon.json ./
COPY package.json ./


RUN yarn add @nestjs/cli
RUN yarn

COPY .env ./
COPY entrypoint.sh ./
COPY src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./

EXPOSE 3000
RUN yarn build

CMD ["./entrypoint.sh"]