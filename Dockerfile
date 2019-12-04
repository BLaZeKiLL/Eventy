# Base image
FROM node:lts-alpine

# Set Working Directory
WORKDIR /home/app/

# Install Dependencies
COPY ./package.json ./
RUN npm install --only=prod

# Copy Application files
COPY ./dist ./dist

# Default command
CMD ["npm","start"]
