---
title: "08 - BeanFactory vs ApplicationContext"
date: "29-11-2025"
tags: ["Java","Spring","IoC","BeanFactory","ApplicationContext","Spring Boot","Backend"]
summary: "An in-depth comparison of BeanFactory and ApplicationContext, the two core IoC containers in the Spring Framework, and how they manage beans differently in Spring Boot applications."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 8
---

The Spring Framework manages objects using IoC (Inversion of Control).  
To implement IoC, Spring provides **two types of containers**:

1. **BeanFactory**  
2. **ApplicationContext**

Both containers create, configure, and manage beans — but they differ in features, performance, and use cases.

Understanding their differences is essential for grasping how Spring Boot works internally.

---

# 1. What Is BeanFactory?

**BeanFactory** is the simplest Spring IoC container.

It provides the core capabilities of managing beans:
- Creating beans  
- Injecting dependencies  
- Managing bean lifecycle  
- Lazy initialization (beans created only when needed)

### BeanFactory Example:

```java
BeanFactory factory = new XmlBeanFactory(new ClassPathResource("beans.xml"));
Car car = factory.getBean("car", Car.class);
```

BeanFactory is minimal and lightweight, but lacks many convenience features.

---

# 2. What Is ApplicationContext?

**ApplicationContext** is the advanced IoC container built on top of BeanFactory.

It includes everything BeanFactory offers **plus**:
- Eager initialization (faster startup)
- Event publishing  
- Internationalization support  
- Environment abstraction  
- Resource loading  
- Automatic BeanPostProcessors  
- Automatic BeanFactoryPostProcessors  

It is the **default container** in Spring Boot.

### ApplicationContext Example:

```java
ApplicationContext context = 
        new ClassPathXmlApplicationContext("beans.xml");

Car car = context.getBean(Car.class);
```

---

# 3. BeanFactory vs ApplicationContext (Feature Comparison)

| Feature                       | BeanFactory             | ApplicationContext     |
|-------------------------------|-------------------------|------------------------|
| **Bean creation**             | Lazy                    | Eager                  |
| **Event handling**            | No                      | Yes                    |
| **Annotation processing**     | Manual                  | Automatic              |
| **BeanPostProcessor support** | Manual                  | Automatic              |
| **Internationalization**      | No                      | Yes                    |
| **Environment abstraction**   | No                      | Yes                    |
| **Used in Spring Boot?**      | Rarely                  | Always                 |
| **Primary use case**          | Memory-constrained apps | Modern enterprise apps |

---

# 4. Lazy vs Eager Initialization

### BeanFactory → **Lazy Initialization**
Beans are created **only when accessed**.

### ApplicationContext → **Eager Initialization**
Beans are created **at startup**.

This makes ApplicationContext:
- Faster during runtime  
- Better for detecting errors early  

Spring Boot follows **eager initialization**, making applications reliable.

---

# 5. Why Spring Boot Uses ApplicationContext

Spring Boot uses **ApplicationContext** by default because it offers:

### ✔ Auto-configuration  
Required for Spring Boot's magic.

### ✔ Component scanning  
Automatically detects beans in your project.

### ✔ Profiles  
Load different configs for dev, test, prod.

### ✔ Environment abstraction  
Access to system/env properties.

### ✔ Event publishing  
Used for lifecycle events.

### ✔ Integration with Spring Boot starters  
Ensures everything works smoothly.

Without ApplicationContext, Spring Boot features would not function properly.

---

# 6. Real-World Analogy

Think of IoC containers like smartphones:

### **BeanFactory = Basic Phone**
- Calls only  
- No internet  
- No apps  
- Very lightweight  

### **ApplicationContext = Smartphone**
- Apps  
- Bluetooth  
- Wi-Fi  
- Camera  
- Notifications  

You can do much more with ApplicationContext.

---

# 7. When Should You Use BeanFactory?

Use BeanFactory only when:
- You're working on **low-memory devices** (rare)  
- You need **lazy initialization only**  
- You're maintaining **legacy XML-based applications**  

Today, almost nobody uses BeanFactory in real projects.

---

# 8. When Should You Use ApplicationContext?

Always use ApplicationContext when:
- Building web applications  
- Using Spring Boot  
- Using annotations  
- Using Spring MVC, Data JPA, Security  
- Working with microservices

In Spring Boot, ApplicationContext is used automatically — you never configure it manually.

---

# 9. Summary

- **BeanFactory** → Basic IoC container with lazy initialization.  
- **ApplicationContext** → Full-featured IoC container used in modern Spring apps.  
- Spring Boot **always** uses ApplicationContext.  
- ApplicationContext provides auto-configuration, event handling, internationalization, and many other features.

Understanding this difference helps you appreciate how Spring Boot manages beans and application startup.

---

# What's Next?

Next post:

**09 - Spring Bean Lifecycle**

We dive into how Spring creates, initializes, and destroys beans behind the scenes.
