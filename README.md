# docker-http-random-file
This is a Docker container that provides a lightweight HTTP server, based on Alpine Linux. It runs a Node.js http-server on port 8080, hosting files of different sizes for testing purposes.

## Getting Started
Build a Docker image locally from this repo.  By default, this repo will generate 1MB, 10MB, 100MB, 1000MB, 10000MB files.
```bash
docker build \
  -t matthewhuie/http-random-file \
  github.com/matthewhuie/docker-http-random-file
```

For specific file sizes, use the `FILE_SIZES_MB` build argument with space-delimited file sizes in MB.
```bash
docker build \
  -t matthewhuie/http-random-file \
  --build-arg FILE_SIZES_MB="100 200 300" \
  github.com/matthewhuie/docker-http-random-file
```

Create and start a container.
```bash
docker run -d matthewhuie/http-random-file
```

Using an HTTP client, navigate to the HTTP server.

## Links
- https://github.com/matthewhuie/docker-http-random-file
