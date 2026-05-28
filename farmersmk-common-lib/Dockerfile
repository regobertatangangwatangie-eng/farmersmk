# Dockerfile for farmersmk-common-lib
FROM maven:3.9.6-eclipse-temurin-17-alpine
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests
