FROM node:16

ENV HOME /usr/src/app
WORKDIR $HOME

COPY package*.json ./
RUN npm i --force

COPY . .

RUN npm run build

CMD ["npm", "start"]
