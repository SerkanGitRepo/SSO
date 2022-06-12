FROM 18.3.0-alpine3.15

EXPOSE 3000
WORKDIR /app
COPY . /app
CMD ["node", "app.js"]