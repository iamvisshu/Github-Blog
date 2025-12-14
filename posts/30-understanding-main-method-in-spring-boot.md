---
title: "30 - Understanding the main() Method in Spring Boot"
date: "21-12-2025"
tags: ["Java","Spring Boot","main method","SpringApplication","Core Features"]
summary: "A deep dive into the main() method in Spring Boot, explaining SpringApplication.run(), what happens internally, customization options, and best practices."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 30
---

At the center of every Spring Boot application lies a **simple `main()` method**.  
While it looks like plain Java, this method triggers a powerful and complex bootstrapping process.

In this post, we’ll zoom in on the `main()` method and understand **what really happens when a Spring Boot app starts**.

---

# 1. The main() Method in Spring Boot

A typical Spring Boot application starts like this:

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

This is a **standard Java entry point**, but the call to `SpringApplication.run()` is where Spring Boot takes over.

---

# 2. What Is SpringApplication?

`SpringApplication` is a helper class provided by Spring Boot that:

- Bootstraps the Spring application
- Creates the ApplicationContext
- Triggers auto-configuration
- Starts the embedded web server
- Publishes lifecycle events

It acts as the **orchestrator** of the startup process.

---

# 3. What Happens Inside SpringApplication.run()?

Internally, `SpringApplication.run()` performs these steps:

1. Creates a `SpringApplication` instance  
2. Determines application type (web, reactive, non-web)  
3. Prepares the Environment  
4. Creates the ApplicationContext  
5. Loads bean definitions  
6. Applies auto-configuration  
7. Refreshes the context  
8. Starts the embedded server  
9. Publishes startup events  

All of this is triggered by a single method call.

---

# 4. Application Type Detection

Spring Boot automatically detects the application type based on the classpath:

- Servlet-based → Spring MVC
- Reactive → Spring WebFlux
- Non-web → CLI applications

This detection decides which ApplicationContext implementation to use.

---

# 5. Customizing SpringApplication

Instead of calling `run()` directly, you can customize behavior.

```java
public static void main(String[] args) {
    SpringApplication app = new SpringApplication(DemoApplication.class);
    app.setBannerMode(Banner.Mode.OFF);
    app.run(args);
}
```

Common customizations include:
- Disabling banner
- Setting default profiles
- Adding listeners
- Customizing startup behavior

---

# 6. CommandLineRunner & ApplicationRunner

Spring Boot provides hooks to run code after startup.

---

## 6.1 CommandLineRunner

```java
@Component
public class StartupRunner implements CommandLineRunner {

    @Override
    public void run(String... args) {
        System.out.println("Application started!");
    }
}
```

---

## 6.2 ApplicationRunner

```java
@Component
public class AppRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        System.out.println("Application ready!");
    }
}
```

Both execute **after the context is fully initialized**.

---

# 7. Passing Command-Line Arguments

Arguments passed to `main()` are available to Spring:

```bash
java -jar app.jar --server.port=9090
```

Access them using:
- `ApplicationArguments`
- `@Value`
- Environment

This enables runtime customization without code changes.

---

# 8. Common Mistakes

- Placing `main()` outside the root package
- Heavy logic inside `main()`
- Ignoring startup arguments
- Multiple `@SpringBootApplication` classes

The `main()` method should remain **light and focused**.

---

# 9. Best Practices

- Keep `main()` minimal
- Use SpringApplication customization sparingly
- Use runners for startup logic
- Prefer configuration over code
- Let Spring Boot manage the lifecycle

---

# 10. Summary

- `main()` is the Java entry point
- `SpringApplication.run()` boots the entire app
- Application type is auto-detected
- Embedded server starts automatically
- Customization is possible but optional

Understanding this method gives you confidence in how Spring Boot applications start and run.

---

# What's Next?

Next post:

**31 - Best Practices for Spring Boot Applications**

We’ll cover architectural, coding, and configuration best practices for real-world projects.
