# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /demo-frontend
COPY . .
RUN npm install
CMD ["npm", "run", "serve"]
EXPOSE 8080
