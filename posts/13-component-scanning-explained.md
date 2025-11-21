---
title: "13 - Component Scanning Explained (@ComponentScan)"
date: "04-12-2025"
tags: ["Java","Spring","Component Scan","ComponentScan","IoC","Spring Boot"]
summary: "A deep dive into Spring's @ComponentScan mechanism—how Spring automatically detects beans, how package scanning works, and how to customize scanning for large Spring Boot applications."
cover: "/images/example.png"
series: "Spring Core Concepts"
part: 13
---

Spring applications rely heavily on **component scanning** to automatically detect and register beans.  
This mechanism removes the need for manual bean configuration and makes Spring Boot applications lightweight, clean, and scalable.

In this post, we explore how component scanning works and how you can customize it for real-world projects.

---

# 1. What Is Component Scanning?

Component scanning is the process where Spring:

1. Scans the classpath  
2. Finds classes annotated with stereotypes  
3. Automatically registers them as beans in the IoC container  

Spring detects these annotations by default:
- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@RestController`
- `@Configuration`

---

# 2. Default Component Scanning in Spring Boot

Spring Boot automatically scans components starting from the package of your **main class**.

Example project structure:

```
com.example.app
 ├── AppApplication.java   ← main class
 ├── controller/
 ├── service/
 ├── repository/
 └── config/
```

Main class:

```java
@SpringBootApplication
public class AppApplication { }
```

`@SpringBootApplication` includes:

- `@Configuration`
- `@EnableAutoConfiguration`
- `@ComponentScan`

This scans:

```
com.example.app.*
```

Everything inside and below the root package is detected.

---

# 3. Why Package Structure Matters

If your main class is located in:

```
com.example.app
```

Spring will NOT scan:

```
com.example.common
com.example.utilities
```

unless explicitly told.

This is why proper package hierarchy is crucial.

---

# 4. Customizing Component Scanning with @ComponentScan

You can override or extend component scanning easily.

### Example: Scan multiple packages

```java
@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.app",
    "com.example.common",
    "com.example.shared"
})
public class AppApplication { }
```

### Example: Scan a specific package only

```java
@ComponentScan("com.example.services")
```

### Example: Exclude certain components

```java
@ComponentScan(
    basePackages = "com.example",
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.REGEX,
        pattern = "com\.example\.experimental\..*"
    )
)
```

---

# 5. How Spring Detects Components Internally

Spring scans class files and checks for these stereotype annotations:

- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@RestController`
- `@Configuration`

Once detected:
1. A bean definition is created  
2. Bean is instantiated  
3. Bean is added to the ApplicationContext  
4. Dependencies are injected  

---

# 6. Common Mistakes with Component Scanning

### ❌ 1. Wrong main class location  
If the main class is in a deep package, scanning misses upper-level modules.

### ❌ 2. Missing annotations  
Classes without annotations are NOT detected.

### ❌ 3. Duplicate or conflicting package names  
Leads to unexpected scanning behavior.

### ❌ 4. Forgetting `@ComponentScan` when moving components to a new module

---

# 7. Best Practices

### ✔ Place the main class in the root package  
Example:
```
com.example.app
```

### ✔ Follow layered architecture  
- controller  
- service  
- repository  
- config  

### ✔ Use `@ComponentScan` only when needed  
Avoid over-complicating scanning rules.

### ✔ Keep package names clean and consistent

---

# 8. Real-World Example

Project structure:

```
com.company
 ├── application
 ├── common
 └── shared
```

Main class:

```java
@SpringBootApplication
@ComponentScan({"com.company.application", "com.company.common", "com.company.shared"})
public class MainApp { }
```

Now all modules are scanned automatically.

---

# 9. Summary

- Component scanning automatically registers beans in the ApplicationContext.  
- `@SpringBootApplication` includes `@ComponentScan`.  
- Package structure determines what gets scanned.  
- Use custom scanning to include or exclude specific packages.  
- Proper scanning is essential for scalable Spring Boot design.

---

# What's Next?

Next post:

**14 - Spring Autowiring: Modes & Best Practices**

We'll explore the different types of autowiring and how to use them effectively.
