# 📜 Directivas de Arquitectura y Desarrollo: Sistema de Autorización SPA

Este documento establece las directivas, la arquitectura, la pila tecnológica y la metodología de desarrollo para el proyecto. El Agente/Copiloto DEBE adherirse a estos principios en cada tarea solicitada.

---

## 1. 🎯 Objetivo del Proyecto

**Crear una Aplicación Web de Página Única (SPA) para la gestión de usuarios y autorización (Login/Registro/Gestión de Perfiles).**

- **Naturaleza**: Aplicación 100% Client-Side (Frontend)
- **Independencia**: No requiere Backend (Servidor) ni Base de Datos Externa (PostgreSQL, MongoDB, etc.)
- **Alcance Inicial**: Se enfocará en la autenticación, la gestión local de usuarios y la separación modular
- **Simplificación**: Se omite el respaldo a Google Sheets por ahora para mantener la simplicidad

---

## 2. 💻 Pila Tecnológica (Stack)

| Componente       | Tecnología Requerida    | Propósito                                                                       |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------- |
| **Estructura**   | HTML5 / CSS3            | Marcado y Estilizado de la UI                                                   |
| **Lógica**       | JavaScript (ES Modules) | Toda la lógica de negocio y aplicación                                          |
| **Persistencia** | IndexedDB               | Almacenamiento local de datos estructurados                                     |
| **Librería DB**  | localForage             | Capa wrapper para simplificar el uso de IndexedDB (Asíncrono y soporta objetos) |
| **Criptografía** | bcryptjs (o similar)    | Obligatorio para generar hash de contraseñas antes del almacenamiento           |

---

## 3. 🏗️ Arquitectura y Estructura de Módulos (Simulación Clean Architecture)

La arquitectura debe simular el patrón de **Arquitectura Limpia** utilizando la modularidad de JavaScript (ES Modules) para garantizar la **Separación de Responsabilidades (SRP)** y el **Desacoplamiento**.

### 3.1. Estructura de Carpetas

```
/html-css-js
├── index.html
├── /css
│   └── main.css
└── /js
    ├── main.js             // Arranque de la aplicación (solo inicialización y routers)
    ├── /domain             // 🛡️ Reglas de negocio puras
    │   ├── User.js         // Clase/Entidad de Usuario
    │   └── RoleValidation.js
    ├── /use_cases          // 🧠 Lógica de aplicación, orquestación de flujos
    │   ├── RegisterUser.js
    │   └── AuthenticateUser.js
    ├── /infrastructure     // 💾 Detalles técnicos, persistencia
    │   ├── UserRepository.js // Implementación de `localForage`
    │   └── AuthService.js    // Implementación de `bcryptjs`
    └── /presentation       // 🖼️ Componentes de la UI (Manipulación del DOM)
        ├── LoginView.js
        ├── SuperAdminDashboard.js  // Dashboard para SuperAdmin
        ├── AdminDashboard.js       // Dashboard para Admin
        └── ClientDashboard.js      // Dashboard para Client
```

### 3.2. Reglas Clave de la Arquitectura

1. **Inversión de Dependencia (DIP)**:

   - Los Casos de Uso (`/use_cases`) NO deben importar directamente la implementación de Infraestructura (`/infrastructure`)
   - Deben recibir el repositorio (la función de guardar/leer) como un argumento (Inyección de Dependencia)

2. **Unidireccionalidad**:

   - El flujo de datos debe ir desde: **Presentación → Casos de Uso → Infraestructura** y regresar

3. **Encapsulamiento**:
   - La lógica de negocio (por ejemplo, validación de un usuario) debe residir en la capa **Domain**

### 3.3. Dashboards Diferenciados por Rol

El sistema debe implementar **3 dashboards distintos**, uno para cada rol de usuario:

#### 🔴 SuperAdminDashboard.js

**Funcionalidades:**

- Gestión completa de usuarios (crear, editar, eliminar, cambiar roles)
- Visualización de todos los usuarios del sistema
- Asignación y modificación de roles (SuperAdmin, Admin, Client)
- Acceso a estadísticas y métricas del sistema
- Configuración global de la aplicación

#### 🟡 AdminDashboard.js

**Funcionalidades:**

- Gestión limitada de usuarios (crear, editar usuarios tipo Client)
- Visualización de usuarios bajo su gestión
- NO puede modificar SuperAdmins ni otros Admins
- Acceso a reportes y estadísticas limitadas
- Gestión de perfiles de clientes

#### 🟢 ClientDashboard.js

**Funcionalidades:**

- Visualización y edición de su propio perfil
- Cambio de contraseña personal
- Visualización de su información de usuario
- NO tiene acceso a gestión de otros usuarios
- Funcionalidades básicas de usuario final

#### 🔄 Lógica de Routing por Rol

El archivo `main.js` debe implementar un **router basado en roles** que:

1. Detecte el rol del usuario autenticado (desde `localStorage` o sesión)
2. Redirija automáticamente al dashboard correspondiente
3. Bloquee el acceso a dashboards no autorizados (validación de permisos)
4. Maneje intentos de acceso no autorizado con redirección al login

---

## 4. 📝 Metodología de Desarrollo y Control (Principio de Atomicidad)

La programación debe seguir una metodología **incremental** y de **validación estricta**.

### 4.1. División Atómica de Tareas

El proyecto debe dividirse en **subtareas lo más atómicas posible**. Una tarea debe ser una unidad lógica pequeña que se pueda completar y probar de forma aislada.

- ✅ **Ejemplo de Tarea Atómica**: "Crear la función `UserRepository.findUserByUsername(username)`"
- ❌ **Ejemplo de Tarea NO Atómica**: "Implementar el flujo de Login" (Esto es un conjunto de subtareas)

### 4.2. Validación Funcional

Después de completar cada subtarea atómica (ej. una función o un módulo), se debe realizar una **validación de su correcto funcionamiento** antes de pasar a la siguiente.

- **Validación de Infraestructura**: Si se implementa `localForage`, se debe probar inmediatamente que puede guardar y recuperar un objeto simple correctamente
- **Validación de Lógica**: Si se implementa `RegisterUser.js`, se debe probar si utiliza la función hash y llama al repositorio con los datos correctos

### 4.3. Control de Progreso (Checklist Visual)

Para mantener el control y el seguimiento del progreso (qué funciona, qué se ha validado, y qué falta), la planificación y la ejecución deben generar un resultado que pueda visualizarse fácilmente.

- Cuando se inicie el proyecto (Modo Planificación), se debe crear un **Plan de Desarrollo Detallado** que sirva como una lista de verificación (Checklist) de todas las tareas atómicas a realizar
- Tras la ejecución o validación exitosa de cada subtarea, el plan debe reflejar ese estado (ej., `[COMPLETADO]`)

---

## 5. 🔑 Directiva de Implementación para el Agente/Copiloto

### AL GENERAR CÓDIGO:

1. **Modularidad**:

   - Cada archivo JS debe usar `export` para sus clases/funciones

2. **Persistencia**:

   - La clave de `localForage` para almacenar la colección de usuarios debe ser `AUTH_USERS`

3. **Roles**:

   - Los roles de usuario deben ser: `SuperAdmin`, `Admin`, y `Client`

4. **Autenticación**:

   - Implementar un sistema de sesión simple (ej., guardando el ID del usuario actual en `localStorage` para indicar el estado de login)
   - IndexedDB NO debe usarse para datos volátiles de sesión

5. **Comentarios**:

   - TODO el código debe estar completamente comentado en español
   - Explicar la lógica, las decisiones arquitectónicas y el propósito de cada componente

6. **Dashboards Diferenciados**:
   - Implementar 3 dashboards distintos: `SuperAdminDashboard.js`, `AdminDashboard.js`, `ClientDashboard.js`
   - Cada dashboard debe tener funcionalidades específicas según el rol
   - El routing debe validar permisos y redirigir al dashboard correcto
   - Implementar protección de rutas para evitar accesos no autorizados

---

## 6. 🎯 Contexto del Proyecto

Este es un **sistema de autenticación simple** diseñado para funcionar completamente en el navegador:

- ✅ Sin servidor backend
- ✅ Sin base de datos externa
- ✅ Almacenamiento local usando IndexedDB (vía localForage)
- ✅ Seguridad mediante hashing de contraseñas (bcryptjs)
- ✅ Arquitectura limpia y modular
- ✅ Validación atómica de cada componente
