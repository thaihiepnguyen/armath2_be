FROM --platform=linux/amd64 node:16.20.0

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD npm run start
