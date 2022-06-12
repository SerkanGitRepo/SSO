FROM node:18-alpine

EXPOSE 3000
WORKDIR /
COPY . /
CMD ["node", "app.js"]
