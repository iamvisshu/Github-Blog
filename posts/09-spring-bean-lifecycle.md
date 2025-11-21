---
title: "09 - Spring Bean Lifecycle"
date: "30-11-2025"
tags: ["Java","Spring","Bean Lifecycle","IoC","Spring Boot","Backend"]
summary: "A complete explanation of the Spring Bean Lifecycle from creation to destruction, including initialization methods, lifecycle callbacks, and how Spring Boot manages bean lifecycles behind the scenes."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 9
---

The **Spring Bean Lifecycle** is one of the most important topics in the Spring Framework. Understanding how beans are created, initialized, and destroyed helps you write cleaner, more predictable, and configurable applications.

If IoC is the heart of Spring, then the Bean Lifecycle is the rhythm that keeps it alive.

---

# 1. What Is a Spring Bean?

A **Bean** is an object managed by the Spring IoC Container.  
Spring controls:
- How beans are created  
- How dependencies are injected  
- When beans are initialized  
- How long they live  
- How they are destroyed  

Spring manages everything for you — you only define the logic.

---

# 2. Overview of the Spring Bean Lifecycle

Spring processes a bean through the following steps:

1. **Instantiate** the bean  
2. **Populate Properties** (DI injection)  
3. **Call BeanNameAware** (if implemented)  
4. **Call BeanFactoryAware** (if implemented)  
5. **Call ApplicationContextAware** (if implemented)  
6. **Before Initialization** — BeanPostProcessor (pre-processing)  
7. **Initialize Bean** (`@PostConstruct`, init-method)  
8. **After Initialization** — BeanPostProcessor (post-processing)  
9. **Bean Is Ready for Use**  
10. **Destroy Bean** (`@PreDestroy`, destroy-method)

Spring performs these steps automatically for every bean.

---

# 3. Bean Lifecycle Flow Diagram

```
Instantiate → Dependency Injection → Aware Interfaces → 
BeanPostProcessor (before init) → Init Methods → 
BeanPostProcessor (after init) → Ready → Destroy
```

---

# 4. Initialization Callbacks

Spring supports multiple ways to execute code **right after a bean is created**.

---

## 4.1 Using `@PostConstruct`

```java
@Component
public class MyService {

    @PostConstruct
    public void init() {
        System.out.println("Bean initialized!");
    }
}
```

---

## 4.2 Using `InitializingBean` Interface

```java
@Component
public class MyService implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        System.out.println("Initialized using InitializingBean");
    }
}
```

---

## 4.3 Using `init-method` in Configuration

```java
@Configuration
public class AppConfig {

    @Bean(initMethod = "init")
    public MyService myService() {
        return new MyService();
    }
}
```

---

# 5. Destruction Callbacks

Called when the application context is shutting down.

---

## 5.1 Using `@PreDestroy`

```java
@PreDestroy
public void cleanup() {
    System.out.println("Cleaning up resources...");
}
```

---

## 5.2 Using `DisposableBean`

```java
public class MyService implements DisposableBean {

    @Override
    public void destroy() {
        System.out.println("Destroyed using DisposableBean");
    }
}
```

---

## 5.3 Using `destroy-method`

```java
@Bean(destroyMethod = "cleanup")
public MyService myService() {
    return new MyService();
}
```

---

# 6. BeanPostProcessor in the Lifecycle

`BeanPostProcessor` lets you modify beans **before and after initialization**.

Example:

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("Before Init: " + beanName);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("After Init: " + beanName);
        return bean;
    }
}
```

This is widely used by Spring internally (for annotations like `@Autowired` and `@Transactional`).

---

# 7. Singleton vs Prototype Lifecycle

### **Singleton Beans** (default)
- Created only once  
- Destroy method is called  

### **Prototype Beans**
- Created every time requested  
- Destroy method is **NOT** called automatically  

Spring Boot primarily uses singleton beans.

---

# 8. Bean Lifecycle in Spring Boot

Spring Boot enhances lifecycle management with:
- Auto-configuration  
- Automatic BeanPostProcessors  
- Environment initialization  
- Lazy initialization support  

Startup logs show Spring creating and initializing beans.

---

# 9. Real-World Use Cases

### Use `@PostConstruct` for:
- Loading initial data  
- Validating configuration  
- Opening resources  

### Use `@PreDestroy` for:
- Closing database connections  
- Stopping background threads  
- Cleaning up temp files  

---

# 10. Summary

- The Bean Lifecycle defines how Spring creates, initializes, and destroys beans.  
- Initialization and destruction methods allow custom logic.  
- BeanPostProcessor allows modification of beans.  
- Singleton and prototype beans behave differently.  
- Spring Boot automatically manages most lifecycle tasks.

Understanding the lifecycle prepares you for deeper topics like scopes, proxies, and Spring AOP.

---

# What's Next?

Coming up next:

**10 - Bean Scopes: Singleton, Prototype & Custom Scopes**

We'll explore how Spring manages bean instances across the application.
