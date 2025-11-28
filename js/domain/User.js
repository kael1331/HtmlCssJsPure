/**
 * User.js
 * Entidad de Usuario - Capa de Dominio
 *
 * Representa un usuario del sistema con sus propiedades y lógica de negocio.
 */

/**
 * Clase User - Entidad de Usuario
 *
 * Propiedades:
 * - id: Identificador único del usuario
 * - username: Nombre de usuario (único)
 * - password: Contraseña hasheada (nunca en texto plano)
 * - role: Rol del usuario (SuperAdmin, Admin, Client)
 * - googleId: ID de Google (null si login tradicional)
 * - createdAt: Fecha de creación
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
     * @param {string|null} [googleId=null] - ID de Google (opcional)
     * @param {Date|null} [createdAt=null] - Fecha de creación (opcional)
     * @param {Date|null} [updatedAt=null] - Fecha de actualización (opcional)
     */
    constructor(id, username, password, role, googleId = null, createdAt = null, updatedAt = null) {
        if (!id || !username || !password || !role) {
            throw new Error('Todos los campos son obligatorios: id, username, password, role');
        }
        this.id = id;
        this.username = username;
        this.password = password; // debe ser un hash
        this.role = role;
        this.googleId = googleId; // null si login tradicional
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    /**
     * Convierte la instancia a un objeto JSON plano para almacenamiento.
     * @returns {Object}
     */
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            role: this.role,
            googleId: this.googleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * Crea una instancia de User a partir de un objeto JSON.
     * @param {Object} data - Objeto con los datos del usuario
     * @returns {User}
     */
    static fromJSON(data) {
        return new User(
            data.id,
            data.username,
            data.password,
            data.role,
            data.googleId || null,
            data.createdAt ? new Date(data.createdAt) : null,
            data.updatedAt ? new Date(data.updatedAt) : null
        );
    }

    /**
     * Valida la integridad del objeto User.
     * @returns {boolean}
     */
    isValid() {
        if (!this.username || this.username.trim().length === 0) return false;
        if (!this.password || this.password.trim().length === 0) return false;
        if (!this.role || this.role.trim().length === 0) return false;
        if (!(this.createdAt instanceof Date) || !(this.updatedAt instanceof Date)) return false;
        return true;
    }

    /**
     * Actualiza la fecha de última modificación.
     */
    touch() {
        this.updatedAt = new Date();
    }
}
