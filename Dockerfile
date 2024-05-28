# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Install app dependencies with legacy peer deps flag
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy app files
COPY . .

# Compile TypeScript
RUN npm run build

# Ensure the views directory exists and copy it
RUN mkdir -p dist/views && cp -r src/views/* dist/views/

# Ensure the public directory exists and copy it if it does
RUN mkdir -p dist/public && \
    (test -d src/public && cp -r src/public/* dist/public/ || echo "No public directory to copy")

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
