FROM node:12.22.0

WORKDIR /usr/vozo-web/


COPY global.d.ts ./
COPY next-env.d.ts ./
COPY next-i18next.config.js ./
COPY next.config.js ./
COPY package.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./

RUN yarn

COPY components ./components
COPY constants ./constants
COPY public ./public
COPY styles ./styles
COPY domain ./domain
COPY hooks ./hooks
COPY pages ./pages


RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]