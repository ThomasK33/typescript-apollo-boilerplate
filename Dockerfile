FROM node:11.13.0-alpine

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --silent
COPY . .

RUN npm run build
RUN rm -rf src tests nodemon.json tslint.json tsconfig.json

USER node

EXPOSE 8080
CMD npm run start
