/**
 * LoginView.js
 * Vista de Login y Registro - Capa de Presentación
 * 
 * Este módulo maneja toda la interfaz de usuario para login y registro.
 * Manipula el DOM y gestiona los eventos de los formularios.
 */

import { authenticateUser } from '../use_cases/AuthenticateUser.js';
import { registerUser } from '../use_cases/RegisterUser.js';
import * as authService from '../infrastructure/AuthService.js';
import * as userRepository from '../infrastructure/UserRepository.js';
import { ROLES } from '../domain/RoleValidation.js';

/**
 * Renderiza la vista de login en el contenedor principal
 * Muestra el formulario de login con opción de registro
 * 
 * Ejemplo de uso:
 * renderLoginView();
 */
export function renderLoginView() {
    // Obtener el contenedor principal
    const app = document.getElementById('app');
    
    // Crear el HTML de la vista de login
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
            </form>
            
            <p style="text-align: center; margin-top: 20px; color: #666;">
                ¿No tienes cuenta? <a href="#" id="show-register" style="color: #667eea;">Regístrate aquí</a>
            </p>
        </div>
    `;
    
    // Agregar event listeners
    document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        renderRegisterView();
    });
}

/**
 * Renderiza la vista de registro
 * Muestra el formulario de registro con selección de rol
 */
export function renderRegisterView() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="login-container">
            <h1>📝 Registro de Usuario</h1>
            
            <div id="message-container"></div>
            
            <!-- Formulario de Registro -->
            <form id="register-form">
                <div class="form-group">
                    <label for="register-username">Usuario</label>
                    <input 
                        type="text" 
                        id="register-username" 
                        name="username" 
                        placeholder="Elige un nombre de usuario"
                        required
                        minlength="3"
                    >
                </div>
                
                <div class="form-group">
                    <label for="register-password">Contraseña</label>
                    <input 
                        type="password" 
                        id="register-password" 
                        name="password" 
                        placeholder="Elige una contraseña"
                        required
                        minlength="4"
                    >
                </div>
                
                <div class="form-group">
                    <label for="register-password-confirm">Confirmar Contraseña</label>
                    <input 
                        type="password" 
                        id="register-password-confirm" 
                        name="password-confirm" 
                        placeholder="Confirma tu contraseña"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="register-role">Rol</label>
                    <select id="register-role" name="role" required>
                        <option value="">Selecciona un rol</option>
                        <option value="${ROLES.CLIENT}">Cliente</option>
                        <option value="${ROLES.ADMIN}">Administrador</option>
                        <option value="${ROLES.SUPER_ADMIN}">Super Administrador</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-primary">Registrarse</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px; color: #666;">
                ¿Ya tienes cuenta? <a href="#" id="show-login" style="color: #667eea;">Inicia sesión aquí</a>
            </p>
        </div>
    `;
    
    // Agregar event listeners
    document.getElementById('register-form').addEventListener('submit', handleRegisterSubmit);
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        renderLoginView();
    });
}

/**
 * Maneja el envío del formulario de login
 * Valida las credenciales y redirige al dashboard correspondiente
 * 
 * @param {Event} event - Evento de submit del formulario
 */
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    try {
        // Mostrar mensaje de carga
        showMessage('Iniciando sesión...', 'info');
        
        // Autenticar usuario (inyectando dependencias)
        const user = await authenticateUser(username, password, authService, userRepository);
        
        // Mostrar mensaje de éxito
        showMessage('¡Inicio de sesión exitoso!', 'success');
        
        // Redirigir al dashboard correspondiente según el rol
        // Esperar un momento para que el usuario vea el mensaje
        setTimeout(() => {
            window.location.hash = `#dashboard/${user.role}`;
            // El router en main.js se encargará de renderizar el dashboard correcto
        }, 500);
        
    } catch (error) {
        // Mostrar mensaje de error
        showMessage(error.message, 'error');
    }
}

/**
 * Maneja el envío del formulario de registro
 * Valida los datos y crea el nuevo usuario
 * 
 * @param {Event} event - Evento de submit del formulario
 */
async function handleRegisterSubmit(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    const role = document.getElementById('register-role').value;
    
    try {
        // Validar que las contraseñas coincidan
        if (password !== passwordConfirm) {
            throw new Error('Las contraseñas no coinciden');
        }
        
        // Validar que se seleccionó un rol
        if (!role) {
            throw new Error('Debes seleccionar un rol');
        }
        
        // Mostrar mensaje de carga
        showMessage('Registrando usuario...', 'info');
        
        // Registrar usuario (inyectando dependencias)
        const user = await registerUser(
            { username, password, role },
            authService,
            userRepository
        );
        
        // Mostrar mensaje de éxito
        showMessage('¡Registro exitoso! Redirigiendo al login...', 'success');
        
        // Redirigir al login después de un momento
        setTimeout(() => {
            renderLoginView();
        }, 1500);
        
    } catch (error) {
        // Mostrar mensaje de error
        showMessage(error.message, 'error');
    }
}

/**
 * Muestra un mensaje en el contenedor de mensajes
 * 
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success', 'error', 'info')
 */
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    
    // Determinar la clase CSS según el tipo
    let className = 'error-message';
    if (type === 'success') {
        className = 'success-message';
    } else if (type === 'info') {
        className = 'success-message'; // Usar el mismo estilo que success
    }
    
    // Crear el elemento de mensaje
    messageContainer.innerHTML = `
        <div class="${className}">
            ${message}
        </div>
    `;
}
