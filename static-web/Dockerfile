# Use a lightweight web server image
FROM nginx:alpine

# Copy static website files into Nginx default directory
COPY ./web /usr/share/nginx/html
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]