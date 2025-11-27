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

**Estado:** ⏸️ PENDIENTE - ESPERANDO EJECUCIÓN

**Fase:** Diagnóstico

**Descripción:** Abrir la aplicación en el navegador y verificar en consola que `window.localforage` existe y está disponible

**Acciones a realizar:**

- [ ] Iniciar el servidor de desarrollo
- [ ] Abrir el navegador en la URL del servidor
- [ ] Abrir DevTools (F12)
- [ ] Ejecutar `console.log(window.localforage)` en la consola
- [ ] Capturar screenshot de la consola

**Validación esperada:**

- localforage debe estar definido como objeto
- No debe haber errores en consola relacionados con localforage

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 1.2: Verificar qué datos se almacenan actualmente en IndexedDB

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Diagnóstico

**Descripción:** Inspeccionar IndexedDB en DevTools para ver qué datos están almacenados actualmente

**Acciones a realizar:**

- [ ] Abrir DevTools > Application > Storage > IndexedDB
- [ ] Expandir la base de datos de localforage
- [ ] Verificar qué claves existen (buscar 'AUTH_USERS')
- [ ] Ver qué usuarios están almacenados
- [ ] Capturar screenshot de IndexedDB

**Validación esperada:**

- Debe existir una base de datos de localforage
- Debe existir la clave 'AUTH_USERS'
- Verificar cuántos usuarios hay almacenados

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 1.3: Crear un usuario de prueba y verificar si se guarda

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Diagnóstico

**Descripción:** Registrar un nuevo usuario de prueba y verificar inmediatamente en IndexedDB si aparece

**Acciones a realizar:**

- [ ] Iniciar sesión como SuperAdmin (kael/1234)
- [ ] Crear un nuevo usuario de prueba (ej: "testuser" / "1234" / rol: Client)
- [ ] Inmediatamente verificar en DevTools > IndexedDB si el usuario aparece
- [ ] Capturar screenshot del usuario en IndexedDB

**Validación esperada:**

- El usuario recién creado debe aparecer en AUTH_USERS
- El array debe contener al menos 2 usuarios (SuperAdmin + testuser)

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 1.4: Cerrar y reabrir navegador para verificar persistencia

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

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

**Validación esperada:**

- Los datos deben persistir después de cerrar el navegador
- AUTH_USERS debe contener los mismos usuarios que antes

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 1.5: Verificar el comportamiento del botón logout

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Diagnóstico

**Descripción:** Hacer clic en el botón "Cerrar Sesión" y observar qué sucede

**Acciones a realizar:**

- [ ] Iniciar sesión con cualquier usuario
- [ ] Localizar el botón "Cerrar Sesión"
- [ ] Hacer clic en el botón
- [ ] Observar qué sucede (¿redirige al login? ¿se queda en el dashboard?)
- [ ] Verificar en localStorage si AUTH_SESSION fue eliminado
- [ ] Grabar video de la interacción

**Validación esperada:**

- El botón debe eliminar AUTH_SESSION de localStorage
- Debería redirigir al login (pero probablemente no lo haga - este es el bug)

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

# FASE 2: CORRECCIÓN - Arreglar el problema de logout

## ⏸️ TAREA 2.1: Modificar la función handleLogout en ClientDashboard.js

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en ClientDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/ClientDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Código a modificar:**

```javascript
// ANTES
function handleLogout() {
  logoutUser();
}

// DESPUÉS
function handleLogout() {
  logoutUser();
  window.location.hash = "#login";
  renderLoginView();
}
```

**Validación esperada:**

- El código debe compilar sin errores
- La función debe redirigir al login

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 2.2: Modificar la función handleLogout en AdminDashboard.js

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en AdminDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/AdminDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Código a modificar:**

```javascript
// ANTES
function handleLogout() {
  logoutUser();
}

// DESPUÉS
function handleLogout() {
  logoutUser();
  window.location.hash = "#login";
  renderLoginView();
}
```

**Validación esperada:**

- El código debe compilar sin errores
- La función debe redirigir al login

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 2.3: Modificar la función handleLogout en SuperAdminDashboard.js

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Corrección

**Descripción:** Agregar redirección al login después de llamar a `logoutUser()` en SuperAdminDashboard.js

**Acciones a realizar:**

- [ ] Abrir el archivo `js/presentation/SuperAdminDashboard.js`
- [ ] Localizar la función `handleLogout()`
- [ ] Agregar código para redirigir al login después de `logoutUser()`
- [ ] Importar `renderLoginView` si no está importado
- [ ] Guardar el archivo

**Código a modificar:**

```javascript
// ANTES
function handleLogout() {
  logoutUser();
}

// DESPUÉS
function handleLogout() {
  logoutUser();
  window.location.hash = "#login";
  renderLoginView();
}
```

**Validación esperada:**

- El código debe compilar sin errores
- La función debe redirigir al login

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 2.4: Probar logout en los 3 roles diferentes

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Corrección

**Descripción:** Iniciar sesión con cada rol (Client, Admin, SuperAdmin) y probar el botón de logout

**Acciones a realizar:**

- [ ] Probar logout como Client
- [ ] Probar logout como Admin
- [ ] Probar logout como SuperAdmin
- [ ] Verificar que en todos los casos redirige al login
- [ ] Grabar video de las 3 pruebas

**Validación esperada:**

- El logout debe funcionar correctamente en los 3 roles
- Debe redirigir al login en todos los casos
- AUTH_SESSION debe eliminarse en todos los casos

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

# FASE 3: VERIFICACIÓN - Confirmar persistencia de datos

## ⏸️ TAREA 3.1: Verificar que el problema de persistencia existe

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

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

**Validación esperada:**

- Confirmar si los usuarios persisten o no
- Documentar exactamente qué sucede

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 3.2: Agregar logs de depuración en saveUser

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Verificación

**Descripción:** Agregar console.log en la función saveUser para ver cuándo se guarda un usuario

**Acciones a realizar:**

- [ ] Abrir `js/infrastructure/UserRepository.js`
- [ ] Localizar la función `saveUser`
- [ ] Agregar console.log antes de `localforage.setItem`
- [ ] Agregar console.log después de `localforage.setItem`
- [ ] Los logs deben mostrar el array completo de usuarios

**Código a agregar:**

```javascript
console.log("💾 Guardando usuarios en IndexedDB:", users);
await localforage.setItem(STORAGE_KEY, users);
console.log("✅ Usuarios guardados exitosamente");
```

**Validación esperada:**

- Los logs deben aparecer en consola al crear usuarios
- Debe mostrar el array completo con todos los usuarios

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 3.3: Verificar que localforage.setItem se ejecuta correctamente

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Verificación

**Descripción:** Crear un usuario y verificar en consola que los logs muestran el guardado correcto

**Acciones a realizar:**

- [ ] Iniciar sesión como SuperAdmin
- [ ] Abrir consola de DevTools
- [ ] Crear un nuevo usuario
- [ ] Verificar que aparecen los logs de guardado
- [ ] Verificar que el array mostrado contiene todos los usuarios
- [ ] Capturar screenshot de la consola

**Validación esperada:**

- Los logs deben mostrar el array completo
- El array debe contener el usuario recién creado

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 3.4: Verificar configuración de localforage

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Verificación

**Descripción:** Revisar si localforage tiene configuración especial o usa defaults

**Acciones a realizar:**

- [ ] Buscar en el código si hay configuración de localforage
- [ ] Ejecutar `localforage.config()` en consola para ver la configuración actual
- [ ] Verificar nombre de la base de datos, driver usado, etc.
- [ ] Capturar screenshot de la configuración

**Validación esperada:**

- Documentar la configuración actual de localforage
- Verificar qué driver está usando (IndexedDB, WebSQL, localStorage)

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

# FASE 4: SOLUCIÓN FINAL - Si el problema persiste

## ⏸️ TAREA 4.1: Implementar inicialización explícita de localforage

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

**Fase:** Solución Final

**Descripción:** Configurar localforage con nombre de DB explícito para asegurar persistencia

**Acciones a realizar:**

- [ ] Crear archivo `js/infrastructure/StorageConfig.js`
- [ ] Configurar localforage con nombre explícito
- [ ] Importar la configuración en main.js
- [ ] Probar que funciona

**Código a crear:**

```javascript
// Configuración explícita de localforage
localforage.config({
  driver: localforage.INDEXEDDB,
  name: "SPA_AUTH_DB",
  version: 1.0,
  storeName: "auth_storage",
  description: "Base de datos de autenticación SPA",
});
```

**Validación esperada:**

- localforage debe usar la configuración personalizada
- Los datos deben persistir correctamente

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 4.2: Prueba integral de persistencia

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

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

**Validación esperada:**

- Los 6 usuarios deben persistir después de cerrar el navegador
- No debe haber pérdida de datos

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

## ⏸️ TAREA 4.3: Prueba de logout después de reapertura

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

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

**Validación esperada:**

- La sesión debe persistir al reabrir el navegador
- El logout debe funcionar correctamente
- Debe redirigir al login

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

# 📊 RESUMEN DE PROGRESO

**Total de tareas:** 16
**Completadas:** 0
**En progreso:** 0
**Pendientes:** 16
**Fallidas:** 0

**Última actualización:** 2025-11-27 13:06

---

# 🎯 PRÓXIMA TAREA

**TAREA 1.1:** Verificar que localforage está cargado correctamente
**Estado:** Listo para ejecutar
**Requiere:** Iniciar servidor de desarrollo y abrir navegador
