---
title: "07 - Dependency Injection (DI) in Spring"
date: "28-11-2025"
tags: ["Java","Spring","Dependency Injection","Spring Boot","Backend"]
summary: "A complete guide to Dependency Injection (DI) in Spring, explaining types of injection, why DI is essential, and how Spring Boot uses DI to create clean and maintainable applications."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 7
---

Dependency Injection (DI) is one of the most important concepts in the Spring ecosystem.  
If **Inversion of Control (IoC)** defines *who* controls object creation, then DI defines *how* those objects are provided to each other.

When you fully understand DI, you'll appreciate why Spring applications are easy to maintain, test, and extend.

---

# 1. What Is Dependency Injection?

**Dependency Injection** is a design pattern where an object's dependencies are provided (or *injected*) by an external system — in our case, the Spring IoC Container — rather than the object creating them itself.

### Without DI (Traditional Java):
```java
Car car = new Car();
Engine engine = new Engine();
car.setEngine(engine);
```

The Car class creates/controls its dependencies.

### With DI (Spring Way):
```java
@Autowired
private Engine engine;
```

Spring creates and injects the dependency for you.

---

# 2. Why Does DI Matter?

DI solves real-world software problems:

### ✔ Reduces tight coupling  
Objects no longer depend on concrete implementations.

### ✔ Easier unit testing  
Replace real dependencies with mocks easily.

### ✔ Cleaner and modular architecture  
Responsibilities are separated.

### ✔ Reusable components  
Components can be swapped or replaced without modifying core logic.

### ✔ Better maintainability  
Dependency configuration is centralized.

---

# 3. Types of Dependency Injection in Spring

Spring supports **three types** of DI:

---

## 3.1 Constructor Injection (Recommended)

Dependencies are injected via the constructor.

```java
@Component
public class Car {

    private final Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

### Why it's recommended:
- Ensures immutability  
- Best for mandatory dependencies  
- Works perfectly with unit tests  
- Preferred by Spring Boot team  

---

## 3.2 Setter Injection

Dependencies are injected via setter methods.

```java
@Component
public class Car {

    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}
```

### When to use:
- Optional dependencies  
- Configurable properties  

---

## 3.3 Field Injection (Not recommended)

Injecting dependencies directly into fields:

```java
@Component
public class Car {

    @Autowired
    private Engine engine;

}
```

### Why avoid it?
- Harder to test  
- Makes class less flexible  
- Hides the dependency  

Spring Boot projects should avoid field injection unless absolutely necessary.

---

# 4. How Dependency Injection Works Internally

When the Spring Boot application starts:

1. Spring scans your project for components  
2. Creates Bean instances  
3. Determines which dependencies each Bean needs  
4. Injects dependencies based on `@Autowired` or constructor parameters  
5. Stores everything inside the ApplicationContext  

Spring manages the entire lifecycle automatically.

---

# 5. `@Autowired` Explained

`@Autowired` tells Spring to find and inject the appropriate dependency.

Spring matches dependencies using:
- Type (primary)
- Qualifiers  
- Bean names  

If multiple beans match, Spring requires clarification using:

```java
@Qualifier("dieselEngine")
private Engine engine;
```

---

# 6. Using `@Qualifier`

Sometimes you have multiple implementations:

```java
@Component("dieselEngine")
public class DieselEngine implements Engine {}

@Component("petrolEngine")
public class PetrolEngine implements Engine {}
```

Use:

```java
@Autowired
@Qualifier("dieselEngine")
private Engine engine;
```

This gives you full control over what gets injected.

---

# 7. Dependency Injection in Spring Boot

Spring Boot enhances DI by:
- Auto-detecting Beans
- Auto-wiring common components
- Providing built-in Beans for Web, Security, JPA, etc.
- Reducing boilerplate

The biggest advantage:
> **Everything is auto-configured unless you override it.**

---

# 8. Real-World Example

```java
@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder() {
        paymentService.processPayment();
    }
}
```

DI ensures:
- OrderService doesn't create PaymentService  
- Both classes stay independent  
- Testing is easy by injecting a mock PaymentService  

---

# 9. Common Mistakes to Avoid

### ❌ Using field injection everywhere  
Use constructor injection instead.

### ❌ Forgetting to annotate components  
Classes must be marked with:
- `@Component`
- `@Service`
- `@Repository`
- `@Controller`

### ❌ Multiple matching beans without qualifiers  
Leads to `NoUniqueBeanDefinitionException`.

### ❌ Overusing `@Autowired`  
Spring Boot supports constructor injection without needing `@Autowired`.

---

# 10. Summary

- DI is the technique used to implement IoC.  
- Spring injects dependencies automatically.  
- Constructor injection is recommended.  
- DI improves modularity, testability, and maintainability.  
- Spring Boot simplifies DI with auto-configuration and component scanning.

Understanding DI is essential before diving into Bean lifecycle and scopes.

---

# What's Next?

In the next post:

**08 - BeanFactory vs ApplicationContext**

We explore the two main IoC containers and how they manage Beans internally.
