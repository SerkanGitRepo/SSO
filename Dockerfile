FROM node:18

EXPOSE 3000
WORKDIR /app
COPY . /app
CMD ["node", "app.js"]
