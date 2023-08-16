# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files to the working directory
COPY . .

# Expose the port your backend server is listening on
EXPOSE 3001

# Command to start your backend server
CMD ["node", "app.js"]
