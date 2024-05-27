FROM node:21.6.1

ARG PORT=3000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Expose the app's port
EXPOSE $PORT

# Start the app
CMD [ "yarn", "start:dev" ]