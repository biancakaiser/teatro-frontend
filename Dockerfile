FROM node:18
WORKDIR /app
COPY package*.json ./
# Força o uso de npm
RUN npm install
COPY . .
CMD ["npm", "start"]