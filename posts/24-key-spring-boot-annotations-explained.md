---
title: "24 - Key Spring Boot Annotations Explained"
date: "15-12-2025"
tags: ["Java","Spring Boot","Annotations","Core Features","Backend"]
summary: "A focused explanation of the most important Spring Boot annotations, how they work together, and why they are essential to building clean, production-ready Spring Boot applications."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 24
---

Spring Boot relies heavily on **annotations** to reduce configuration and make applications concise, readable, and maintainable.  
While Spring Core annotations define the foundation, Spring Boot adds its own **opinionated, productivity-focused annotations**.

This post explains the **key Spring Boot annotations** you must understand to work effectively with core features.

---

# 1. @SpringBootApplication (The Entry Point)

This is the most important annotation in any Spring Boot application.

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

It is a **meta-annotation** composed of:

- `@Configuration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

It tells Spring Boot to:
- Start auto-configuration
- Scan components
- Bootstrap the application context

---

# 2. @EnableAutoConfiguration

This annotation enables Spring Boot’s **auto-configuration mechanism**.

What it does:
- Scans the classpath
- Detects available libraries
- Applies conditional configuration
- Registers beans automatically

You almost never use it directly because it’s already included in `@SpringBootApplication`.

---

# 3. @Configuration

Marks a class as a configuration source.

```java
@Configuration
public class AppConfig { }
```

Use it to:
- Define beans using `@Bean`
- Group related configuration
- Override auto-configured beans

---

# 4. @Bean

Used to create a bean manually.

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper();
}
```

Common use cases:
- Third-party libraries
- Custom initialization logic
- Overriding auto-configured beans

---

# 5. Stereotype Annotations

Spring Boot builds on Spring stereotypes to organize layers.

---

## 5.1 @Component

Generic component annotation.

```java
@Component
public class UtilityService { }
```

---

## 5.2 @Service

Represents the business logic layer.

```java
@Service
public class OrderService { }
```

---

## 5.3 @Repository

Used for data access layers.

```java
@Repository
public class UserRepository { }
```

Benefits:
- Semantic clarity
- Automatic exception translation

---

## 5.4 @Controller vs @RestController

```java
@Controller
public class HomeController { }
```

```java
@RestController
public class UserController { }
```

- `@Controller` → returns views
- `@RestController` → returns JSON/XML responses

`@RestController` is a combination of:
- `@Controller`
- `@ResponseBody`

---

# 6. Dependency Injection Annotations

---

## 6.1 Constructor Injection (Recommended)

```java
@Service
public class PaymentService {

    private final Gateway gateway;

    public PaymentService(Gateway gateway) {
        this.gateway = gateway;
    }
}
```

Spring Boot automatically injects dependencies without `@Autowired`.

---

## 6.2 @Autowired

Used to inject dependencies explicitly.

```java
@Autowired
private UserService userService;
```

Constructor injection is preferred over field injection.

---

## 6.3 @Qualifier and @Primary

Used when multiple beans of the same type exist.

```java
@Qualifier("stripeGateway")
```

```java
@Primary
@Service
public class DefaultGateway { }
```

---

# 7. Web Mapping Annotations

---

## 7.1 @RequestMapping

Base request mapping.

```java
@RequestMapping("/api")
```

---

## 7.2 HTTP Method Annotations

```java
@GetMapping
@PostMapping
@PutMapping
@DeleteMapping
```

These map HTTP methods directly.

---

# 8. Configuration & Environment Annotations

---

## 8.1 @Value

Injects configuration values.

```java
@Value("${server.port}")
private int port;
```

---

## 8.2 @Profile

Activates beans conditionally based on environment.

```java
@Profile("dev")
```

---

# 9. Lifecycle & Utility Annotations

---

## 9.1 @PostConstruct & @PreDestroy

Used for initialization and cleanup logic.

---

## 9.2 @Transactional

Manages database transactions.

```java
@Transactional
public void placeOrder() { }
```

---

# 10. Best Practices

- Use `@SpringBootApplication` only once
- Prefer constructor injection
- Use stereotypes for layer clarity
- Avoid overusing annotations
- Understand what each annotation actually does

---

# 11. Summary

- Annotations are central to Spring Boot
- `@SpringBootApplication` bootstraps everything
- Auto-configuration is enabled implicitly
- Stereotypes define application layers
- Proper usage leads to clean, maintainable code

---

# What's Next?

Next post:

**25 - Auto-Configuration: How Spring Boot Does Magic**

We’ll deep dive into the internal mechanics behind Spring Boot’s auto-configuration.
