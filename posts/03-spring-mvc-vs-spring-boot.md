---
title: "03 - Spring MVC vs Spring Boot: When and Why to Use Each"
date: "24-11-2025"
tags: ["Java","Spring","Spring MVC","Spring Boot","Backend"]
summary: "A practical comparison between Spring MVC and Spring Boot, how each works, their differences, and when to choose one over the other for modern web application development."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 3
---

If you've already explored Spring and Spring Boot, the next big concept is understanding **Spring MVC** — the web framework that powers most Java-based web applications.  
But how does Spring MVC fit into Spring Boot? How are they different? And when do you use which?

This post breaks everything down in a clean, practical way.

# 1. What Is Spring MVC?

**Spring MVC** (Model–View–Controller) is a web framework built inside the larger Spring ecosystem.

It provides:
- Request handling (`DispatcherServlet`)
- Controller mapping
- View rendering (Thymeleaf, JSP, FreeMarker)
- Form handling
- REST endpoint creation

Spring MVC is powerful, but requires:
- Manual configuration  
- Dependency setup  
- View resolver setup  
- XML or Java-based initialization  
- External application server (Tomcat, Jetty)

In short:

> Spring MVC = The Web Framework  
> Spring = The Core Foundation  
> You configure everything manually

# 2. What Is Spring Boot?

Spring Boot is **not a web framework** — it’s an **application development framework** built on top of Spring that eliminates configuration.

Spring Boot automatically configures:
- Spring MVC  
- JSON handling (Jackson)  
- View resolvers  
- Embedded server  
- Starter dependencies  

So if your application uses `spring-boot-starter-web`, you automatically get:

- Spring MVC  
- Embedded Tomcat  
- REST support  
- Auto-configured JSON support  

No configuration needed.

# 3. Spring MVC vs Spring Boot: Key Differences

| Feature            | Spring MVC                       | Spring Boot                             |
|--------------------|----------------------------------|-----------------------------------------|
| **Nature**         | Web framework                    | Application framework on top of Spring  |
| **Setup Required** | Manual                           | Automatic                               |
| **View Templates** | Requires view resolver setup     | Auto-configured                         |
| **Server**         | External Tomcat/Jetty            | Embedded server included                |
| **Configuration**  | XML / Java-based                 | Mostly zero configuration               |
| **Dependencies**   | Selected manually                | Starter packs (`spring-boot-starter-*`) |
| **Focus**          | Handling web requests            | Entire application lifecycle            |
| **Speed**          | Slow for beginners               | Fast & efficient                        |
| **Use Case**       | Legacy or highly customized apps | Modern APIs, microservices              |

# 4. How Spring Boot Uses Spring MVC

Spring Boot does **not replace** Spring MVC.  
Instead, it **auto-configures** it.

When you include the dependency:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Spring Boot automatically sets up:
- DispatcherServlet  
- Controller handling  
- Exception resolvers  
- Message converters  
- JSON mapper (Jackson)  
- Static resource mapping  
- Embedded Tomcat server  

This means:

> **Spring Boot + spring-boot-starter-web = Spring MVC ready-to-use with zero configuration**

# 5. Analogy: Spring MVC vs Spring Boot

Imagine running a restaurant:

### **Spring MVC**
You:
- Buy ingredients  
- Hire chefs  
- Hire waiters  
- Set up the kitchen  
- Set up dining tables  
- Plan the menu  
- Manage everything manually  

### **Spring Boot**
You get a **full setup restaurant**:
- Chefs inside  
- Kitchen running  
- Menu created  
- Tables arranged  
- Service ready  

# 6. When Should You Use Spring MVC Alone?

Use standalone Spring MVC when:
- You're working on a **legacy application**  
- You need **custom server setups**  
- You work in environments with **strict enterprise standards**  
- You need **complete control** over configuration  

# 7. When Should You Use Spring Boot?

Use Spring Boot when:
- Building REST APIs  
- Creating microservices  
- Developing cloud-native applications  
- Building rapid prototypes  
- Deploying lightweight apps  
- You want minimal boilerplate  
- You want embedded Tomcat/Jetty/Netty  

# 8. Summary

- **Spring MVC** is the web implementation inside Spring.  
- **Spring Boot** auto-configures Spring MVC and the entire application.  
- Spring Boot makes Spring MVC effortless and production-ready.

# What's Next?

Next post:

**04 - Installing Java, Maven, & IDE Setup (STS, Eclipse, IntelliJ)**

