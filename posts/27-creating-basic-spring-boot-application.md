---
title: "27 - Creating a Basic Spring Boot Application (Hands-on)"
date: "18-12-2025"
tags: ["Java","Spring Boot","Hands-on","Getting Started","Core Features"]
summary: "A hands-on walkthrough to create a basic Spring Boot application from scratch, covering project setup, application structure, controllers, and running the app."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 27
---

So far, we’ve understood Spring Boot concepts and core features.  
Now it’s time to **build a real application** and see everything in action.

In this hands-on post, we’ll create a **basic Spring Boot application**, add a simple REST endpoint, and run it locally.

---

# 1. What We Are Going to Build

We’ll build a simple Spring Boot application that:

- Starts using Spring Boot defaults
- Exposes a REST endpoint
- Returns a simple response
- Runs as an executable JAR

No database, no external services — just core Spring Boot.

---

# 2. Creating the Project

The easiest way to create a Spring Boot project is using **Spring Initializr**.

Project configuration:

- Project: Maven
- Language: Java
- Spring Boot: Latest stable
- Group: `com.example`
- Artifact: `demo`
- Packaging: JAR
- Java: 17+
- Dependencies:
  - Spring Web

Generate and open the project in your IDE.

---

# 3. Project Structure Overview

Once created, your project structure looks like this:

```
src
 └── main
     ├── java
     │   └── com.example.demo
     │       └── DemoApplication.java
     └── resources
         └── application.properties
```

This structure is standard and recommended.

---

# 4. Understanding the main() Method

Open `DemoApplication.java`:

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

This method:
- Bootstraps the application
- Creates the ApplicationContext
- Triggers auto-configuration
- Starts the embedded server

---

# 5. Creating a Simple REST Controller

Let’s create a REST endpoint.

```java
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

What’s happening:
- `@RestController` marks this as a REST controller
- `@GetMapping` maps HTTP GET requests
- The method returns a simple String response

---

# 6. Running the Application

You can run the application in multiple ways.

---

## 6.1 Run from IDE

- Right-click `DemoApplication`
- Click **Run**

---

## 6.2 Run using Maven

```bash
mvn spring-boot:run
```

---

## 6.3 Run as Executable JAR

```bash
mvn package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

---

# 7. Testing the Endpoint

Open a browser or Postman and hit:

```
http://localhost:8080/api/hello
```

Response:

```
Hello, Spring Boot!
```

Congratulations — your Spring Boot application is running.

---

# 8. Understanding What Just Happened

Behind the scenes, Spring Boot:

- Started the embedded Tomcat server
- Registered DispatcherServlet
- Mapped your controller
- Converted the response automatically
- Returned HTTP response to client

All with minimal configuration.

---

# 9. Common Beginner Mistakes

- Placing controllers outside base package
- Forgetting `@RestController`
- Port conflicts (8080 already in use)
- Missing dependencies

Spring Boot error messages usually guide you clearly.

---

# 10. Best Practices

- Keep main class in root package
- Follow layered structure as app grows
- Use REST controllers for APIs
- Keep application small and incremental

---

# 11. Summary

- Creating a Spring Boot app is quick and simple
- Spring Initializr sets up everything
- Minimal configuration is needed
- Embedded server runs out of the box
- Ideal for rapid development

---

# What's Next?

Next post:

**28 - Embedded Web Servers (Tomcat, Jetty, Netty)**

We’ll explore how Spring Boot embeds web servers and how to customize them.
