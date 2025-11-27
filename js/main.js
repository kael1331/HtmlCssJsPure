/**
 * main.js
 * Punto de Entrada de la Aplicación - Orquestación Principal
 * 
 * Este módulo es el punto de entrada de la aplicación SPA.
 * Maneja la inicialización, el routing basado en roles y la protección de rutas.
 */

import { renderLoginView } from './presentation/LoginView.js';
import { renderClientDashboard } from './presentation/ClientDashboard.js';
import { renderAdminDashboard } from './presentation/AdminDashboard.js';
import { renderSuperAdminDashboard } from './presentation/SuperAdminDashboard.js';
import { getCurrentSession } from './use_cases/AuthenticateUser.js';
import { registerUser } from './use_cases/RegisterUser.js';
import * as authService from './infrastructure/AuthService.js';
import * as userRepository from './infrastructure/UserRepository.js';
import { ROLES } from './domain/RoleValidation.js';

/**
 * Inicializa la aplicación
 * 
 * Flujo de inicialización:
 * 1. Verificar si existe un SuperAdmin en el sistema
 * 2. Si no existe, crear uno automáticamente con credenciales por defecto
 * 3. Verificar si hay sesión activa
 * 4. Si hay sesión, redirigir al dashboard correspondiente
 * 5. Si no hay sesión, mostrar LoginView
 */
async function init() {
    try {
        console.log('🚀 Inicializando aplicación...');
        
        // 1. Verificar si existe un SuperAdmin
        await ensureSuperAdminExists();
        
        // 2. Verificar sesión activa
        const session = getCurrentSession();
        
        if (session && session.userId) {
            console.log('✅ Sesión activa detectada:', session.username);
            
            // Obtener datos completos del usuario
            const user = await userRepository.getUserById(session.userId);
            
            if (user) {
                // Redirigir al dashboard correspondiente
                router(user);
            } else {
                // Si el usuario no existe (fue eliminado), cerrar sesión
                console.warn('⚠️ Usuario no encontrado, cerrando sesión');
                localStorage.removeItem('AUTH_SESSION');
                renderLoginView();
            }
        } else {
            console.log('ℹ️ No hay sesión activa, mostrando login');
            renderLoginView();
        }
        
        // 3. Configurar listener para cambios en el hash (navegación)
        window.addEventListener('hashchange', handleHashChange);
        
    } catch (error) {
        console.error('❌ Error al inicializar aplicación:', error);
        renderLoginView();
    }
}

/**
 * Asegura que exista al menos un SuperAdmin en el sistema
 * Si no existe ninguno, crea uno automáticamente con credenciales por defecto
 * 
 * Credenciales del SuperAdmin por defecto:
 * - Usuario: kael
 * - Contraseña: 1234
 */
async function ensureSuperAdminExists() {
    try {
        // Obtener todos los usuarios
        const allUsers = await userRepository.getAllUsers();
        
        // Verificar si existe al menos un SuperAdmin
        const superAdminExists = allUsers.some(u => u.role === ROLES.SUPER_ADMIN);
        
        if (!superAdminExists) {
            console.log('⚠️ No existe ningún SuperAdmin, creando uno por defecto...');
            
            // Crear SuperAdmin por defecto
            const defaultSuperAdmin = {
                username: 'kael',
                password: '1234',
                role: ROLES.SUPER_ADMIN
            };
            
            await registerUser(defaultSuperAdmin, authService, userRepository);
            
            console.log('✅ SuperAdmin creado correctamente');
            console.log('📝 Credenciales: usuario="kael", contraseña="1234"');
        } else {
            console.log('✅ SuperAdmin ya existe en el sistema');
        }
        
    } catch (error) {
        console.error('❌ Error al verificar/crear SuperAdmin:', error);
    }
}

/**
 * Router principal de la aplicación
 * Redirige al dashboard correspondiente según el rol del usuario
 * 
 * @param {Object} user - Usuario autenticado
 */
function router(user) {
    console.log('🔀 Routing para usuario:', user.username, '- Rol:', user.role);
    
    // Renderizar el dashboard correspondiente según el rol
    switch (user.role) {
        case ROLES.SUPER_ADMIN:
            renderSuperAdminDashboard(user);
            break;
            
        case ROLES.ADMIN:
            renderAdminDashboard(user);
            break;
            
        case ROLES.CLIENT:
            renderClientDashboard(user);
            break;
            
        default:
            console.error('❌ Rol no reconocido:', user.role);
            renderLoginView();
    }
}

/**
 * Maneja los cambios en el hash de la URL (navegación)
 * Permite navegación mediante URLs como #login, #dashboard/SuperAdmin, etc.
 */
async function handleHashChange() {
    const hash = window.location.hash;
    
    console.log('🔗 Hash cambiado:', hash);
    
    // Si el hash es #login, mostrar login
    if (hash === '#login') {
        localStorage.removeItem('AUTH_SESSION');
        renderLoginView();
        return;
    }
    
    // Si el hash es #dashboard/[role], verificar sesión y mostrar dashboard
    if (hash.startsWith('#dashboard/')) {
        const session = getCurrentSession();
        
        if (session && session.userId) {
            const user = await userRepository.getUserById(session.userId);
            
            if (user) {
                router(user);
            } else {
                renderLoginView();
            }
        } else {
            renderLoginView();
        }
        return;
    }
    
    // Si no hay hash específico, inicializar normalmente
    if (!hash || hash === '#') {
        init();
    }
}

/**
 * Función de logout global
 * Cierra la sesión y redirige al login
 */
window.logout = function() {
    console.log('👋 Cerrando sesión...');
    localStorage.removeItem('AUTH_SESSION');
    window.location.hash = '#login';
    renderLoginView();
};

/**
 * Espera a que las librerías globales estén disponibles
 * Las librerías bcrypt y localforage se cargan desde CDN y deben estar disponibles
 * antes de que los módulos ES puedan usarlas
 */
function waitForLibraries() {
    return new Promise((resolve) => {
        const checkLibraries = () => {
            if (window.bcrypt && window.localforage) {
                console.log('✅ Librerías globales disponibles');
                resolve();
            } else {
                console.log('⏳ Esperando librerías globales...');
                setTimeout(checkLibraries, 100);
            }
        };
        checkLibraries();
    });
}

// Inicializar la aplicación cuando el DOM y las librerías estén listos
async function startApp() {
    // Esperar a que las librerías estén disponibles
    await waitForLibraries();
    
    // Inicializar la aplicación
    await init();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    // El DOM ya está listo, inicializar inmediatamente
    startApp();
}

console.log('📦 Módulo main.js cargado correctamente');
