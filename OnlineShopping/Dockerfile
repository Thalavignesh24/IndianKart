FROM node

RUN mkdir -p /usr/src/server
WORKDIR /server

# Install app dependencies
COPY package.json /usr/src/server
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN mkdir -p /usr/src/app/Helpers/Uploads

EXPOSE 3000
CMD ["sh", "-c", "NODE_ENV=${APP_ENV} node server.js"]
