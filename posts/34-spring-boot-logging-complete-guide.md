---
title: "34 - Spring Boot Logging – Complete Guide"
date: "25-12-2025"
tags: ["Java","Spring Boot","Logging","Logback","Core Features"]
summary: "A complete guide to logging in Spring Boot, covering default logging setup, Logback configuration, log levels, profiles, and best practices for production systems."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 34
---

Logging is one of the most critical aspects of any production-ready application.  
Spring Boot provides **sensible default logging** out of the box while allowing deep customization when needed.

This post explains **how logging works in Spring Boot**, how to configure it, and how to apply best practices.

---

# 1. Why Logging Matters

Proper logging helps you:
- Debug issues quickly
- Monitor application behavior
- Investigate production failures
- Understand performance bottlenecks

Without good logging, troubleshooting becomes guesswork.

---

# 2. Default Logging in Spring Boot

Spring Boot uses **Logback** as the default logging framework.

Out of the box, it provides:
- Console logging
- Preconfigured log format
- Sensible log levels

You get logging without writing any configuration.

---

# 3. Logging Abstraction: SLF4J

Spring Boot uses **SLF4J** as a logging facade.

You should always code against SLF4J:

```java
private static final Logger log =
        LoggerFactory.getLogger(MyService.class);

log.info("Application started");
```

This keeps your code independent of the underlying logging implementation.

---

# 4. Log Levels Explained

Spring Boot supports standard log levels:

| Level | Usage |
|-----|-------|
| TRACE | Very detailed, diagnostic |
| DEBUG | Development debugging |
| INFO | General application flow |
| WARN | Potential problems |
| ERROR | Failures and exceptions |

---

# 5. Configuring Log Levels

You can configure logging levels in `application.properties` or `application.yml`.

```properties
logging.level.root=INFO
logging.level.org.springframework=INFO
logging.level.com.example=DEBUG
```

This allows fine-grained control per package.

---

# 6. Logback Configuration (Advanced)

For advanced needs, use a `logback-spring.xml` file.

Example:

```xml
<configuration>
    <appender name="CONSOLE"
              class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5level %logger - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
    </root>
</configuration>
```

Spring Boot automatically detects this file.

---

# 7. File Logging

Enable file logging easily:

```properties
logging.file.name=app.log
logging.file.path=/var/logs
```

This is essential for production environments.

---

# 8. Logging with Profiles

Different environments require different logging levels.

Example:

```properties
# application-dev.properties
logging.level.root=DEBUG
```

```properties
# application-prod.properties
logging.level.root=INFO
```

Profiles allow safe and clean separation.

---

# 9. Logging Exceptions Correctly

Always log exceptions properly:

```java
try {
    process();
} catch (Exception e) {
    log.error("Processing failed", e);
}
```

Avoid:
- Swallowing exceptions
- Logging stack traces as strings

---

# 10. Common Logging Mistakes

- Using System.out.println
- Logging sensitive data
- Excessive DEBUG logging in production
- Logging inside tight loops

---

# 11. Best Practices

- Use SLF4J everywhere
- Choose correct log levels
- Use structured, meaningful messages
- Reduce logging in production
- Centralize logs using tools (ELK, Grafana)

---

# 12. Summary

- Spring Boot uses Logback by default
- SLF4J is the logging facade
- Logging levels control verbosity
- Configuration is simple yet powerful
- Proper logging is essential for production readiness

---

# What's Next?

Next post:

**35 - Spring Boot DevTools – Hot Reloading**

We’ll explore how DevTools improves developer productivity.
