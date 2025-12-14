---
title: "19 - Key Spring Boot Annotations Explained"
date: "10-12-2025"
tags: ["Java","Spring Boot","Annotations","Backend"]
summary: "A comprehensive guide to the most important Spring Boot annotations, explaining what they do, why they exist, and how they work together to power modern Spring Boot applications."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 19
---

Spring Boot relies heavily on **annotations** to reduce configuration and make applications easy to read, write, and maintain.  
Understanding the most commonly used annotations is essential to becoming productive with Spring Boot.

This post explains the **core Spring Boot annotations**, grouped by purpose, with practical explanations and examples.

---

# 1. Application-Level Annotations

These annotations define and bootstrap your Spring Boot application.

---

## 1.1 @SpringBootApplication

This is the **most important annotation** in Spring Boot.

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

It is a combination of:
- `@Configuration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

It tells Spring Boot to:
- Start auto-configuration
- Scan components
- Initialize the application context

---

## 1.2 @EnableAutoConfiguration

Enables Spring Boot’s auto-configuration mechanism.

Spring Boot automatically configures beans based on:
- Classpath dependencies
- Application properties
- Environment

You rarely use this annotation directly because it’s already included.

---

# 2. Bean & Configuration Annotations

These annotations define beans and configuration classes.

---

## 2.1 @Configuration

Marks a class as a source of bean definitions.

```java
@Configuration
public class AppConfig { }
```

---

## 2.2 @Bean

Defines a bean manually.

```java
@Bean
public ObjectMapper objectMapper() {
    return new ObjectMapper();
}
```

Used mainly for:
- Third-party libraries
- Custom initialization

---

# 3. Stereotype Annotations

These annotations help Spring identify components.

---

## 3.1 @Component

Generic component annotation.

```java
@Component
public class EmailService { }
```

---

## 3.2 @Service

Used for business logic.

```java
@Service
public class PaymentService { }
```

---

## 3.3 @Repository

Used for data access layers.

```java
@Repository
public class UserRepository { }
```

Provides automatic exception translation.

---

## 3.4 @Controller & @RestController

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

---

# 4. Dependency Injection Annotations

These annotations handle wiring between beans.

---

## 4.1 @Autowired

Injects dependencies automatically.

```java
@Autowired
private UserService userService;
```

Constructor injection is preferred.

---

## 4.2 @Qualifier

Resolves ambiguity when multiple beans exist.

```java
@Qualifier("paypalService")
```

---

## 4.3 @Primary

Marks a bean as default.

```java
@Primary
@Service
public class DefaultPaymentService { }
```

---

# 5. Web & Request Mapping Annotations

Used in REST APIs and web controllers.

---

## 5.1 @RequestMapping

Maps HTTP requests to handler methods.

```java
@RequestMapping("/api")
```

---

## 5.2 @GetMapping, @PostMapping, @PutMapping, @DeleteMapping

```java
@GetMapping("/users")
```

These map specific HTTP methods.

---

## 5.3 @PathVariable & @RequestParam

```java
@GetMapping("/users/{id}")
public User get(@PathVariable Long id) { }
```

```java
@RequestParam String name
```

---

## 5.4 @RequestBody

Maps request body to Java object.

```java
@PostMapping("/users")
public User save(@RequestBody User user) { }
```

---

# 6. Configuration & Environment Annotations

---

## 6.1 @Value

Injects property values.

```java
@Value("${server.port}")
private int port;
```

---

## 6.2 @Profile

Loads beans conditionally based on environment.

```java
@Profile("dev")
```

---

# 7. Lifecycle & Utility Annotations

---

## 7.1 @PostConstruct & @PreDestroy

Used for initialization and cleanup logic.

---

## 7.2 @Transactional

Manages database transactions.

```java
@Transactional
public void saveOrder() { }
```

---

# 8. Best Practices

- Prefer constructor injection
- Use `@RestController` for APIs
- Avoid overusing annotations
- Group configuration logically
- Understand what each annotation does

---

# 9. Summary

- Annotations are the backbone of Spring Boot
- `@SpringBootApplication` starts everything
- Stereotype annotations define layers
- DI annotations wire dependencies
- Web annotations power REST APIs

Mastering these annotations will make Spring Boot development intuitive and efficient.

---

# What's Next?

Next post:

**20 - Auto-Configuration in Spring Boot (How It Really Works)**

We’ll deep dive into the magic behind Spring Boot auto-configuration.
