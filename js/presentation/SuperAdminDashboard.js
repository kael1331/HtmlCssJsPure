/**
 * SuperAdminDashboard.js
 * Dashboard de Super Administrador - Capa de Presentación
 * 
 * Este módulo renderiza el dashboard para usuarios con rol SuperAdmin.
 * Los super admins tienen control total sobre el sistema.
 */

import { logoutUser } from '../use_cases/AuthenticateUser.js';
import { registerUser } from '../use_cases/RegisterUser.js';
import * as userRepository from '../infrastructure/UserRepository.js';
import * as authService from '../infrastructure/AuthService.js';
import { ROLES } from '../domain/RoleValidation.js';

/**
 * Renderiza el dashboard de super administrador
 * 
 * Funcionalidades:
 * - Visualización de TODOS los usuarios
 * - Creación de usuarios de cualquier rol
 * - Edición de cualquier usuario
 * - Eliminación de usuarios
 * - Cambio de roles
 * - Estadísticas completas
 * 
 * @param {Object} user - Objeto de usuario autenticado
 */
export async function renderSuperAdminDashboard(user) {
    const app = document.getElementById('app');
    
    // Obtener todos los usuarios
    const allUsers = await userRepository.getAllUsers();
    
    // Calcular estadísticas
    const stats = {
        total: allUsers.length,
        superAdmins: allUsers.filter(u => u.role === ROLES.SUPER_ADMIN).length,
        admins: allUsers.filter(u => u.role === ROLES.ADMIN).length,
        clients: allUsers.filter(u => u.role === ROLES.CLIENT).length
    };
    
    app.innerHTML = `
        <div class="dashboard-container dashboard-superadmin">
            <div class="dashboard-header">
                <div>
                    <h1>👑 Panel de Super Administrador</h1>
                    <p style="color: #666;">Control Total del Sistema</p>
                </div>
                <div class="user-info">
                    <p><strong>${user.username}</strong></p>
                    <span class="role-badge role-superadmin">${user.role}</span>
                    <br><br>
                    <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
                </div>
            </div>
            
            <div id="message-container" style="margin-bottom: 20px;"></div>
            
            <!-- Estadísticas -->
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Total de Usuarios</h3>
                    <div class="stat-number">${stats.total}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #c33 0%, #a22 100%);">
                    <h3>Super Admins</h3>
                    <div class="stat-number">${stats.superAdmins}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #c93 0%, #a73 100%);">
                    <h3>Admins</h3>
                    <div class="stat-number">${stats.admins}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #3c3 0%, #2a2 100%);">
                    <h3>Clients</h3>
                    <div class="stat-number">${stats.clients}</div>
                </div>
            </div>
            
            <!-- Botón para crear nuevo usuario -->
            <div style="margin-bottom: 20px;">
                <button id="btn-create-user" class="btn btn-primary">
                    ➕ Crear Nuevo Usuario
                </button>
            </div>
            
            <!-- Formulario de creación (oculto por defecto) -->
            <div id="create-form-container" style="display: none; background: #fff; border: 2px solid #c33; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #c33; margin-bottom: 15px;">➕ Crear Nuevo Usuario</h3>
                <form id="create-user-form">
                    <div class="form-group">
                        <label>Nombre de Usuario</label>
                        <input type="text" id="new-username" required minlength="3">
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" id="new-password" required minlength="4">
                    </div>
                    <div class="form-group">
                        <label>Rol</label>
                        <select id="new-role" required>
                            <option value="">Selecciona un rol</option>
                            <option value="${ROLES.CLIENT}">Client</option>
                            <option value="${ROLES.ADMIN}">Admin</option>
                            <option value="${ROLES.SUPER_ADMIN}">SuperAdmin</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Crear Usuario</button>
                    <button type="button" id="btn-cancel-create" class="btn-logout" style="margin-left: 10px;">Cancelar</button>
                </form>
            </div>
            
            <!-- Lista de Todos los Usuarios -->
            <div style="background: #fff; padding: 20px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333;">👥 Todos los Usuarios</h2>
                    <label style="cursor: pointer; display: flex; align-items: center; font-weight: 500; color: #555;">
                        <input type="checkbox" id="toggle-clients" style="margin-right: 8px; transform: scale(1.2);">
                        Mostrar Clientes
                    </label>
                </div>
                ${allUsers.length === 0 ? 
                    '<p style="color: #999; text-align: center;">No hay usuarios registrados</p>' :
                    `<table class="users-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${allUsers.map(u => `
                                <tr class="${u.role === ROLES.CLIENT ? 'row-client' : ''}" style="${u.role === ROLES.CLIENT ? 'display: none;' : ''}">
                                    <td><strong>${u.username}</strong></td>
                                    <td>
                                        <span class="role-badge role-${u.role.toLowerCase().replace('admin', 'admin')}">${u.role}</span>
                                    </td>
                                    <td>${new Date(u.createdAt).toLocaleDateString('es-ES')}</td>
                                    <td>
                                        <button class="btn-small btn-edit" data-user-id="${u.id}">Editar</button>
                                        <select class="btn-small" data-user-id="${u.id}" data-current-role="${u.role}" onchange="window.handleRoleChange(this)">
                                            <option value="">Cambiar Rol</option>
                                            <option value="${ROLES.CLIENT}">Client</option>
                                            <option value="${ROLES.ADMIN}">Admin</option>
                                            <option value="${ROLES.SUPER_ADMIN}">SuperAdmin</option>
                                        </select>
                                        ${u.id !== user.id ? `<button class="btn-small btn-delete" data-user-id="${u.id}">Eliminar</button>` : ''}
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
    document.getElementById('btn-create-user').addEventListener('click', showCreateForm);
    
    // Event listener para el filtro de clientes
    const toggleClients = document.getElementById('toggle-clients');
    if (toggleClients) {
        toggleClients.addEventListener('change', (e) => {
            const clientRows = document.querySelectorAll('.row-client');
            clientRows.forEach(row => {
                row.style.display = e.target.checked ? 'table-row' : 'none';
            });
        });
    }
    
    const cancelBtn = document.getElementById('btn-cancel-create');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideCreateForm);
    }
    
    const createForm = document.getElementById('create-user-form');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateUser);
    }
    
    // Event listeners para botones de editar
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-user-id');
            handleEditUser(userId);
        });
    });
    
    // Event listeners para botones de eliminar
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = e.target.getAttribute('data-user-id');
            handleDeleteUser(userId);
        });
    });
    
    // Función global para cambio de rol (llamada desde el select)
    window.handleRoleChange = async function(selectElement) {
        const userId = selectElement.getAttribute('data-user-id');
        const newRole = selectElement.value;
        const currentRole = selectElement.getAttribute('data-current-role');
        
        if (newRole && newRole !== currentRole) {
            if (confirm(`¿Estás seguro de cambiar el rol a ${newRole}?`)) {
                await handleChangeRole(userId, newRole);
            }
        }
        
        // Resetear el select
        selectElement.value = '';
    };
}

/**
 * Muestra el formulario de creación
 */
function showCreateForm() {
    document.getElementById('create-form-container').style.display = 'block';
    document.getElementById('btn-create-user').style.display = 'none';
}

/**
 * Oculta el formulario de creación
 */
function hideCreateForm() {
    document.getElementById('create-form-container').style.display = 'none';
    document.getElementById('btn-create-user').style.display = 'block';
    document.getElementById('create-user-form').reset();
}

/**
 * Maneja la creación de un nuevo usuario
 */
async function handleCreateUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    const role = document.getElementById('new-role').value;
    
    try {
        await registerUser(
            { username, password, role },
            authService,
            userRepository
        );
        
        showMessage('✅ Usuario creado correctamente', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

/**
 * Maneja la edición de un usuario
 */
async function handleEditUser(userId) {
    const user = await userRepository.getUserById(userId);
    
    const newUsername = prompt('Nuevo nombre de usuario:', user.username);
    
    if (newUsername && newUsername.trim() !== '') {
        try {
            user.username = newUsername.trim();
            user.updatedAt = new Date();
            
            await userRepository.updateUser(user);
            
            showMessage('✅ Usuario actualizado correctamente', 'success');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } catch (error) {
            showMessage('❌ ' + error.message, 'error');
        }
    }
}

/**
 * Maneja el cambio de rol de un usuario
 */
async function handleChangeRole(userId, newRole) {
    try {
        const user = await userRepository.getUserById(userId);
        
        user.role = newRole;
        user.updatedAt = new Date();
        
        await userRepository.updateUser(user);
        
        showMessage('✅ Rol cambiado correctamente', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    } catch (error) {
        showMessage('❌ ' + error.message, 'error');
    }
}

/**
 * Maneja la eliminación de un usuario
 */
async function handleDeleteUser(userId) {
    if (confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
        try {
            await userRepository.deleteUser(userId);
            
            showMessage('✅ Usuario eliminado correctamente', 'success');
            
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
