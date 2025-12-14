---
title: "32 - application.properties vs application.yml in Spring Boot"
date: "23-12-2025"
tags: ["Java","Spring Boot","Configuration","application.properties","application.yml","Core Features"]
summary: "A detailed comparison of application.properties and application.yml in Spring Boot, explaining differences, use cases, structure, readability, and best practices."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 32
---

Spring Boot supports **two primary configuration formats**:  
`application.properties` and `application.yml`.

Both achieve the same goal—externalized configuration—but they differ significantly in **syntax, structure, and readability**.  
Choosing the right one improves maintainability and reduces configuration errors.

---

# 1. What Is application.properties?

`application.properties` uses a **key=value** format.

Example:

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/appdb
spring.datasource.username=root
spring.jpa.show-sql=true
```

### Characteristics:
- Flat structure
- Simple syntax
- Easy for small projects
- Familiar to most Java developers

---

# 2. What Is application.yml?

`application.yml` uses **YAML (Yet Another Markup Language)**, which supports hierarchical configuration.

Example:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/appdb
    username: root
  jpa:
    show-sql: true
```

### Characteristics:
- Hierarchical structure
- Clean and readable
- Ideal for large configurations
- Less repetition

---

# 3. Key Differences at a Glance

| Feature | application.properties | application.yml |
|------|------------------------|-----------------|
| Format | Key-value | Hierarchical |
| Readability | Medium | High |
| Nesting | Not supported | Supported |
| File Size | Larger for big configs | Compact |
| Error Sensitivity | Low | Indentation-sensitive |

Both formats are **equally supported** by Spring Boot.

---

# 4. Configuration Binding Example

Using `@ConfigurationProperties`:

### application.properties

```properties
app.name=demo
app.timeout=30
```

### application.yml

```yaml
app:
  name: demo
  timeout: 30
```

Both map cleanly to:

```java
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private int timeout;
}
```

---

# 5. Profile-Specific Configuration

Spring Boot supports profiles in both formats.

---

## 5.1 Using application.properties

```
application-dev.properties
application-prod.properties
```

---

## 5.2 Using application.yml

```yaml
spring:
  profiles:
    active: dev
```

Or profile-specific YAML files:

```
application-dev.yml
application-prod.yml
```

---

# 6. Common Mistakes

### ❌ Mixing both formats in the same project  
Choose one format and stick to it.

### ❌ Incorrect indentation in YAML  
YAML is whitespace-sensitive.

### ❌ Hardcoding secrets  
Always externalize sensitive values.

---

# 7. When to Use application.properties

Use it when:
- Project is small
- Configuration is minimal
- Team prefers simplicity
- Flat structure is sufficient

---

# 8. When to Use application.yml

Use it when:
- Configuration is large or complex
- Multiple environments exist
- Nested properties are common
- Readability matters

---

# 9. Best Practices

- Choose **one format per project**
- Prefer YAML for medium to large applications
- Use `@ConfigurationProperties` for grouping
- Externalize secrets using env variables
- Validate configuration at startup

---

# 10. Summary

- Both formats are fully supported
- YAML offers better structure and readability
- Properties files are simpler and safer for small configs
- Spring Boot treats both equally
- Consistency is more important than choice

---

# What's Next?

Next post:

**33 - Profiles & Environment Configuration (@Profile)**

We’ll explore how Spring Boot handles environment-specific behavior cleanly.
