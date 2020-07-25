FROM node:12-slim

# Create app directory
WORKDIR /app

# Copy Package.json
COPY package.json ./app

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["node", "server.js"]