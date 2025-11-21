---
title: "11 - Creating Beans: @Component, @Service, @Repository, @Configuration & @Bean"
date: "02-12-2025"
tags: ["Java","Spring","Beans","Component","Service","Repository","Configuration","Bean","Spring Boot"]
summary: "A detailed guide on how to create beans in Spring using @Component, @Service, @Repository, @Configuration, and @Bean, explaining the differences and best use cases for each annotation."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 11
---

Spring manages objects as **Beans**, and understanding how to create these beans is essential for mastering the Spring Framework and Spring Boot.  
This post explains all the common annotations used to register beans inside the Spring IoC container:

- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@Configuration`
- `@Bean`

Each serves a specific purpose and fits into Spring's architecture differently.

---

# 1. What Is a Spring Bean?

A **Bean** is simply a Java object that Spring creates, manages, and wires using the IoC container.

Spring controls:
- Object creation  
- Dependency injection  
- Lifecycle  
- Scopes  

To enable Spring to manage a class as a bean, you must annotate it or declare it.

---

# 2. Creating Beans Using Annotations

Spring provides stereotype annotations to automatically detect and register components.

---

# 2.1 @Component (Generic Bean)

`@Component` marks a class as a general-purpose bean.

```java
@Component
public class EmailValidator { }
```

Spring will:
- Detect it during component scanning
- Create an instance
- Store it in the application context

Use it when:
- The class doesn't fit any specific stereotype

---

# 2.2 @Service (Business Logic Layer)

`@Service` is a specialization of `@Component`.

```java
@Service
public class PaymentService {
    public void processPayment() { }
}
```

Use it for:
- Business logic  
- Service classes  
- Transactional operations  

Spring may apply additional features under the hood, such as AOP proxies.

---

# 2.3 @Repository (Data Access Layer)

`@Repository` is also a specialization of `@Component`.

```java
@Repository
public class UserRepository {
    public User findById(Long id) { return null; }
}
```

Use it for:
- DAO classes  
- Database interactions  
- JDBC or JPA logic  

It also enables:
- Automatic exception translation  
  (Converts SQLExceptions to Spring DataAccessExceptions)

---

# 2.4 @Controller (Web Layer)

`@Controller` is used in Spring MVC web applications.

```java
@Controller
public class HomeController {
    @GetMapping("/")
    public String home() { return "index"; }
}
```

Use it for:
- Handling web requests  
- Returning views (Thymeleaf, JSP)

In REST APIs, we use `@RestController` (covered later in REST section).

---

# 3. Creating Beans Using @Configuration and @Bean

Sometimes you want fine‑grained control — in those cases, use:

---

## 3.1 @Configuration

Marks a class that declares one or more beans.

```java
@Configuration
public class AppConfig { }
```

---

## 3.2 @Bean (Manual Bean Creation)

Used inside a `@Configuration` class to create a bean manually.

```java
@Configuration
public class AppConfig {

    @Bean
    public EmailService emailService() {
        return new EmailService();
    }
}
```

Use `@Bean` when:
- You need custom logic during bean creation  
- You need to integrate third‑party libraries  
- You don't control the source code of the class  

---

# 4. Component Scanning

Spring automatically detects annotated classes via:

```java
@SpringBootApplication
@ComponentScan("com.example")
public class DemoApplication { }
```

Recommended for:
- Most Spring Boot applications  
- When using annotations like `@Component`, `@Service`, `@Repository`  

---

# 5. @Component vs @Service vs @Repository vs @Controller

| Annotation    | Purpose        | Layer         |
|---------------|----------------|---------------|
| `@Component`  | Generic bean   | Any           |
| `@Service`    | Business logic | Service layer |
| `@Repository` | Data access    | DAO layer     |
| `@Controller` | MVC Controller | Web layer     |

Internally, all of these are treated as components in the IoC container.

---

# 6. When to Use @Bean?

Use `@Bean` when:
- You need to create objects from external libraries  
- You need more configuration control  
- Object creation requires parameters or custom setup  
- You want to override Spring Boot auto-configured beans  

Example:

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper()
            .enable(SerializationFeature.INDENT_OUTPUT);
}
```

---

# 7. Best Practices

### ✔ Prefer `@Component`, `@Service`, `@Repository`  
Spring Boot auto‑configuration works best with component scanning.

### ✔ Use `@Bean` only when necessary  
For third‑party classes or complex initialization.

### ✔ Follow layered architecture  
- Controllers  
- Services  
- Repositories  

### ✔ Keep configuration inside dedicated classes  
Use `@Configuration` and `@Bean` for clean structure.

---

# 8. Summary

- Use `@Component` for general beans.  
- Use `@Service`, `@Repository`, and `@Controller` for layered architecture.  
- Use `@Configuration` and `@Bean` for manual or external class creation.  
- Spring Boot auto-detects and registers beans during component scanning.

This knowledge is essential for mastering Spring Boot internals.

---

# What's Next?

Next post:

**12 - Understanding @PostConstruct and @PreDestroy**

We explore lifecycle callbacks that help you run code at startup and before shutdown.
