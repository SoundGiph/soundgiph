FROM node:12.22.6

WORKDIR /usr/soundgif-web/

COPY package.json ./
RUN yarn

COPY global.d.ts ./
COPY next-env.d.ts ./
COPY next-i18next.config.js ./
COPY next.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY .env ./

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

COPY components ./components
COPY constants ./constants
COPY context ./context
COPY public ./public
COPY styles ./styles
COPY domain ./domain
COPY hooks ./hooks
COPY pages ./pages
COPY tools ./tools
COPY tracker ./tracker

EXPOSE 8080

CMD ["./entrypoint.sh"]