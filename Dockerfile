FROM nginx:alpine
COPY ./dist/project_sl2/ /usr/share/nginx/html
