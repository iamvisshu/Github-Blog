---
title: "05 - Running Your First Spring Boot Application"
date: "26-11-2025"
tags: ["Java","Spring Boot","Backend","Beginner"]
summary: "A hands-on walkthrough to running your first Spring Boot application, understanding its structure, and verifying everything works correctly using the embedded server."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 5
---

You have installed Java, Maven, and your IDE. Now it's time to **run your first Spring Boot application**.

Spring Boot makes this incredibly simple because it provides:
- An embedded server  
- Auto-configuration  
- Zero setup requirements  

In this post, you'll learn what happens when a Spring Boot application starts and how to verify it's working properly.

---

# 1. Create a Spring Boot Project

To run your first Spring Boot application, start by generating a project using **Spring Initializr**.

Open:  
https://start.spring.io

Select:

- Project: **Maven**
- Language: **Java**
- Spring Boot Version: **3.x**
- Dependencies: **Spring Web**

Click **Generate**, then extract the project and open it in your IDE.

---

# 2. Understanding the Project Structure

A fresh Spring Boot project looks like this:

```
src/
 ├── main/
 │   ├── java/
 │   │   └── com.example.demo/
 │   │       └── DemoApplication.java
 │   └── resources/
 │       ├── application.properties
 │       ├── static/
 │       └── templates/
 └── test/
     └── java/
```

Let's break it down:

- **DemoApplication.java**  
  The main class that starts the Spring Boot application.

- **application.properties**  
  Where configuration goes (port, DB settings, etc.)

- **static/**  
  Stores static files like CSS, JS, images.

- **templates/**  
  Stores server-side view templates (Thymeleaf, FreeMarker).

---

# 3. The Main Class Explained

Open the main class:

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### What does `@SpringBootApplication` do?

It's a combination of:
- `@Configuration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

This tells Spring Boot to:
1. Configure the app automatically  
2. Scan for components  
3. Load beans into the IoC container  

---

# 4. Run the Spring Boot Application

You can run the project in **two ways**:

---

## 4.1 Run from IDE

In IntelliJ / STS / Eclipse, click the green **Run** button next to the main class.

You should see logs like:

```
Tomcat started on port 8080
Started DemoApplication in 2.345 seconds
```

This means the application successfully started.

---

## 4.2 Run from Terminal

Navigate to your project folder and run:

```bash
mvn spring-boot:run
```

Or build a jar file:

```bash
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

---

# 5. Test the Application

Spring Boot starts an embedded server on port **8080** by default.

Open in your browser:

```
http://localhost:8080
```

You should see a generic **Whitelabel Error Page**.

This is expected because you haven't created any endpoints yet.

---

# 6. Create Your First REST Endpoint

Let's add a simple REST Controller.

Create a file:

```
src/main/java/com/example/demo/HelloController.java
```

Paste this code:

```java
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, Spring Boot!";
    }
}
```

Restart the application and visit:

```
http://localhost:8080/hello
```

You should see:

```
Hello, Spring Boot!
```

Congratulations — you've successfully created and run your first Spring Boot application.

---

# 7. What Happens Behind the Scenes?

When the application starts:

1. Spring Boot loads auto-configuration  
2. An embedded **Tomcat server** starts  
3. Beans are scanned and initialized  
4. Routes are mapped  
5. Application logs are printed to the console  

All without configuring a single XML file.

---

# 8. Common Issues & Fixes

### Problem: `java: command not found`
Java is not added to PATH.  
Fix: Update environment variables.

### Problem: Maven build failure
Run:
```bash
mvn -version
```
Ensure Maven is installed and PATH is correctly set.

### Problem: Port already in use
Change the port in:
```
application.properties

server.port=9090
```

---

# What's Next?

In the next post:

**06 - Inversion of Control (IoC) in Spring**

We'll explore the core concept that powers all of Spring and Spring Boot.
