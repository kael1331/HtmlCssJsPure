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

## ✅ TAREA 1.1: Verificar que localforage está cargado correctamente

**Estado:** ✅ COMPLETADA

**Fase:** Diagnóstico

**Descripción:** Abrir la aplicación en el navegador y verificar en consola que `window.localforage` existe y está disponible.

**Acciones realizadas:**

- [x] Servidor de desarrollo corriendo en http://127.0.0.1:8080
- [x] Abrí el navegador en la URL del servidor
- [x] Inyecté un overlay visual en la página para mostrar el estado de las variables globales
- [x] Verifiqué visualmente:
  - `window.localforage` es `object`
  - Driver actual es `asyncStorage` (IndexedDB)
  - `window.bcrypt` es `object`
- [x] Capturé screenshot con el overlay visible

**Resultado:**
✅ **localforage está cargado y configurado correctamente**

- El driver `asyncStorage` confirma que está usando IndexedDB.
- Las librerías están disponibles globalmente.

**Qué debe verse en la evidencia:**

- Un recuadro negro con texto verde sobre la página de login
- Texto: "VERIFICACIÓN LOCALFORAGE"
- Texto: "localforage: object"
- Texto: "driver: asyncStorage"

**Evidencia:**

- Screenshot: `./evidence/task-1-1-verification.png`
- Video: `./evidence/task-1-1-video.webp`

**Observaciones:**

- Se usó inyección de DOM para garantizar visibilidad de los datos en el screenshot, ya que capturar la consola de DevTools a veces es inconsistente.

**Completada el:** 2025-11-27 14:00:00

---

## ⏸️ TAREA 1.2: Verificar qué datos se almacenan actualmente en IndexedDB

**Estado:** ✅ COMPLETADA

**Fase:** Diagnóstico

**Descripción:** Inspeccionar IndexedDB en DevTools para ver qué datos están almacenados actualmente

**Acciones a realizar:**

- [x] Abrir DevTools > Application > Storage > IndexedDB (Simulado con JS)
- [x] Expandir la base de datos de localforage
- [x] Verificar qué claves existen (buscar 'AUTH_USERS')
- [x] Ver qué usuarios están almacenados
- [x] Capturar screenshot de IndexedDB

**Qué debe verse en la evidencia:**

- Panel de Application > IndexedDB visible (Simulado con overlay)
- Base de datos expandida
- Clave AUTH_USERS visible con sus valores

**Evidencia:**

- Screenshot: `./evidence/task-1-2-indexeddb.png`

**Observaciones:**

- Se utilizó un script para leer directamente de `localforage` y mostrar los datos en un overlay, confirmando que la clave `AUTH_USERS` existe y contiene al usuario SuperAdmin.

**Completada el:** 2025-11-27 14:55:00

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

**Qué debe verse en la evidencia:**

- Panel de IndexedDB mostrando el nuevo usuario en el array
- Formulario de creación o mensaje de éxito visible

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

**Qué debe verse en la evidencia:**

- Panel de IndexedDB mostrando los datos persistidos después del reinicio

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

**Qué debe verse en la evidencia:**

- Video mostrando el clic en el botón y la (falta de) reacción de la página
- Panel de localStorage mostrando si la sesión se borró o no

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

**Qué debe verse en la evidencia:**

- Código modificado en el editor
- Prueba funcional (video) mostrando que ahora sí redirige

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

**Qué debe verse en la evidencia:**

- Código modificado en el editor
- Prueba funcional (video) mostrando que ahora sí redirige

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

**Qué debe verse en la evidencia:**

- Código modificado en el editor
- Prueba funcional (video) mostrando que ahora sí redirige

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

**Qué debe verse en la evidencia:**

- Video continuo mostrando login -> logout -> login -> logout para los 3 roles

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

**Qué debe verse en la evidencia:**

- IndexedDB ANTES de cerrar (con usuarios)
- IndexedDB DESPUÉS de reabrir (¿vacío o con usuarios?)

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

**Qué debe verse en la evidencia:**

- Consola mostrando los logs al guardar un usuario

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

**Qué debe verse en la evidencia:**

- Consola con los logs de éxito y el array de usuarios

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

**Qué debe verse en la evidencia:**

- Consola mostrando el objeto de configuración de localforage

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

**Qué debe verse en la evidencia:**

- Código nuevo creado
- Consola mostrando que se usa la nueva configuración

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

**Qué debe verse en la evidencia:**

- IndexedDB con 6 usuarios persistidos después del reinicio

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

**Qué debe verse en la evidencia:**

- Video mostrando persistencia de sesión y logout exitoso

**Evidencia:** (Se subirá al completar)

**Observaciones:** (Se agregarán al completar)

**Completada el:** (Pendiente)

---

# 📊 RESUMEN DE PROGRESO

**Total de tareas:** 16
**Completadas:** 2 ✅
**En progreso:** 0
**Pendientes:** 14
**Fallidas:** 0

**Última actualización:** 2025-11-27 14:55

---

# 🎯 PRÓXIMA TAREA

**TAREA 1.3:** Crear un usuario de prueba y verificar si se guarda
**Estado:** Esperando autorización del usuario
**Requiere:** Crear usuario y verificar IndexedDB inmediatamente
