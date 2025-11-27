/**
 * ClientDashboard.js
 * Dashboard de Cliente - Capa de Presentación
 * 
 * Este módulo renderiza el dashboard para usuarios con rol Client.
 * Los clientes solo pueden ver y editar su propio perfil.
 */

import { logoutUser, getCurrentSession } from '../use_cases/AuthenticateUser.js';
import * as userRepository from '../infrastructure/UserRepository.js';
import * as authService from '../infrastructure/AuthService.js';

/**
 * Renderiza el dashboard de cliente
 * 
 * Funcionalidades:
 * - Visualización de información del perfil
 * - Edición de username
 * - Cambio de contraseña
 * - Logout
 * 
 * @param {Object} user - Objeto de usuario autenticado
 */
export async function renderClientDashboard(user) {
    const app = document.getElementById('app');
    
    // Obtener datos completos del usuario
    const fullUser = await userRepository.getUserById(user.id);
    
    app.innerHTML = `
        <div class="dashboard-container dashboard-client">
            <div class="dashboard-header">
                <div>
                    <h1>👤 Mi Perfil</h1>
                    <p style="color: #666;">Panel de Cliente</p>
                </div>
                <div class="user-info">
                    <p><strong>${fullUser.username}</strong></p>
                    <span class="role-badge role-client">${fullUser.role}</span>
                    <br><br>
                    <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
                </div>
            </div>
            
            <div id="message-container" style="margin-bottom: 20px;"></div>
            
            <!-- Información del Perfil -->
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="margin-bottom: 15px; color: #333;">📋 Información Personal</h2>
                <p><strong>ID:</strong> ${fullUser.id}</p>
                <p><strong>Usuario:</strong> ${fullUser.username}</p>
                <p><strong>Rol:</strong> ${fullUser.role}</p>
                <p><strong>Fecha de Registro:</strong> ${new Date(fullUser.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
            
            <!-- Formulario de Edición de Perfil -->
            <div style="background: #fff; border: 2px solid #3c3; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin-bottom: 15px; color: #3c3;">✏️ Editar Perfil</h3>
                <form id="edit-profile-form">
                    <div class="form-group">
                        <label for="edit-username">Nuevo Nombre de Usuario</label>
                        <input 
                            type="text" 
                            id="edit-username" 
                            value="${fullUser.username}"
                            minlength="3"
                            required
                        >
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </form>
            </div>
            
            <!-- Formulario de Cambio de Contraseña -->
            <div style="background: #fff; border: 2px solid #3c3; padding: 20px; border-radius: 8px;">
                <h3 style="margin-bottom: 15px; color: #3c3;">🔒 Cambiar Contraseña</h3>
                <form id="change-password-form">
                    <div class="form-group">
                        <label for="current-password">Contraseña Actual</label>
                        <input 
                            type="password" 
                            id="current-password"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <label for="new-password">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            id="new-password"
                            minlength="4"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirmar Nueva Contraseña</label>
                        <input 
                            type="password" 
                            id="confirm-password"
                            required
                        >
                    </div>
                    <button type="submit" class="btn btn-primary">Cambiar Contraseña</button>
                </form>
            </div>
        </div>
    `;
    
    // Event listeners
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
    document.getElementById('edit-profile-form').addEventListener('submit', (e) => handleEditProfile(e, fullUser));
    document.getElementById('change-password-form').addEventListener('submit', (e) => handleChangePassword(e, fullUser));
}

/**
 * Maneja el cierre de sesión
 */
function handleLogout() {
    logoutUser();
    window.location.hash = '#login';
}

/**
 * Maneja la edición del perfil
 */
async function handleEditProfile(event, user) {
    event.preventDefault();
    
    const newUsername = document.getElementById('edit-username').value.trim();
    
    try {
        // Verificar que el username no esté tomado por otro usuario
        const existingUser = await userRepository.getUserByUsername(newUsername);
        if (existingUser && existingUser.id !== user.id) {
            throw new Error('El nombre de usuario ya está en uso');
        }
        
        // Actualizar usuario
        user.username = newUsername;
        user.updatedAt = new Date();
        
        await userRepository.updateUser(user);
        
        // Actualizar sesión
        const session = getCurrentSession();
        session.username = newUsername;
        localStorage.setItem('AUTH_SESSION', JSON.stringify(session));
        
        showMessage('✅ Perfil actualizado correctamente', 'success');
        
        // Recargar dashboard
        setTimeout(() => {
            renderClientDashboard({ id: user.id });
        }, 1000);
        
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

/**
 * Maneja el cambio de contraseña
 */
async function handleChangePassword(event, user) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    try {
        // Validar que las contraseñas nuevas coincidan
        if (newPassword !== confirmPassword) {
            throw new Error('Las contraseñas nuevas no coinciden');
        }
        
        // Verificar contraseña actual
        const isValid = await authService.comparePassword(currentPassword, user.password);
        if (!isValid) {
            throw new Error('La contraseña actual es incorrecta');
        }
        
        // Generar hash de la nueva contraseña
        const newHash = await authService.hashPassword(newPassword);
        
        // Actualizar usuario
        user.password = newHash;
        user.updatedAt = new Date();
        
        await userRepository.updateUser(user);
        
        showMessage('✅ Contraseña cambiada correctamente', 'success');
        
        // Limpiar formulario
        document.getElementById('change-password-form').reset();
        
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

/**
 * Muestra un mensaje en el contenedor de mensajes
 */
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    const className = type === 'success' ? 'success-message' : 'error-message';
    
    messageContainer.innerHTML = `<div class="${className}">${message}</div>`;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}
