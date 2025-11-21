---
title: "10 - Bean Scopes: Singleton, Prototype & Custom Scopes"
date: "01-12-2025"
tags: ["Java","Spring","Bean Scope","IoC","Spring Boot","Backend"]
summary: "A complete guide to bean scopes in Spring, including Singleton, Prototype, Request, Session, Application scopes, and how to create your own custom scope in Spring Boot applications."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 10
---

Bean scopes define **how many instances** of a bean Spring should create and **how long** those instances should live.

Spring provides multiple bean scopes to cover different use cases—from global singletons to HTTP request-specific instances.

Understanding scopes is essential for writing clean, efficient Spring Boot applications.

---

# 1. What Is a Bean Scope?

A **bean scope** controls:
- How many bean instances are created  
- How long they stay alive  
- In which context they exist (application-wide, request-wide, etc.)

Spring supports **six types** of scopes.

---

# 2. Singleton Scope (Default)

### Definition  
Spring creates **one instance per IoC container**.

### Characteristics:
- Most commonly used  
- Reused across the entire application  
- Created at startup (eager initialization)  

### Example:

```java
@Component
public class MySingletonService { }
```

Spring automatically treats this as a singleton.

---

# 3. Prototype Scope

### Definition  
Spring creates **a new bean instance every time it is requested**.

### Characteristics:
- Not stored in ApplicationContext  
- Destroy methods are NOT called  
- Used for short-lived, stateful objects  

### Example:

```java
@Component
@Scope("prototype")
public class MyPrototypeService { }
```

---

# 4. Request Scope (Web Applications Only)

### Definition  
Spring creates **one instance per HTTP request**.

### Characteristics:
- Used in web applications  
- Useful for request-level data  

Example:

```java
@Component
@Scope("request")
public class RequestBean { }
```

---

# 5. Session Scope

### Definition  
Spring creates **one instance per user session**.

### Characteristics:
- Useful for storing user-specific data  
- Lives until the session expires  

Example:

```java
@Component
@Scope("session")
public class SessionBean { }
```

---

# 6. Application Scope

### Definition  
Creates a bean that is shared across the entire application (ServletContext level).

### Example:

```java
@Component
@Scope("application")
public class AppScopeBean { }
```

---

# 7. WebSocket Scope (Advanced Web Apps)

### Definition  
Creates a bean instance for each WebSocket session.

---

# 8. Custom Bean Scopes (Advanced)

Spring allows developers to create **their own scopes**.

Example: creating a custom scope called `"tenant"` for multitenant apps.

### Step 1: Implement the Scope interface

```java
public class TenantScope implements Scope {

    private Map<String, Object> beanMap = new HashMap<>();

    @Override
    public Object get(String name, ObjectFactory<?> factory) {
        return beanMap.computeIfAbsent(name, k -> factory.getObject());
    }

    @Override
    public Object remove(String name) {
        return beanMap.remove(name);
    }

    // Other methods...
}
```

### Step 2: Register the new scope

```java
@Configuration
public class ScopeConfig implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        beanFactory.registerScope("tenant", new TenantScope());
    }
}
```

### Step 3: Apply the custom scope

```java
@Component
@Scope("tenant")
public class TenantService { }
```

---

# 9. Real-World Use Cases

| Scope           | Use Case                                          |
|-----------------|---------------------------------------------------|
| **Singleton**   | Shared services, repositories                     |
| **Prototype**   | Stateful objects, new instance required each time |
| **Request**     | API request-level data                            |
| **Session**     | User session-specific information                 |
| **Application** | Global shared objects                             |
| **Custom**      | Multi-tenant applications, workflow-specific data |

---

# 10. Summary

- Singleton is the default Spring scope.  
- Prototype creates new instances every time.  
- Request, Session, and Application scopes are used in web applications.  
- Custom scopes allow full control over bean lifecycle.  
- Choosing the right scope improves performance and clarity.

Understanding scopes prepares you for the next topic: **How to create a Spring Bean & how Spring manages them**.

---

# What's Next?

Next post:

**11 - Creating a Spring Bean: @Component, @Service, @Repository & @Bean**
