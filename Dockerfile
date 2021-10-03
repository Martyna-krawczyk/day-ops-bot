FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 
COPY . .
CMD ["npm", "run", "runlambda"]
