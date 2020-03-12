FROM node:10.16.0

WORKDIR /backend/

ADD . /backend/

RUN npm install -g yarn
RUN yarn install
RUN yarn build

CMD ["yarn","start"]
