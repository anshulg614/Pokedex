# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files to the working directory
COPY . .

# Expose the port your frontend app is running on (e.g., 3000)
EXPOSE 3000

# Command to start your frontend app
CMD ["npm", "start"]
