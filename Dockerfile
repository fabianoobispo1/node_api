FROM node:14
WORKDIR /app
COPY . /
RUN npm install
ENV PORT 3333
EXPOSE 3333
CMD ["npm", "dev"]
