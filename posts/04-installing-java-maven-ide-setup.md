---
title: "04 - Installing Java, Maven, & IDE Setup (STS, Eclipse, IntelliJ)"
date: "25-11-2025"
tags: ["Java","Spring Boot","Maven","IDE","Setup","Backend"]
summary: "A complete beginner-friendly guide to installing Java, setting up Maven, and configuring popular IDEs like STS, Eclipse, and IntelliJ for Spring Boot development."
cover: "/images/example.png"
series: "Getting Started With Spring Boot"
part: 4
---

Before we start building Spring Boot applications, we need to set up a proper development environment.  
This includes installing:

- Java Development Kit (JDK)
- Maven (or Gradle)
- An IDE such as STS, Eclipse, or IntelliJ IDEA

This post walks you through the installation and configuration step-by-step so you are fully ready to write, build, and run Spring Boot applications.

---

# 1. Install Java (JDK)

Spring Boot requires **Java 8 or higher**, but Java 17+ is recommended.

## 1.1 Download JDK

Download from any of these official sources:

- Oracle JDK:  
  https://www.oracle.com/java/technologies/downloads/
- OpenJDK (Free):  
  https://adoptium.net
- Amazon Corretto:  
  https://aws.amazon.com/corretto/

## 1.2 Verify Installation

After installation, verify using:

```bash
java -version
```

Expected output example:

```
java version "17.0.9" 2025-01-01 LTS
```

If you see the version, Java is successfully installed.

---

# 2. Install Maven

Maven is the most commonly used build tool in Spring Boot.

## 2.1 Download Maven

Download from:  
https://maven.apache.org/download.cgi

Extract the archive and place it in a directory like:

- Windows: `C:\Program Files\Apache Maven`
- macOS/Linux: `/usr/local/apache-maven`

## 2.2 Set Environment Variables

### On macOS/Linux:

Add to `~/.bashrc`, `~/.zshrc`, or equivalent:

```bash
export M2_HOME=/usr/local/apache-maven
export PATH=$PATH:$M2_HOME/bin
```

### On Windows:

Add to System Environment Variables:
- `M2_HOME`
- `PATH` → append Maven's `bin` directory

## 2.3 Verify Maven

```bash
mvn -version
```

Expected output:

```
Apache Maven 3.9.x
Java version: 17
```

---

# 3. Choose & Install Your IDE

Spring Boot can be developed in multiple IDEs. Let's cover the most popular ones.

---

# 3.1 Spring Tool Suite (STS)

STS is Spring's official IDE — preconfigured for Spring development.

### Download:
https://spring.io/tools

### Features:
- Built-in Spring Initializer
- Autoconfigured Spring tooling
- Ready-to-use environment
- Best for beginners

---

# 3.2 Eclipse IDE

Eclipse is powerful and extremely customizable.

### Download:
https://eclipse.org/downloads

### For Spring Boot:
Install **Spring Tools** plugin from Eclipse Marketplace.

Steps:
1. Open Eclipse  
2. Go to **Help → Eclipse Marketplace**  
3. Search: **Spring Tools 4**  
4. Install  

---

# 3.3 IntelliJ IDEA

The most popular Java IDE today.

### Download:
https://www.jetbrains.com/idea/download/

### Versions:
- **Community Edition (Free)** → Supports Spring Boot basics  
- **Ultimate Edition (Paid)** → Full Spring Boot, JPA, PostgreSQL, MySQL, etc.

### Features:
- Best performance
- Smart code completion
- Refactorings
- Integrated tools (Git, Docker, DB viewer)
- Easiest debugging experience

---

# 4. Configure Your IDE for Spring Boot

Regardless of the IDE you choose:

### 4.1 Install Lombok Plugin (Important)

Spring Boot projects often use Lombok annotations like:

- `@Getter`
- `@Setter`
- `@Builder`

### To install:
- **STS/Eclipse** → Install Lombok.jar  
- **IntelliJ** → Settings → Plugins → Search “Lombok” → Install

### 4.2 Enable Annotation Processing

In IntelliJ:
```
Settings → Build, Execution, Deployment → Compiler → Annotation Processors → Enable
```

---

# 5. Install Git (Optional but Recommended)

Download:  
https://git-scm.com

Verify:

```bash
git --version
```

Git helps you:
- Track changes  
- Manage versions  
- Push your Spring Boot project to GitHub  

---

# 6. Verify Everything with a Quick Spring Boot Test

Now that Java + Maven + IDE are installed:

### Step 1: Create a new project using Spring Initializer

Visit:  
https://start.spring.io

### Step 2: Select:
- Project: **Maven**
- Language: **Java**
- Spring Boot version: **3.x**
- Dependencies: **Spring Web**

### Step 3: Generate & Import the project into your IDE

### Step 4: Run:

```
mvn spring-boot:run
```

Or click **Run Application** in your IDE.

If the server starts on port `8080`, you’re ready!

---

# What's Next?

In the next post:

**05 - Running Your First Spring Boot Application**

We'll run a real Spring Boot project and see how the application lifecycle works.
