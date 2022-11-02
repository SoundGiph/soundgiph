FROM node:14.20.0

WORKDIR /usr/soundgif-api/


COPY nest-cli.json ./
COPY nodemon.json ./
COPY package.json ./


RUN yarn add @nestjs/cli
RUN yarn

COPY patches ./patches
COPY .env ./
COPY entrypoint.sh ./
COPY src ./src
COPY secrets ./secrets
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npx patch-package

EXPOSE 3000
RUN yarn build
COPY secrets/6QDU55FX28.p8 dist/secrets/6QDU55FX28.p8

CMD ["./entrypoint.sh"]