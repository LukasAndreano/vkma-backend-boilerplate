FROM node:22

ENV HOME /usr/src/app

WORKDIR $HOME

COPY package*.json ./

RUN yarn install --force

COPY . .

RUN yarn build

CMD ["yarn", "start"]
