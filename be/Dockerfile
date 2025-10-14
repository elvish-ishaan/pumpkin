FROM node:alpine

WORKDIR /app

COPY package* .
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]

