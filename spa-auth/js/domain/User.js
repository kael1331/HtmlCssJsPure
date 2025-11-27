/**
 * User.js
 * Entidad de Usuario - Capa de Dominio
 * 
 * Este módulo define la entidad User con toda la lógica de negocio pura
 * relacionada con los usuarios del sistema.
 * 
 * La entidad User representa un usuario del sistema con sus propiedades
 * y métodos de validación, serialización y deserialización.
 */

/**
 * Clase User - Entidad de Usuario
 * 
 * Propiedades:
 * - id: Identificador único del usuario
 * - username: Nombre de usuario (único en el sistema)
 * - password: Contraseña hasheada (NUNCA en texto plano)
 * - role: Rol del usuario (SuperAdmin, Admin, Client)
 * - createdAt: Fecha de creación del usuario
 * - updatedAt: Fecha de última actualización
 */
export class User {
    /**
     * Constructor de la clase User
     * 
     * @param {string} id - ID único del usuario
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña hasheada
     * @param {string} role - Rol del usuario (SuperAdmin, Admin, Client)
     * @param {Date} createdAt - Fecha de creación (opcional, se genera automáticamente)
     * @param {Date} updatedAt - Fecha de actualización (opcional, se genera automáticamente)
     */
    constructor(id, username, password, role, createdAt = null, updatedAt = null) {
        // Validaciones básicas
        if (!id || !username || !password || !role) {
            throw new Error('Todos los campos son obligatorios: id, username, password, role');
        }
        
        // Asignar propiedades
        this.id = id;
        this.username = username;
        this.password = password; // Debe ser un hash, no texto plano
        this.role = role;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    
    /**
     * Convierte el objeto User a un objeto JSON plano
     * Útil para serialización y almacenamiento
     * 
     * @returns {Object} - Objeto plano con las propiedades del usuario
     * 
     * Ejemplo de uso:
     * const user = new User('1', 'admin', 'hash', 'SuperAdmin');
     * const json = user.toJSON();
     * console.log(json); // { id: '1', username: 'admin', ... }
     */
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
    
    /**
     * Crea una instancia de User desde un objeto JSON
     * Método estático para deserialización
     * 
     * @param {Object} data - Objeto con los datos del usuario
     * @returns {User} - Instancia de User
     * 
     * Ejemplo de uso:
     * const data = { id: '1', username: 'admin', password: 'hash', role: 'SuperAdmin' };
     * const user = User.fromJSON(data);
     * console.log(user instanceof User); // true
     */
    static fromJSON(data) {
        return new User(
            data.id,
            data.username,
            data.password,
            data.role,
            data.createdAt ? new Date(data.createdAt) : null,
            data.updatedAt ? new Date(data.updatedAt) : null
        );
    }
    
    /**
     * Valida la integridad del objeto User
     * Verifica que todas las propiedades sean válidas
     * 
     * @returns {boolean} - true si el usuario es válido, false si no
     * 
     * Ejemplo de uso:
     * if (user.isValid()) {
     *     console.log('Usuario válido');
     * }
     */
    isValid() {
        // Verificar que el username no esté vacío
        if (!this.username || this.username.trim().length === 0) {
            return false;
        }
        
        // Verificar que el password no esté vacío (debe ser un hash)
        if (!this.password || this.password.trim().length === 0) {
            return false;
        }
        
        // Verificar que el rol sea válido (se validará con RoleValidation)
        if (!this.role || this.role.trim().length === 0) {
            return false;
        }
        
        // Verificar que las fechas sean válidas
        if (!(this.createdAt instanceof Date) || !(this.updatedAt instanceof Date)) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Actualiza la fecha de última modificación
     * Debe llamarse cada vez que se modifica el usuario
     */
    touch() {
        this.updatedAt = new Date();
    }
}
