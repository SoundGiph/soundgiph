FROM node:12.22.0

WORKDIR /usr/soundgif-web/


COPY global.d.ts ./
COPY next-env.d.ts ./
COPY next-i18next.config.js ./
COPY next.config.js ./
COPY package.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY .env ./
COPY entrypoint.sh ./

RUN chmod +x ./entrypoint.sh
RUN yarn

COPY components ./components
COPY constants ./constants
COPY public ./public
COPY styles ./styles
COPY domain ./domain
COPY hooks ./hooks
COPY pages ./pages

EXPOSE 8080

CMD ["./entrypoint.sh"]