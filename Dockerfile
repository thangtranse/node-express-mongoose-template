FROM node:16.13.1-alpine
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node package*.json ./
RUN npm install

COPY --chown=node . .
ENV HOST=0.0.0.0 PORT=4004
EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]
