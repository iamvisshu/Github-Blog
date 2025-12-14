---
title: "33 - Profiles & Environment Configuration in Spring Boot (@Profile)"
date: "24-12-2025"
tags: ["Java","Spring Boot","Profiles","Configuration","@Profile","Core Features"]
summary: "A complete guide to Spring Boot profiles and environment-based configuration, explaining @Profile, profile-specific properties, activation methods, and best practices for real-world applications."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 33
---

Modern applications run in **multiple environments**—development, testing, staging, and production.  
Spring Boot provides **Profiles** to manage environment-specific configuration cleanly without changing code.

This post explains **how profiles work**, how to configure them, and how to use them effectively.

---

# 1. What Is a Spring Profile?

A **Spring Profile** represents a named logical environment.

Common profiles:
- `dev`
- `test`
- `qa`
- `prod`

Profiles allow Spring Boot to:
- Load different configuration
- Enable/disable beans
- Change behavior per environment

---

# 2. Why Profiles Are Important

Without profiles, developers often:
- Hardcode values
- Use if-else logic
- Maintain multiple branches

Profiles solve this by:
- Keeping code clean
- Centralizing configuration
- Supporting CI/CD pipelines
- Improving security

---

# 3. Profile-Specific Configuration Files

Spring Boot automatically detects profile-specific files.

---

## 3.1 application.properties Example

```
application-dev.properties
application-prod.properties
```

---

## 3.2 application.yml Example

```yaml
spring:
  profiles:
    active: dev
```

And profile-specific files:

```
application-dev.yml
application-prod.yml
```

---

# 4. Activating Profiles

Profiles can be activated in multiple ways.

---

## 4.1 Using application.properties

```properties
spring.profiles.active=dev
```

---

## 4.2 Using Command Line

```bash
java -jar app.jar --spring.profiles.active=prod
```

---

## 4.3 Using Environment Variables

```
SPRING_PROFILES_ACTIVE=prod
```

This is commonly used in Docker and cloud deployments.

---

# 5. Using @Profile on Beans

You can conditionally load beans using `@Profile`.

```java
@Service
@Profile("dev")
public class DevEmailService { }
```

```java
@Service
@Profile("prod")
public class ProdEmailService { }
```

Only one bean is loaded based on the active profile.

---

# 6. Using @Profile with @Configuration

```java
@Configuration
@Profile("test")
public class TestConfig { }
```

Useful for:
- Mock beans
- Test-specific setup
- Local development tools

---

# 7. Multiple Active Profiles

Spring Boot supports multiple profiles at once.

```properties
spring.profiles.active=dev,feature-x
```

Profiles are applied **in order**, later ones overriding earlier ones.

---

# 8. Default Profile

If no profile is active, Spring Boot uses:

```
default
```

You can define default configuration in:
- application.properties
- application.yml

---

# 9. Common Mistakes

- Hardcoding profiles in code
- Committing prod secrets
- Forgetting to activate correct profile
- Mixing environment logic inside services

---

# 10. Best Practices

- Use profiles only for environment differences
- Keep profile names simple
- Externalize secrets using environment variables
- Use @Profile for infrastructure beans
- Avoid business logic differences across profiles

---

# 11. Real-World Example

Development:
- In-memory DB
- Debug logging

Production:
- External DB
- Optimized logging
- Security enabled

Profiles make this switch effortless.

---

# 12. Summary

- Profiles enable environment-based configuration
- Profile-specific files are auto-detected
- Profiles can activate beans conditionally
- Multiple activation methods exist
- Profiles are essential for production-ready apps

---

# What's Next?

Next post:

**34 - Spring Boot Logging – Complete Guide**

We’ll explore logging configuration, levels, and best practices.
