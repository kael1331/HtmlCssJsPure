/**
 * GoogleAuthService.js
 * Wrapper para la API de Google Sign‑In (Identity Services).
 *
 * Provee funciones para cargar la SDK, iniciar el flujo de login y verificar
 * el ID token recibido.
 */
import { GOOGLE_CLIENT_ID } from './google-config.js';

/**
 * Carga de forma asíncrona la librería de Google Identity Services.
 * Devuelve una promesa que se resuelve cuando la librería está disponible.
 */
export function loadGoogleSDK() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
            // SDK ya cargada
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Error al cargar Google Identity SDK'));
        document.head.appendChild(script);
    });
}

/**
 * Inicia el proceso de login con Google.
 * @returns {Promise<string>} ID token JWT devuelto por Google.
 */
export function signInWithGoogle() {
    return new Promise((resolve, reject) => {
        // Renderizamos el botón de Google de forma invisible para poder usarlo programáticamente
        const container = document.createElement('div');
        container.id = 'google-signin-button';
        container.style.display = 'none';
        document.body.appendChild(container);

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
                // response.credential contiene el ID token JWT
                resolve(response.credential);
                // Limpiamos el contenedor
                document.body.removeChild(container);
            },
            cancel_on_tap_outside: true,
            auto_select: false,
        });
        // Mostramos el botón (aunque esté oculto) y lo pulsamos programáticamente
        window.google.accounts.id.renderButton(container, {
            theme: 'outline',
            size: 'large',
        });
        // Simulamos click
        container.firstChild?.click();
    });
}

/**
 * Decodifica y valida el ID token JWT.
 * Utiliza la librería `jwt-decode` (debe estar incluida en el proyecto).
 * @param {string} token - ID token JWT.
 * @returns {Object} Payload del token (contiene sub, email, name, etc.).
 */
export function decodeIdToken(token) {
    // jwt-decode es una dependencia ligera que no requiere verificación de firma
    // en el cliente (solo se usa para extraer datos). La firma se verifica en el backend
    // en entornos productivos, pero aquí solo necesitamos el sub y email.
    // Si la librería no está disponible, la cargamos dinámicamente.
    if (!window.jwt_decode) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jwt-decode@3/build/jwt-decode.min.js';
        script.async = true;
        script.onload = () => {};
        document.head.appendChild(script);
    }
    // Esperamos a que la función esté disponible
    return new Promise((resolve, reject) => {
        const wait = () => {
            if (window.jwt_decode) {
                try {
                    const payload = window.jwt_decode(token);
                    resolve(payload);
                } catch (e) {
                    reject(e);
                }
            } else {
                setTimeout(wait, 50);
            }
        };
        wait();
    });
}
