# docker-http-random-file
This is a Docker container that provides a lightweight HTTP server, based on Alpine Linux. It runs a Node.js http-server on port 8080, hosting files of different sizes for testing purposes.

## Getting Started
Build a Docker image locally from this repo.
```bash
docker build -t matthewhuie/http-random-file github.com/matthewhuie/docker-http-random-file
```

Create and start a container.
```bash
docker run -d matthewhuie/http-random-file
```

Using an HTTP client, navigate to the HTTP server.

## Links
- https://github.com/matthewhuie/docker-http-random-file
