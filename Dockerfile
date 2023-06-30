FROM node:18-alpine3.17
MAINTAINER symz911
WORKDIR /app
RUN apk update && apk add yarn
COPY package.json
COPY yarn.lock
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "preview", "--port", "8000"]