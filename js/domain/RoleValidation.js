/**
 * RoleValidation.js
 * Validación de Roles - Capa de Dominio
 * 
 * Este módulo contiene toda la lógica de negocio relacionada con
 * los roles de usuario y sus permisos en el sistema.
 * 
 * Define los roles válidos y las reglas de permisos entre roles.
 */

/**
 * Constante ROLES
 * Define los tres roles válidos en el sistema
 */
export const ROLES = {
    SUPER_ADMIN: 'SuperAdmin',
    ADMIN: 'Admin',
    CLIENT: 'Client'
};

/**
 * Valida si un rol es válido en el sistema
 * 
 * @param {string} role - Rol a validar
 * @returns {boolean} - true si el rol es válido, false si no
 * 
 * Ejemplo de uso:
 * if (isValidRole('SuperAdmin')) {
 *     console.log('Rol válido');
 * }
 */
export function isValidRole(role) {
    // Verificar que el rol esté en la lista de roles válidos
    return Object.values(ROLES).includes(role);
}

/**
 * Determina si un rol puede gestionar (crear/editar/eliminar) a otro rol
 * 
 * Reglas de permisos:
 * - SuperAdmin puede gestionar TODOS los roles (SuperAdmin, Admin, Client)
 * - Admin solo puede gestionar Client
 * - Client no puede gestionar a nadie
 * 
 * @param {string} managerRole - Rol del usuario que intenta gestionar
 * @param {string} targetRole - Rol del usuario objetivo
 * @returns {boolean} - true si puede gestionar, false si no
 * 
 * Ejemplo de uso:
 * if (canManageUser('Admin', 'Client')) {
 *     console.log('El Admin puede gestionar al Client');
 * }
 */
export function canManageUser(managerRole, targetRole) {
    // SuperAdmin puede gestionar a todos
    if (managerRole === ROLES.SUPER_ADMIN) {
        return true;
    }
    
    // Admin solo puede gestionar a Client
    if (managerRole === ROLES.ADMIN) {
        return targetRole === ROLES.CLIENT;
    }
    
    // Client no puede gestionar a nadie
    if (managerRole === ROLES.CLIENT) {
        return false;
    }
    
    // Si el rol no es válido, no puede gestionar
    return false;
}

/**
 * Obtiene los permisos específicos de un rol
 * 
 * Retorna un objeto con los permisos del rol:
 * - canCreateUsers: Puede crear usuarios
 * - canEditUsers: Puede editar usuarios
 * - canDeleteUsers: Puede eliminar usuarios
 * - canChangeRoles: Puede cambiar roles de usuarios
 * - canViewAllUsers: Puede ver todos los usuarios del sistema
 * 
 * @param {string} role - Rol del usuario
 * @returns {Object} - Objeto con los permisos del rol
 * 
 * Ejemplo de uso:
 * const permissions = getRolePermissions('Admin');
 * if (permissions.canCreateUsers) {
 *     console.log('Puede crear usuarios');
 * }
 */
export function getRolePermissions(role) {
    // Permisos por defecto (ninguno)
    const defaultPermissions = {
        canCreateUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canChangeRoles: false,
        canViewAllUsers: false
    };
    
    // Permisos según el rol
    switch (role) {
        case ROLES.SUPER_ADMIN:
            // SuperAdmin tiene TODOS los permisos
            return {
                canCreateUsers: true,
                canEditUsers: true,
                canDeleteUsers: true,
                canChangeRoles: true,
                canViewAllUsers: true
            };
            
        case ROLES.ADMIN:
            // Admin tiene permisos limitados
            return {
                canCreateUsers: true,  // Solo puede crear Clients
                canEditUsers: true,    // Solo puede editar Clients
                canDeleteUsers: false, // No puede eliminar usuarios
                canChangeRoles: false, // No puede cambiar roles
                canViewAllUsers: false // Solo ve Clients
            };
            
        case ROLES.CLIENT:
            // Client no tiene permisos de gestión
            return defaultPermissions;
            
        default:
            // Si el rol no es válido, no tiene permisos
            return defaultPermissions;
    }
}

/**
 * Verifica si un rol puede ver a otro usuario
 * 
 * Reglas:
 * - SuperAdmin puede ver a todos
 * - Admin puede ver a Clients y a sí mismo
 * - Client solo puede verse a sí mismo
 * 
 * @param {string} viewerRole - Rol del usuario que intenta ver
 * @param {string} targetRole - Rol del usuario objetivo
 * @param {string} viewerId - ID del usuario que intenta ver
 * @param {string} targetId - ID del usuario objetivo
 * @returns {boolean} - true si puede ver, false si no
 * 
 * Ejemplo de uso:
 * if (canViewUser('Admin', 'Client', 'admin-id', 'client-id')) {
 *     console.log('El Admin puede ver al Client');
 * }
 */
export function canViewUser(viewerRole, targetRole, viewerId, targetId) {
    // Un usuario siempre puede verse a sí mismo
    if (viewerId === targetId) {
        return true;
    }
    
    // SuperAdmin puede ver a todos
    if (viewerRole === ROLES.SUPER_ADMIN) {
        return true;
    }
    
    // Admin solo puede ver a Clients
    if (viewerRole === ROLES.ADMIN) {
        return targetRole === ROLES.CLIENT;
    }
    
    // Client solo puede verse a sí mismo (ya verificado arriba)
    return false;
}
