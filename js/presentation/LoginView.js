/**
 * LoginView.js
 * Vista de Login y Registro - Capa de Presentación
 *
 * Este módulo maneja la interfaz de usuario para login y registro,
 * incluyendo la integración con Google Sign‑In.
 */

// --- Imports ---------------------------------------------------------------
import { loadGoogleSDK, signInWithGoogle } from '../infrastructure/GoogleAuthService.js';
import { authenticateWithGoogle } from '../use_cases/AuthenticateWithGoogle.js';
import { authenticateUser } from '../use_cases/AuthenticateUser.js';
import { registerUser } from '../use_cases/RegisterUser.js';
import * as authService from '../infrastructure/AuthService.js';
import * as userRepository from '../infrastructure/UserRepository.js';
import { ROLES } from '../domain/RoleValidation.js';

// --------------------------------------------------------------------------
/**
 * Renderiza la vista de login en el contenedor principal.
 * Incluye formulario tradicional y botón de Google.
 */
export function renderLoginView() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="login-container">
            <h1>🔐 Sistema de Autenticación</h1>
            <div id="message-container"></div>
            <!-- Formulario de Login -->
            <form id="login-form">
                <div class="form-group">
                    <label for="login-username">Usuario</label>
                    <input 
                        type="text" 
                        id="login-username" 
                        name="username" 
                        placeholder="Ingresa tu usuario"
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        name="password" 
                        placeholder="Ingresa tu contraseña"
                        required
                    >
                </div>
                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                <!-- Botón Google -->
                <button type="button" id="google-login" class="btn btn-google" style="margin-top:15px; background:#4285F4; color:white;">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style="height:16px; vertical-align:middle; margin-right:5px;"/> Iniciar con Google
                </button>
            </form>
            <p style="text-align: center; margin-top: 20px; color: #666;">
                ¿No tienes cuenta? <a href="#" id="show-register" style="color: #667eea;">Regístrate aquí</a>
            </p>
        </div>
    `;
    // Event listeners
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        renderRegisterView();
    });
    document.getElementById('google-login').addEventListener('click', handleGoogleLogin);
}

/**
 * Renderiza la vista de registro (manteniendo la lógica existente).
 */
export function renderRegisterView() {
    // Re‑utilizamos la implementación original (se mantiene sin cambios).
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="login-container">
            <h1>📝 Registro de Usuario</h1>
            <div id="message-container"></div>
            <form id="register-form">
                <div class="form-group">
                    <label for="register-username">Usuario</label>
                    <input type="text" id="register-username" name="username" placeholder="Elige un nombre de usuario" required minlength="3">
                </div>
                <div class="form-group">
                    <label for="register-password">Contraseña</label>
                    <input type="password" id="register-password" name="password" placeholder="Elige una contraseña" required minlength="4">
                </div>
                <div class="form-group">
                    <label for="register-password-confirm">Confirmar Contraseña</label>
                    <input type="password" id="register-password-confirm" name="password-confirm" placeholder="Confirma tu contraseña" required>
                </div>

                <button type="submit" class="btn btn-primary">Registrarse</button>
            </form>
            <p style="text-align: center; margin-top: 20px; color: #666;">
                ¿Ya tienes cuenta? <a href="#" id="show-login" style="color: #667eea;">Inicia sesión aquí</a>
            </p>
        </div>
    `;
    document.getElementById('register-form').addEventListener('submit', handleRegisterSubmit);
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        renderLoginView();
    });
}

/**
 * Maneja el envío del formulario de login tradicional.
 */
async function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    try {
        showMessage('Iniciando sesión...', 'info');
        const user = await authenticateUser(username, password, authService, userRepository);
        showMessage('¡Login exitoso!', 'success');
        setTimeout(() => {
            window.location.hash = `#dashboard/${user.role}`;
        }, 500);
    } catch (err) {
        showMessage(err.message, 'error');
    }
}

/**
 * Maneja el registro de un nuevo usuario.
 */
async function handleRegisterSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const role = ROLES.CLIENT;
    if (password !== passwordConfirm) {
        showMessage('Las contraseñas no coinciden', 'error');
        return;
    }
    try {
        showMessage('Registrando usuario...', 'info');
        const user = await registerUser({ username, password, role }, authService, userRepository);
        showMessage('¡Registro exitoso! Redirigiendo al login...', 'success');
        setTimeout(() => renderLoginView(), 1500);
    } catch (err) {
        showMessage(err.message, 'error');
    }
}

/**
 * Maneja el login con Google.
 */
async function handleGoogleLogin() {
    try {
        showMessage('Cargando Google Sign‑In...', 'info');
        await loadGoogleSDK();
        const idToken = await signInWithGoogle();
        const user = await authenticateWithGoogle(idToken);
        showMessage('¡Login con Google exitoso! Redirigiendo…', 'success');
        setTimeout(() => {
            window.location.hash = `#dashboard/${user.role}`;
        }, 500);
    } catch (err) {
        console.error('Error en login Google:', err);
        showMessage(err.message || 'Error al iniciar sesión con Google', 'error');
    }
}

/**
 * Muestra mensajes al usuario.
 */
function showMessage(message, type) {
    const container = document.getElementById('message-container');
    let className = 'error-message';
    if (type === 'success') className = 'success-message';
    else if (type === 'info') className = 'info-message';
    container.innerHTML = `<div class="${className}">${message}</div>`;
}
