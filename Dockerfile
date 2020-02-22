### STAGE 1: Build ###
FROM node:10-alpine as builder

COPY EMSUI/package.json EMSUI/package-lock.json ./
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY ./EMSUI .
RUN npm run ng build -- --prod --output-path=dist

### STAGE 2: Setup ###
FROM nginx:1.14.1-alpine
COPY ./EMSUI/nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
