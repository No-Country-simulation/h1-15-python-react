FROM node:20.15.0-slim

WORKDIR /app

COPY . .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]