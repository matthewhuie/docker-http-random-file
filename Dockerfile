FROM node:alpine

WORKDIR /app

COPY server.js .

EXPOSE 80

ENTRYPOINT ["node", "server.js"]
