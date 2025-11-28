# taskResolved2.md

## Objetivo

Implementar **Login con Google (OAuth 2.0)** en la SPA de autenticación.

## Cambios realizados

1. **`js/infrastructure/google-config.js`** – Configuración del `client_id` (placeholder).
2. **`js/infrastructure/GoogleAuthService.js`** – Wrapper que carga la SDK de Google, realiza el login y decodifica el ID token.
3. **`js/domain/User.js`** – Añadida propiedad opcional `googleId`, actualizado `constructor`, `toJSON`, `fromJSON` y eliminado código duplicado.
4. **`js/use_cases/AuthenticateWithGoogle.js`** – Caso de uso que recibe el ID token, busca/crea el usuario y guarda la sesión (`provider: 'google'`).
5. **`js/infrastructure/UserRepository.js`** – Reescrito limpiamente, se añadió `findByGoogleId` y se simplificó la lógica de persistencia.
6. **`js/presentation/LoginView.js`** – Reescrito completamente:
   - Importa `authenticateUser`, `authenticateWithGoogle` y la SDK de Google.
   - Añade botón **«Iniciar con Google»**.
   - Implementa `handleGoogleLogin` que carga la SDK, obtiene el ID token y delega a `authenticateWithGoogle`.
   - Mantiene lógica de login tradicional y registro.
7. **`js/main.js`** – No requiere cambios adicionales; la sesión guardada incluye `provider` y el router ya redirige según `role`.
8. **`README.md`** – (pendiente) se actualizará con una sección de configuración de Google.
9. **`task2.md`** – Plan inicial (ya creado).
10. **`taskResolved2.md`** – Este archivo (documenta la ejecución).

## Evidencia esperada

1. **UI** – Al cargar la aplicación, la vista de login muestra un botón azul con el logo de Google.
2. **Flujo** – Al pulsar el botón, se abre el popup de Google, el usuario selecciona su cuenta y la aplicación redirige al dashboard correspondiente.
3. **IndexedDB** – En la tabla `AUTH_USERS` aparece un registro con la propiedad `googleId`.
4. **Console** – Se muestra el payload del ID token y el objeto `user` autenticado.
5. **LocalStorage** – `AUTH_SESSION` contiene `{ userId, provider: 'google', role, username }`.

## Pasos para probar

1. Reemplaza `YOUR_GOOGLE_CLIENT_ID` en `js/infrastructure/google-config.js` con el client‑id obtenido en la consola de Google Cloud.
2. Ejecuta `npm install` si aún no tienes `localforage` y `bcryptjs` instalados (las dependencias ya están en `index.html`).
3. Inicia el servidor con `npx -y http-server -p 8080 -c-1` (ya está corriendo).
4. Abre `http://127.0.0.1:8080` en el navegador.
5. Verifica que el botón Google aparezca y realiza el login.
6. Abre las Herramientas de desarrollo → **Application → IndexedDB → AUTH_USERS** y confirma que el usuario tiene `googleId`.
7. En la consola, verifica que se imprimen los mensajes de éxito y el objeto `user`.

## Próximos pasos (si algo falla)

- Revisar la consola para errores de carga de la SDK.
- Asegurarse de que el `client_id` sea correcto y que el dominio `localhost` esté autorizado.
- Si la sesión no se guarda, comprobar que `localStorage.setItem('AUTH_SESSION', …)` se ejecuta.

---

_Este archivo se generó automáticamente como parte del proceso de implementación._
