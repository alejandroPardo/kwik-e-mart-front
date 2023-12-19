# Stage 1: Building the code
FROM node:latest as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to Docker environment
COPY package*.json ./

# Install node modules and build assets
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the Nginx server from outside the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
