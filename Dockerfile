### STAGE 1: Build ###
FROM node:10-alpine as builder

<<<<<<< HEAD
COPY EMSUI/package.json EMSUI/package-lock.json ./
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY ./EMSUI .
=======
COPY package.json package-lock.json ./
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
>>>>>>> 96d2f1d0a1c534466f69b4a5d25dea4a8d9f73a3
RUN npm run ng build -- --prod --output-path=dist

### STAGE 2: Setup ###
FROM nginx:1.14.1-alpine
<<<<<<< HEAD
COPY ./EMSUI/nginx/default.conf /etc/nginx/conf.d/
=======
COPY ./nginx/default.conf /etc/nginx/conf.d/
>>>>>>> 96d2f1d0a1c534466f69b4a5d25dea4a8d9f73a3
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
