FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json src/package-lock.json ./
RUN npm install
RUN mkdir -p /opt/logs
COPY src/ .
EXPOSE 6200
CMD [ "npm", "run", "pm2"]