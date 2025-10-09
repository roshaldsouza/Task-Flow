# Step 1: Build stage using Node
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:stable-alpine

# Copy the build output from Vite to Nginx's default html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
