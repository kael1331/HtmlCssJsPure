# 📋 Resolución de Problemas: Persistencia de Usuarios y Logout

**Fecha de inicio:** 2025-11-27 13:06
**Objetivo:** Resolver dos problemas críticos en la aplicación SPA de autenticación
**Problemas identificados:**

1. Los usuarios creados no persisten al cerrar y reabrir el navegador (excepto super admin)
2. El usuario permanece logueado al reabrir el navegador, pero no puede desloguearse

---

## 🔍 HIPÓTESIS INICIALES

### Hipótesis sobre Problema 1:

- Los datos de usuarios no se están guardando correctamente en localforage/IndexedDB
- El super admin se genera en cada inicio, por eso "persiste"
- Puede haber un error en la función de guardado de usuarios

### Hipótesis sobre Problema 2:

- El estado de sesión se guarda correctamente en localStorage
- El botón/función de logout no está funcionando o no está visible
- La función `handleLogout()` no redirige al login después de cerrar sesión

---

# FASE 1: DIAGNÓSTICO - Verificar el estado actual

## ⏸️ TAREA 1.1: Verificar que localforage está cargado correctamente

**Fase:** Diagnóstico

**Descripción:** Abrir la aplicación en el navegador y verificar en consola que `window.localforage` existe y está disponible.

**Acciones a realizar:**

- [ ] Servidor de desarrollo corriendo en http://127.0.0.1:8080
- [ ] Abrir el navegador en la URL del servidor
- [ ] Inyectar un overlay visual en la página para mostrar el estado de las variables globales
- [ ] Verificar visualmente:
  - `window.localforage` es `object`
  - Driver actual es `asyncStorage` (IndexedDB)
  - `window.bcrypt` es `object`
- [ ] Capturar screenshot con el overlay visible

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Un recuadro negro con texto verde sobre la página de login
- Texto: "VERIFICACIÓN LOCALFORAGE"
- Texto: "localforage: object"
- Texto: "driver: asyncStorage"

---

## ⏸️ TAREA 1.2: Verificar qué datos se almacenan actualmente en IndexedDB

**Fase:** Diagnóstico

**Descripción:** Inspeccionar IndexedDB en DevTools para ver qué datos están almacenados actualmente

**Acciones a realizar:**

- [ ] Abrir DevTools > Application > Storage > IndexedDB
- [ ] Expandir la base de datos de localforage
- [ ] Verificar qué claves existen (buscar 'AUTH_USERS')
- [ ] Ver qué usuarios están almacenados
- [ ] Capturar screenshot de IndexedDB

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Panel de Application > IndexedDB visible
- Base de datos expandida
- Clave AUTH_USERS visible con sus valores

---

## ⏸️ TAREA 1.3: Crear un usuario de prueba y verificar si se guarda

**Fase:** Diagnóstico

**Descripción:** Registrar un nuevo usuario de prueba y verificar inmediatamente en IndexedDB si aparece

**Acciones a realizar:**

- [ ] Iniciar sesión como SuperAdmin (kael/1234)
- [ ] Crear un nuevo usuario de prueba (ej: "testuser" / "1234" / rol: Client)
- [ ] Inmediatamente verificar en DevTools > IndexedDB si el usuario aparece
- [ ] Capturar screenshot del usuario en IndexedDB

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Panel de IndexedDB mostrando el nuevo usuario en el array
- Formulario de creación o mensaje de éxito visible

---

## ⏸️ TAREA 1.4: Cerrar y reabrir navegador para verificar persistencia

**Fase:** Diagnóstico

**Descripción:** Cerrar completamente el navegador, reabrirlo y verificar si los datos persisten en IndexedDB

**Acciones a realizar:**

- [ ] Cerrar completamente el navegador (todas las ventanas)
- [ ] Esperar 5 segundos
- [ ] Reabrir el navegador
- [ ] Navegar a la aplicación
- [ ] Abrir DevTools > IndexedDB
- [ ] Verificar si AUTH_USERS todavía existe y contiene los usuarios
- [ ] Capturar screenshot

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Panel de IndexedDB mostrando los datos persistidos después del reinicio

---

## ⏸️ TAREA 1.5: Verificar el comportamiento del botón logout

**Fase:** Diagnóstico

**Descripción:** Hacer clic en el botón "Cerrar Sesión" y observar qué sucede

**Acciones a realizar:**

- [ ] Iniciar sesión con cualquier usuario
- [ ] Localizar el botón "Cerrar Sesión"
- [ ] Hacer clic en el botón
- [ ] Observar qué sucede (¿redirige al login? ¿se queda en el dashboard?)
- [ ] Verificar en localStorage si AUTH_SESSION fue eliminado
- [ ] Grabar video de la interacción

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Video mostrando el clic en el botón y la (falta de) reacción de la página
- Panel de localStorage mostrando si la sesión se borró o no

---

# FASE 2: CORRECCIÓN - Arreglar el problema de logout

## ⏸️ TAREA 2.1: Modificar la función handleLogout en ClientDashboard.js

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en ClientDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/ClientDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Código modificado en el editor
- Prueba funcional screenshot mostrando que ahora sí redirige

---

## ⏸️ TAREA 2.2: Modificar la función handleLogout en AdminDashboard.js

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en AdminDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/AdminDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Código modificado en el editor
- Prueba funcional screenshot mostrando que ahora sí redirige

---

## ⏸️ TAREA 2.3: Modificar la función handleLogout en SuperAdminDashboard.js

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en SuperAdminDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/SuperAdminDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Código modificado en el editor
- Prueba funcional (video) mostrando que ahora sí redirige

---

## ⏸️ TAREA 2.4: Probar logout en los 3 roles diferentes

**Fase:** Corrección

**Descripción:** Iniciar sesión con cada rol (Client, Admin, SuperAdmin) y probar el botón de logout

**Acciones a realizar:**

- [ ] Probar logout como Client
- [ ] Probar logout como Admin
- [ ] Probar logout como SuperAdmin
- [ ] Verificar que en todos los casos redirige al login
- [ ] Grabar video de las 3 pruebas

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Video continuo mostrando login -> logout -> login -> logout para los 3 roles

---

# FASE 3: VERIFICACIÓN - Confirmar persistencia de datos

## ⏸️ TAREA 3.1: Verificar que el problema de persistencia existe

**Fase:** Verificación

**Descripción:** Crear 3 usuarios nuevos, cerrar navegador, reabrir y verificar cuántos persisten

**Acciones a realizar:**

- [ ] Iniciar sesión como SuperAdmin
- [ ] Crear 3 usuarios nuevos (user1, user2, user3)
- [ ] Verificar en IndexedDB que los 3 están guardados
- [ ] Cerrar completamente el navegador
- [ ] Esperar 10 segundos
- [ ] Reabrir navegador y verificar IndexedDB
- [ ] Contar cuántos usuarios persisten
- [ ] Capturar screenshots antes y después

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- IndexedDB ANTES de cerrar (con usuarios)
- IndexedDB DESPUÉS de reabrir (¿vacío o con usuarios?)

---

## ⏸️ TAREA 3.2: Agregar logs de depuración en saveUser

**Fase:** Verificación

**Descripción:** Agregar console.log en la función saveUser para ver cuándo se guarda un usuario

**Acciones a realizar:**

- [ ] Abrir `js/infrastructure/UserRepository.js`
- [ ] Localizar la función `saveUser`
- [ ] Agregar console.log antes de `localforage.setItem`
- [ ] Agregar console.log después de `localforage.setItem`
- [ ] Los logs deben mostrar el array completo de usuarios

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Consola mostrando los logs al guardar un usuario

---

## ⏸️ TAREA 3.3: Verificar que localforage.setItem se ejecuta correctamente

**Fase:** Verificación

**Descripción:** Crear un usuario y verificar en consola que los logs muestran el guardado correcto

**Acciones a realizar:**

- [ ] Iniciar sesión como SuperAdmin
- [ ] Abrir consola de DevTools
- [ ] Crear un nuevo usuario
- [ ] Verificar que aparecen los logs de guardado
- [ ] Verificar que el array mostrado contiene todos los usuarios
- [ ] Capturar screenshot de la consola

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Consola con los logs de éxito y el array de usuarios

---

## ⏸️ TAREA 3.4: Verificar configuración de localforage

**Fase:** Verificación

**Descripción:** Revisar si localforage tiene configuración especial o usa defaults

**Acciones a realizar:**

- [ ] Buscar en el código si hay configuración de localforage
- [ ] Ejecutar `localforage.config()` en consola para ver la configuración actual
- [ ] Verificar nombre de la base de datos, driver usado, etc.
- [ ] Capturar screenshot de la configuración

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Consola mostrando el objeto de configuración de localforage

---

# FASE 4: SOLUCIÓN FINAL - Si el problema persiste

## ⏸️ TAREA 4.1: Implementar inicialización explícita de localforage

**Fase:** Solución Final

**Descripción:** Configurar localforage con nombre de DB explícito para asegurar persistencia

**Acciones a realizar:**

- [ ] Crear archivo `js/infrastructure/StorageConfig.js`
- [ ] Configurar localforage con nombre explícito
- [ ] Importar la configuración en main.js
- [ ] Probar que funciona

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Código nuevo creado
- Consola mostrando que se usa la nueva configuración

---

## ⏸️ TAREA 4.2: Prueba integral de persistencia

**Fase:** Solución Final

**Descripción:** Crear 5 usuarios, cerrar navegador, esperar 1 minuto, reabrir y verificar

**Acciones a realizar:**

- [ ] Limpiar IndexedDB completamente
- [ ] Recargar la aplicación (debe crear SuperAdmin)
- [ ] Crear 5 usuarios de prueba
- [ ] Verificar en IndexedDB que hay 6 usuarios (SuperAdmin + 5)
- [ ] Cerrar completamente el navegador
- [ ] Esperar 1 minuto
- [ ] Reabrir navegador
- [ ] Verificar IndexedDB
- [ ] Capturar screenshots antes y después

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- IndexedDB con 6 usuarios persistidos después del reinicio

---

## ⏸️ TAREA 4.3: Prueba de logout después de reapertura

**Fase:** Solución Final

**Descripción:** Reabrir navegador con sesión activa y probar que el logout funciona correctamente

**Acciones a realizar:**

- [ ] Iniciar sesión con un usuario
- [ ] Cerrar navegador (sin hacer logout)
- [ ] Reabrir navegador
- [ ] Verificar que la sesión persiste (debe estar logueado)
- [ ] Hacer clic en "Cerrar Sesión"
- [ ] Verificar que redirige al login
- [ ] Grabar video de todo el proceso

**Criterios de Aceptación (Qué debe verse en la evidencia):**

- Video mostrando persistencia de sesión y logout exitoso
