# docker-http-random-file
This is a lightweight Docker container that streams random files of any size in real-time. It is based on Alpine Linux and uses Node.js to generate and stream random data on-the-fly.

[![docker-buildx](https://github.com/matthewhuie/docker-http-random-file/actions/workflows/docker-buildx.yaml/badge.svg)](https://github.com/matthewhuie/docker-http-random-file/actions/workflows/docker-buildx.yaml)

## Features
- **Real-time Streaming**: No files are stored in the image, saving disk space
- **Flexible Sizes**: Request files of any size in B (bytes), KB (kilobytes), MB (megabytes), GB (gigabytes), TB (terabytes) 
- **Web Interface**: Simple HTML index page with sample file sizes

## Getting Started
Build the Docker image locally:
```bash
docker build \
  -t matthewhuie/http-random-file \
  github.com/matthewhuie/docker-http-random-file
```

Create and start a container:
```bash
docker run -d -p 8080:80 matthewhuie/http-random-file
```

## Usage
Navigate to `http://localhost:8080/` to see the index page.

You can also request specific file sizes directly via the URL, for example:
- `http://localhost:8080/10MB`
- `http://localhost:8080/2GB`
- `http://localhost:8080/256KB`

## Links
- https://github.com/matthewhuie/docker-http-random-file
- https://hub.docker.com/r/matthewhuie/http-random-file
