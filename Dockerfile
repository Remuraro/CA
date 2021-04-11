FROM node:14-alpine as build
#ARG identifiers needed to run the API application
ARG PORT01
ARG PORT02
ARG MONGOURL
WORKDIR /usr/src/app  
COPY package*json ./ 
RUN npm install 
COPY . . 
#RUN command executed to build the image with arguments and the output goes to run.sh
RUN echo "npm run start $PORT01 $PORT02 $MONGOURL" > run.sh
EXPOSE 3000  
#CMD command executed once the application is launched
CMD ["sh","sh.run"]