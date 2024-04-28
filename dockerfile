# Use an official Node.js runtime as a parent image
FROM node:18.16.0-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and potentially other build files like yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of your application's source code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
