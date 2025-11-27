/**
 * AdminDashboard.js
 * Dashboard de Administrador - Capa de Presentación
 * 
 * Este módulo renderiza el dashboard para usuarios con rol Admin.
 * Los admins pueden gestionar usuarios tipo Client (crear y editar).
 */

import { logoutUser } from '../use_cases/AuthenticateUser.js';
import { registerUser } from '../use_cases/RegisterUser.js';
import * as userRepository from '../infrastructure/UserRepository.js';
import * as authService from '../infrastructure/AuthService.js';
import { ROLES, canManageUser } from '../domain/RoleValidation.js';

/**
 * Renderiza el dashboard de administrador
 * 
 * Funcionalidades:
 * - Visualización de usuarios Client
 * - Creación de nuevos usuarios Client
 * - Edición de usuarios Client
 * - Estadísticas limitadas
 * 
 * @param {Object} user - Objeto de usuario autenticado
 */
export async function renderAdminDashboard(user) {
    const app = document.getElementById('app');
    
    // Obtener todos los usuarios
    const allUsers = await userRepository.getAllUsers();
    
    // Filtrar solo usuarios Client (Admin solo puede ver Clients)
    const clientUsers = allUsers.filter(u => u.role === ROLES.CLIENT);
    
    // Calcular estadísticas
    const stats = {
        totalClients: clientUsers.length
    };
    
    app.innerHTML = `
        <div class="dashboard-container dashboard-admin">
            <div class="dashboard-header">
                <div>
                    <h1>⚙️ Panel de Administración</h1>
                    <p style="color: #666;">Dashboard de Admin</p>
                </div>
                <div class="user-info">
                    <p><strong>${user.username}</strong></p>
                    <span class="role-badge role-admin">${user.role}</span>
                    <br><br>
                    <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
                </div>
            </div>
            
            <div id="message-container" style="margin-bottom: 20px;"></div>
            
            <!-- Estadísticas -->
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Total de Clientes</h3>
                    <div class="stat-number">${stats.totalClients}</div>
                </div>
            </div>
            
            <!-- Botón para crear nuevo cliente -->
            <div style="margin-bottom: 20px;">
                <button id="btn-create-client" class="btn btn-primary">
                    ➕ Crear Nuevo Cliente
                </button>
            </div>
            
            <!-- Formulario de creación (oculto por defecto) -->
            <div id="create-form-container" style="display: none; background: #fff; border: 2px solid #c93; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #c93; margin-bottom: 15px;">➕ Crear Nuevo Cliente</h3>
                <form id="create-client-form">
                    <div class="form-group">
                        <label>Nombre de Usuario</label>
                        <input type="text" id="new-username" required minlength="3">
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="new-password" required minlength="4">
                    </div>
                    <button type="submit" class="btn btn-primary">Crear Cliente</button>
                    <button type="button" id="btn-cancel-create" class="btn-logout" style="margin-left: 10px;">Cancelar</button>
                </form>
            </div>
            
            <!-- Lista de Clientes -->
            <div style="background: #fff; padding: 20px; border-radius: 8px;">
                <h2 style="margin-bottom: 20px; color: #333;">👥 Usuarios Client</h2>
                ${clientUsers.length === 0 ? 
                    '<p style="color: #999; text-align: center;">No hay clientes registrados</p>' :
                    `<table class="users-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clientUsers.map(u => `
                                <tr>
                                    <td><strong>${u.username}</strong></td>
                                    <td>${new Date(u.createdAt).toLocaleDateString('es-ES')}</td>
                                    <td>
                                        <button class="btn-small btn-edit" data-user-id="${u.id}">Editar</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>`
                }
            </div>
        </div>
    `;
    
    // Event listeners
    document.getElementById('btn-logout').addEventListener('click', handleLogout);
    document.getElementById('btn-create-client').addEventListener('click', showCreateForm);
    
    const cancelBtn = document.getElementById('btn-cancel-create');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideCreateForm);
    }
    
    const createForm = document.getElementById('create-client-form');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateClient);
    }
    
    // Event listeners para botones de editar
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-user-id');
            handleEditClient(userId);
        });
    });
}

/**
 * Muestra el formulario de creación
 */
function showCreateForm() {
    document.getElementById('create-form-container').style.display = 'block';
    document.getElementById('btn-create-client').style.display = 'none';
}

/**
 * Oculta el formulario de creación
 */
function hideCreateForm() {
    document.getElementById('create-form-container').style.display = 'none';
    document.getElementById('btn-create-client').style.display = 'block';
    document.getElementById('create-client-form').reset();
}

/**
 * Maneja la creación de un nuevo cliente
 */
async function handleCreateClient(event) {
    event.preventDefault();
    
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    
    try {
        // Crear usuario con rol Client
        await registerUser(
            { username, password, role: ROLES.CLIENT },
            authService,
            userRepository
        );
        
        showMessage('✅ Cliente creado correctamente', 'success');
        
        // Recargar dashboard
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

/**
 * Maneja la edición de un cliente
 */
async function handleEditClient(userId) {
    const user = await userRepository.getUserById(userId);
    
    const newUsername = prompt('Nuevo nombre de usuario:', user.username);
    
    if (newUsername && newUsername.trim() !== '') {
        try {
            user.username = newUsername.trim();
            user.updatedAt = new Date();
            
            await userRepository.updateUser(user);
            
            showMessage('✅ Cliente actualizado correctamente', 'success');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } catch (error) {
            showMessage('❌ ' + error.message, 'error');
        }
    }
}

/**
 * Maneja el cierre de sesión
 */
function handleLogout() {
    logoutUser();
    window.location.hash = '#login';
}

/**
 * Muestra un mensaje
 */
function showMessage(message, type) {
    const messageContainer = document.getElementById('message-container');
    const className = type === 'success' ? 'success-message' : 'error-message';
    
    messageContainer.innerHTML = `<div class="${className}">${message}</div>`;
    
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}
