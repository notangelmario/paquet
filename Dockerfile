FROM denoland/deno:1.24.0

# The port that your application listens to.
EXPOSE 3000 

WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno task cache

CMD ["task", "prod"]

