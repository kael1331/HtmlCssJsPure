# 📋 TAREA 2: Integrar login con Google (OAuth 2.0)

**Objetivo**: Agregar la posibilidad de iniciar sesión mediante la cuenta de Google, manteniendo la arquitectura limpia y sin romper la funcionalidad existente.

**Archivos que se crearán / modificarán** (resumen):

- `js/infrastructure/google-config.js` – configuración del client‑id y carga de la SDK de Google.
- `js/infrastructure/GoogleAuthService.js` – wrapper para la API de Google Sign‑In (carga SDK, sign‑in, verificación de ID token).
- `js/domain/User.js` – añadir propiedad opcional `googleId` y actualizar JSDoc.
- `js/use_cases/AuthenticateWithGoogle.js` – caso de uso que valida el token, busca/crea usuario y guarda sesión.
- `js/infrastructure/UserRepository.js` – añadir método `findByGoogleId` y permitir guardar `googleId`.
- `js/presentation/LoginView.js` – botón “Iniciar sesión con Google” y handler `handleGoogleLogin`.
- `js/main.js` – detección de sesión vía Google y redirección al dashboard correspondiente.
- `README.md` y `architecture.md` – actualizar documentación para describir la nueva funcionalidad.

**Criterios de aceptación**:

- En la vista de login aparece un botón “Iniciar sesión con Google”.
- Al pulsarlo se muestra el popup de Google y, tras autorizar, el usuario queda autenticado.
- La información del usuario (incluyendo `googleId`) se persiste en IndexedDB bajo la clave `AUTH_USERS`.
- La sesión se guarda en `localStorage` y el router redirige al dashboard correcto según el rol.
- No se rompe ninguna funcionalidad existente (login tradicional, registro, dashboards).

**Evidencia esperada**:

- Screenshot de la UI con el botón Google visible.
- Screenshot de DevTools → Application → IndexedDB mostrando el nuevo usuario con `googleId`.
- Console log que muestra el token verificado y el objeto usuario autenticado.

---

_Este documento es de **solo lectura** una vez creado; los cambios reales se registrarán en `taskResolved2.md` después de la implementación._
