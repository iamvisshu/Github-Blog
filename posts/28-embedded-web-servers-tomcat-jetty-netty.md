---
title: "28 - Embedded Web Servers in Spring Boot (Tomcat, Jetty, Netty)"
date: "19-12-2025"
tags: ["Java","Spring Boot","Embedded Server","Tomcat","Jetty","Netty","Core Features"]
summary: "A detailed explanation of embedded web servers in Spring Boot, how Tomcat, Jetty, and Netty work, why Spring Boot embeds servers, and how to customize or switch between them."
cover: "/images/example.png"
series: "Spring Boot Core Features"
part: 28
---

One of the most powerful yet underrated features of Spring Boot is **embedded web servers**.  
They eliminate the need for external server setup and make Spring Boot applications **self-contained and easy to deploy**.

In this post, we’ll explore:
- Why Spring Boot embeds servers
- How Tomcat, Jetty, and Netty differ
- How to switch or customize servers

---

# 1. What Is an Embedded Web Server?

An embedded web server is a server that is **packaged inside your application** and started automatically when the application runs.

In Spring Boot:
- The server starts with the application
- No separate installation is required
- The app runs as a single executable JAR

---

# 2. Why Spring Boot Uses Embedded Servers

Traditional Java web apps required:
- External Tomcat/Jetty installation
- WAR deployment
- Manual server configuration

Spring Boot changed this by embedding servers to provide:
- Faster startup
- Simplified deployment
- Environment consistency
- Cloud-friendly applications

---

# 3. Default Embedded Server: Tomcat

By default, Spring Boot uses **Apache Tomcat**.

Added automatically via:
```
spring-boot-starter-web
```

### Why Tomcat?
- Mature and stable
- Widely used
- Excellent servlet support
- Strong community

For most applications, Tomcat is more than sufficient.

---

# 4. Jetty: Lightweight Alternative

**Jetty** is a lightweight, high-performance web server.

Common use cases:
- Microservices
- Applications requiring low memory footprint
- Async-heavy workloads

### Switching to Jetty

Exclude Tomcat and include Jetty:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

---

# 5. Netty: Reactive & Non-Blocking

**Netty** is a non-blocking, event-driven server commonly used with **Spring WebFlux**.

Use Netty when:
- Building reactive applications
- Handling large numbers of concurrent connections
- Low-latency systems are required

Netty is included via:
```
spring-boot-starter-webflux
```

---

# 6. Tomcat vs Jetty vs Netty (Comparison)

| Feature | Tomcat | Jetty | Netty |
|------|--------|-------|-------|
| Programming Model | Servlet | Servlet | Reactive |
| Blocking | Yes | Yes | No |
| Default in Boot | Yes | No | No |
| Best Use Case | General-purpose | Lightweight services | Reactive systems |

---

# 7. Embedded Server Startup Flow

When you run a Spring Boot app:

1. ApplicationContext starts
2. Auto-configuration detects web starter
3. Embedded server bean is created
4. Server starts on configured port
5. DispatcherServlet is registered

All of this happens automatically.

---

# 8. Configuring Embedded Server

You can customize server behavior using properties.

```properties
server.port=9090
server.servlet.context-path=/api
```

Change server port, context path, session timeout, and more without code changes.

---

# 9. Programmatic Server Customization

Advanced customization using code:

```java
@Bean
public WebServerFactoryCustomizer<TomcatServletWebServerFactory> customizer() {
    return factory -> factory.setPort(9090);
}
```

This is rarely needed but useful in advanced scenarios.

---

# 10. Embedded Servers in Production

Embedded servers are:
- Production-ready
- Cloud-native
- Widely used in real systems

Companies run embedded-server Spring Boot apps in:
- Docker containers
- Kubernetes
- Cloud platforms

---

# 11. Best Practices

- Stick with Tomcat unless you have specific needs
- Use Netty only for reactive applications
- Configure servers via properties
- Avoid heavy customization unless required

---

# 12. Summary

- Spring Boot embeds web servers by default
- Tomcat is the default and most common
- Jetty is lightweight and efficient
- Netty is reactive and non-blocking
- Embedded servers simplify deployment and scaling

---

# What's Next?

Next post:

**29 - Spring Boot Application Startup Process**

We’ll explore what happens internally from `main()` method to application ready state.
