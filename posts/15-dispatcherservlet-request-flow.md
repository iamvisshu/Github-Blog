---
title: "15 - DispatcherServlet & Request Flow in Spring MVC"
date: "06-12-2025"
tags: ["Java","Spring","Spring MVC","DispatcherServlet","Request Flow","Backend"]
summary: "An in-depth explanation of DispatcherServlet, the front controller of Spring MVC, and how an HTTP request flows through Spring from client to controller and back as a response."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 15
---

Every Spring MVC application revolves around a single, powerful component called the **DispatcherServlet**.  
It acts as the **front controller**, receiving every HTTP request and deciding how it should be handled.

Understanding DispatcherServlet and the request flow is critical for debugging, performance tuning, and designing clean APIs.

---

# 1. What Is DispatcherServlet?

**DispatcherServlet** is the central component of Spring MVC responsible for:

- Receiving incoming HTTP requests  
- Delegating requests to the correct controller  
- Handling request mapping  
- Coordinating view resolution  
- Returning the final response  

In simple terms:

> **All HTTP requests go through DispatcherServlet first.**

---

# 2. Front Controller Pattern

Spring MVC follows the **Front Controller Design Pattern**.

Instead of:
- Multiple servlets handling different requests  

Spring uses:
- One front controller (`DispatcherServlet`)  
- Centralized request handling  

This provides:
- Consistent request processing  
- Centralized security  
- Centralized logging  
- Easier maintenance  

---

# 3. DispatcherServlet in Spring Boot

In traditional Spring MVC, DispatcherServlet had to be configured manually.

Spring Boot does this automatically:

- Registers DispatcherServlet as a bean  
- Maps it to `/`  
- Configures required components  

This happens via:
```
spring-boot-starter-web
```

You never need to write XML configuration.

---

# 4. Spring MVC Request Flow (Step-by-Step)

Let’s walk through the complete request lifecycle.

---

## Step 1: Client Sends HTTP Request

Example:
```
GET /api/users/1
```

The request reaches the embedded server (Tomcat).

---

## Step 2: DispatcherServlet Receives Request

DispatcherServlet intercepts the request and becomes responsible for handling it.

---

## Step 3: HandlerMapping Finds the Controller

Spring uses **HandlerMapping** to find which controller method matches the request.

Example:
```java
@GetMapping("/api/users/{id}")
public User getUser(@PathVariable Long id) { }
```

---

## Step 4: HandlerAdapter Invokes the Method

HandlerAdapter:
- Calls the controller method  
- Passes request parameters  
- Handles argument binding  

---

## Step 5: Business Logic Execution

Controller delegates work to:
- Service layer  
- Repository layer  

Data is fetched, processed, or modified.

---

## Step 6: Response Generation

Controller returns:
- Java object  
- String  
- ResponseEntity  

Spring converts the return value using **HttpMessageConverters** (JSON, XML, etc.).

---

## Step 7: Response Sent to Client

DispatcherServlet sends the response back to the client.

---

# 5. Visual Request Flow Summary

```
Client
  ↓
DispatcherServlet
  ↓
HandlerMapping
  ↓
HandlerAdapter
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Response
```

---

# 6. DispatcherServlet & REST APIs

In REST APIs:
- Views are NOT involved  
- Responses are returned as JSON  

This is enabled by:
- `@RestController`
- `@ResponseBody`
- Jackson (JSON converter)

---

# 7. Common Issues Related to DispatcherServlet

### ❌ 404 Not Found
- No matching controller mapping  

### ❌ 405 Method Not Allowed
- Wrong HTTP method used  

### ❌ 500 Internal Server Error
- Exception thrown inside controller or service  

Understanding request flow helps debug these quickly.

---

# 8. Customizing DispatcherServlet (Advanced)

You can customize it if needed:

```java
@Bean
public DispatcherServlet dispatcherServlet() {
    return new DispatcherServlet();
}
```

Most Spring Boot apps never need this.

---

# 9. Summary

- DispatcherServlet is the heart of Spring MVC.  
- It implements the Front Controller pattern.  
- All HTTP requests pass through it.  
- Spring Boot auto-configures DispatcherServlet.  
- Understanding request flow helps in debugging and optimization.

---

# What's Next?

Next post:

**16 - Spring IoC Container Deep Dive**

We’ll explore how Spring internally manages beans, contexts, and dependency resolution.
