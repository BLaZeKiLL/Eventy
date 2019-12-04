# Base image
FROM node:lts-alpine

# Set Working Directory
WORKDIR /home/app/

# Copy Application files
COPY ./dist ./dist
COPY ./package.json ./

# Install Dependencies
RUN npm install --only=prod

# Default command
CMD ["npm","start"]
