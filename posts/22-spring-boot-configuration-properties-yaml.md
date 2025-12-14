---
title: "22 - Spring Boot Configuration: application.properties & application.yml"
date: "13-12-2025"
tags: ["Java","Spring Boot","Configuration","application.properties","YAML"]
summary: "A complete guide to Spring Boot configuration using application.properties and application.yml, including property sources, profiles, precedence, and best practices for real-world applications."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 22
---

Configuration is a core part of any real-world application.  
Spring Boot provides a powerful, flexible, and developer-friendly way to manage configuration using **application.properties** and **application.yml**.

This post explains how Spring Boot configuration works, how properties are loaded, and how to use them effectively.

---

# 1. Why Configuration Matters

Configuration allows you to:
- Change behavior without changing code  
- Separate environment-specific settings  
- Manage secrets and credentials  
- Tune performance and features  

Spring Boot follows the principle of **externalized configuration**.

---

# 2. application.properties vs application.yml

Spring Boot supports two primary configuration formats.

---

## 2.1 application.properties

Key-value based configuration.

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/appdb
spring.jpa.show-sql=true
```

### Pros:
- Simple and familiar  
- Easy to read for small configs  

---

## 2.2 application.yml (YAML)

Hierarchical, structured configuration.

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/appdb
  jpa:
    show-sql: true
```

### Pros:
- Clean and structured  
- Better for large configurations  
- Less repetition  

Spring Boot treats **both formats equally** — choose one, not both.

---

# 3. Configuration File Location

Spring Boot looks for configuration files in this order:

1. `classpath:/config/`
2. `classpath:/`
3. `file:./config/`
4. `file:./`

This allows flexible overrides without rebuilding the application.

---

# 4. Property Precedence (Important)

Spring Boot resolves properties using a strict order of precedence.

From highest to lowest:

1. Command-line arguments  
2. Java system properties  
3. OS environment variables  
4. application-{profile}.properties/yml  
5. application.properties/yml  
6. Default values  

Higher precedence values override lower ones.

---

# 5. Using Profiles (dev, test, prod)

Profiles allow environment-specific configuration.

---

## 5.1 Defining Profile Files

```properties
application-dev.properties
application-prod.properties
```

---

## 5.2 Activating Profiles

### Using properties:
```properties
spring.profiles.active=dev
```

### Using command line:
```bash
java -jar app.jar --spring.profiles.active=prod
```

---

# 6. Reading Configuration Values in Code

---

## 6.1 Using @Value

```java
@Value("${server.port}")
private int port;
```

---

## 6.2 Using @ConfigurationProperties (Recommended)

```java
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private int timeout;
}
```

This approach is:
- Type-safe  
- Clean  
- Scalable  

---

# 7. Environment Variables Support

Spring Boot maps environment variables automatically.

Example:
```
SPRING_DATASOURCE_URL
```

Maps to:
```
spring.datasource.url
```

This is widely used in Docker and cloud deployments.

---

# 8. Securing Sensitive Configuration

### ❌ Avoid hardcoding secrets
Never commit passwords or API keys.

### ✔ Use:
- Environment variables  
- External config files  
- Vault services  

---

# 9. Common Configuration Mistakes

- Mixing properties and YAML in the same project  
- Committing secrets to Git  
- Not using profiles  
- Ignoring property precedence  

---

# 10. Best Practices

- Use YAML for complex configs  
- Use profiles for environments  
- Use @ConfigurationProperties for grouping  
- Externalize secrets  
- Keep config minimal and readable  

---

# 11. Summary

- Spring Boot supports properties and YAML  
- Configuration is externalized by design  
- Profiles enable environment-specific behavior  
- Property precedence determines overrides  
- Proper configuration is critical for production apps  

With this post, we complete the **Spring Core Concepts** series.

---

# What's Next?

Next series:

**Spring Boot REST APIs**

We’ll start building real APIs using controllers, request mappings, validation, and exception handling.
