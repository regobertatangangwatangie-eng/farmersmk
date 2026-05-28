# Dockerfile for farmersmk-marketplace-service
FROM maven:3.9.6-eclipse-temurin-17-alpine
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/app.jar"]
EXPOSE 4000
