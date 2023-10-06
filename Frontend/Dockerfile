# Use the official Node.js LTS version as base image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Vite will run on
EXPOSE 8000

# Start the application in development mode
CMD ["npm", "run", "dev"]