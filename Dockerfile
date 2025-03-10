# Use a lightweight Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

# Copy the rest of the app
COPY . ./

# Expose port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
