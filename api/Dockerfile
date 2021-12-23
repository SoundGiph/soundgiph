FROM node:12.22.0

WORKDIR /usr/vozo-api/


COPY nest-cli.json ./
COPY nodemon.json ./
COPY package.json ./
COPY src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY yarn-error.log ./

RUN yarn add @nestjs/cli
RUN yarn

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]