FROM nginx:1.23.1

ARG ENV 
ENV ENV=$ENV

COPY ./conf/backend.${ENV}.vozo.app.conf /etc/nginx/conf.d/
COPY ./conf/${ENV}.vozo.app.conf /etc/nginx/conf.d/
COPY 52b59e975d644f636de9d1ca009abf6a.txt /www/data/52b59e975d644f636de9d1ca009abf6a.txt

CMD ["nginx", "-g", "daemon off;"]