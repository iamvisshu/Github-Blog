---
title: "12 - Understanding @PostConstruct and @PreDestroy"
date: "03-12-2025"
tags: ["Java","Spring","PostConstruct","PreDestroy","Bean Lifecycle","Spring Boot"]
summary: "A clear and practical explanation of @PostConstruct and @PreDestroy annotations, how Spring uses them in the bean lifecycle, and when developers should apply them in real-world applications."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 12
---

Spring provides lifecycle callback annotations to execute code **right after a bean is created** and **right before it is destroyed**.

These annotations are:

- `@PostConstruct`
- `@PreDestroy`

They are extremely useful for initialization tasks, cleanup logic, loading config, and preparing resources.

---

# 1. What Is @PostConstruct?

`@PostConstruct` marks a method that should run **immediately after the bean is fully initialized**.

This means:
- Bean is created  
- Dependencies are injected  
- Properties are set  

Only then does the `@PostConstruct` method execute.

### Example

```java
@Component
public class CacheLoader {

    @PostConstruct
    public void loadCache() {
        System.out.println("Cache initialized!");
    }
}
```

### When to use @PostConstruct?

Use it for tasks that must run **once at startup**, such as:
- Loading initial data  
- Setting up connections  
- Validating configuration  
- Initializing in-memory caches  
- Logging startup status  

---

# 2. What Is @PreDestroy?

`@PreDestroy` marks a method to execute **just before a bean is destroyed**.

It helps with resource cleanup.

### Example

```java
@Component
public class CacheLoader {

    @PreDestroy
    public void clearCache() {
        System.out.println("Cache cleared before shutdown.");
    }
}
```

### When to use @PreDestroy?

Use it for:
- Closing database connections  
- Stopping background tasks  
- Releasing external resources  
- Saving temporary data  
- Flushing caches  

---

# 3. Where Do These Annotations Come From?

Originally:
- `@PostConstruct` and `@PreDestroy` came from **Jakarta (javax) annotations**  
- As of Spring Framework 6+, they use the **jakarta.annotation** package

Spring Boot supports both depending on the version.

---

# 4. Execution Order in Bean Lifecycle

Here's how these annotations fit into the lifecycle:

```
Bean Instantiation →
Dependency Injection →
@PostConstruct →
Bean Ready →
Application Running →
@PreDestroy →
Bean Destroyed
```

---

# 5. Using Initialization and Destruction Methods with @Bean

When using `@Configuration` and `@Bean`, you can also specify:

```java
@Bean(initMethod = "startup", destroyMethod = "shutdown")
public EmailService emailService() {
    return new EmailService();
}
```

Equivalent to:

- `@PostConstruct → startup()`
- `@PreDestroy → shutdown()`

---

# 6. @PostConstruct vs InitializingBean vs BeanPostProcessor

| Feature             | @PostConstruct             | InitializingBean     | BeanPostProcessor             |
|---------------------|----------------------------|----------------------|-------------------------------|
| When Called         | After dependency injection | After properties set | Before & after initialization |
| Requires Interface? | No                         | Yes                  | Yes                           |
| Common Use          | Init logic                 | Custom lifecycle     | Modify or wrap beans          |

`@PostConstruct` is the **cleanest**, recommended approach.

---

# 7. Real-World Example

```java
@Service
public class EmailService {

    private EmailClient client;

    @PostConstruct
    public void connect() {
        client = new EmailClient("smtp.server.com");
        client.initialize();
        System.out.println("Email service connected.");
    }

    @PreDestroy
    public void disconnect() {
        client.shutdown();
        System.out.println("Email service disconnected.");
    }
}
```

This pattern is very common in production systems.

---

# 8. Best Practices

### ✔ Prefer @PostConstruct & @PreDestroy over interfaces  
Cleaner and annotation-based.

### ✔ Keep initialization light  
Heavy operations increase startup time.

### ✔ Release resources in @PreDestroy  
Otherwise, memory leaks or connection leaks may occur.

### ✔ Use @Bean's initMethod/destroyMethod for third-party classes  
When you cannot modify the source code.

---

# 9. Summary

- `@PostConstruct` runs after bean creation and dependency injection.  
- `@PreDestroy` runs before bean destruction (application shutdown).  
- Useful for initialization, validation, cleanup, and resource management.  
- Supported by Spring Boot and commonly used in real-world applications.

---

# What's Next?

Next post:

**13 - Component Scanning Explained (@ComponentScan)**

We'll look at how Spring automatically detects beans in your project using component scanning.
