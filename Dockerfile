FROM denoland/deno:1.10.3

# The port that your application listens to.
EXPOSE 3000 

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno task cache

CMD ["task", "prod"]

