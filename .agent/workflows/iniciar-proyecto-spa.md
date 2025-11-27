---
description: Workflow para iniciar el proyecto SPA de autenticación
---

# 🚀 Workflow: Iniciar Proyecto SPA de Autenticación

Este workflow define los pasos para iniciar correctamente el proyecto SPA siguiendo las directivas de arquitectura.

## Pasos de Inicialización

### 1. Crear Estructura de Carpetas

Crear la estructura de carpetas según la arquitectura definida:

```
/spa-auth
├── index.html
├── /css
│   └── main.css
└── /js
    ├── main.js
    ├── /domain
    ├── /use_cases
    ├── /infrastructure
    └── /presentation
```

### 2. Crear Plan de Desarrollo Detallado

Antes de escribir código, crear un `implementation_plan.md` con:

- Lista de todas las tareas atómicas
- Orden de implementación (respetando dependencias)
- Criterios de validación para cada tarea

### 3. Configurar Dependencias

Incluir en el `index.html` las librerías necesarias:

- `localForage` (para IndexedDB)
- `bcryptjs` (para hashing de contraseñas)

### 4. Implementación Incremental

Para cada componente:

1. Implementar la funcionalidad mínima
2. Comentar completamente el código en español
3. Validar funcionalmente
4. Marcar como completado en el checklist
5. Pasar al siguiente componente

### 5. Validación Final

Antes de dar por terminado:

- Probar flujo completo de registro
- Probar flujo completo de login
- Verificar persistencia de datos
- Validar roles y permisos
- Comprobar seguridad (hashing de contraseñas)

## Orden de Implementación Recomendado

1. **Infraestructura** (base técnica)

   - `AuthService.js` (hashing)
   - `UserRepository.js` (persistencia)

2. **Domain** (reglas de negocio)

   - `User.js` (entidad)
   - `RoleValidation.js` (validaciones)

---

## description: Workflow para iniciar el proyecto SPA de autenticación

# 🚀 Workflow: Iniciar Proyecto SPA de Autenticación

Este workflow define los pasos para iniciar correctamente el proyecto SPA siguiendo las directivas de arquitectura.

## Pasos de Inicialización

### 1. Crear Estructura de Carpetas

Crear la estructura de carpetas según la arquitectura definida:

```
/spa-auth
├── index.html
├── /css
│   └── main.css
└── /js
    ├── main.js
    ├── /domain
    ├── /use_cases
    ├── /infrastructure
    └── /presentation
```

### 2. Crear Plan de Desarrollo Detallado

Antes de escribir código, crear un `implementation_plan.md` con:

- Lista de todas las tareas atómicas
- Orden de implementación (respetando dependencias)
- Criterios de validación para cada tarea

### 3. Configurar Dependencias

Incluir en el `index.html` las librerías necesarias:

- `localForage` (para IndexedDB)
- `bcryptjs` (para hashing de contraseñas)

### 4. Implementación Incremental

Para cada componente:

1. Implementar la funcionalidad mínima
2. Comentar completamente el código en español
3. Validar funcionalmente
4. Marcar como completado en el checklist
5. Pasar al siguiente componente

### 5. Validación Final

Antes de dar por terminado:

- Probar flujo completo de registro
- Probar flujo completo de login
- Verificar persistencia de datos
- Validar roles y permisos
- Comprobar seguridad (hashing de contraseñas)

## Orden de Implementación Recomendado

1. **Infraestructura** (base técnica)

   - `AuthService.js` (hashing)
   - `UserRepository.js` (persistencia)

2. **Domain** (reglas de negocio)

   - `User.js` (entidad)
   - `RoleValidation.js` (validaciones)

3. **Use Cases** (lógica de aplicación)

   - `RegisterUser.js`
   - `AuthenticateUser.js`

4. **Presentation** (UI)

   - `LoginView.js`
   - `ClientDashboard.js` (dashboard básico)
   - `AdminDashboard.js` (dashboard intermedio)
   - `SuperAdminDashboard.js` (dashboard completo)

5. **Main** (orquestación)
   - `main.js` (inicialización y routing basado en roles)
