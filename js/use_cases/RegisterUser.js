/**
 * RegisterUser.js
 * Caso de Uso: Registrar Usuario - Capa de Casos de Uso
 * 
 * Este módulo implementa la lógica de aplicación para registrar un nuevo usuario.
 * Orquesta las operaciones entre la capa de dominio y la capa de infraestructura.
 * 
 * Principio de Inyección de Dependencias:
 * Este caso de uso NO importa directamente AuthService ni UserRepository.
 * En su lugar, recibe estas dependencias como parámetros (Dependency Injection).
 */

import { User } from '../domain/User.js';
import { isValidRole } from '../domain/RoleValidation.js';

/**
 * Registra un nuevo usuario en el sistema
 * 
 * Flujo del caso de uso:
 * 1. Validar datos de entrada
 * 2. Verificar que el username no exista (no duplicados)
 * 3. Generar hash de la contraseña
 * 4. Crear objeto User
 * 5. Guardar usuario en el repositorio
 * 6. Retornar usuario creado (sin password hash por seguridad)
 * 
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.username - Nombre de usuario
 * @param {string} userData.password - Contraseña en texto plano
 * @param {string} userData.role - Rol del usuario
 * @param {Object} authService - Servicio de autenticación (inyectado)
 * @param {Object} userRepository - Repositorio de usuarios (inyectado)
 * @returns {Promise<Object>} - Usuario creado (sin password)
 * @throws {Error} - Si hay errores de validación o duplicados
 * 
 * Ejemplo de uso:
 * const newUser = await registerUser(
 *     { username: 'admin', password: '1234', role: 'SuperAdmin' },
 *     authService,
 *     userRepository
 * );
 */
export async function registerUser(userData, authService, userRepository) {
    try {
        // 1. Validar datos de entrada
        if (!userData.username || !userData.password || !userData.role) {
            throw new Error('Todos los campos son obligatorios: username, password, role');
        }
        
        // Validar que el username tenga al menos 3 caracteres
        if (userData.username.trim().length < 3) {
            throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
        }
        
        // Validar que la contraseña tenga al menos 4 caracteres
        if (userData.password.length < 4) {
            throw new Error('La contraseña debe tener al menos 4 caracteres');
        }
        
        // Validar que el rol sea válido
        if (!isValidRole(userData.role)) {
            throw new Error('El rol especificado no es válido');
        }
        
        // 2. Verificar que el username no exista (no duplicados)
        const existingUser = await userRepository.getUserByUsername(userData.username);
        
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe');
        }
        
        // 3. Generar hash de la contraseña
        const hashedPassword = await authService.hashPassword(userData.password);
        
        // 4. Crear objeto User con ID único (timestamp + random)
        const userId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        
        const user = new User(
            userId,
            userData.username,
            hashedPassword,
            userData.role
        );
        
        // Validar que el usuario sea válido
        if (!user.isValid()) {
            throw new Error('El usuario creado no es válido');
        }
        
        // 5. Guardar usuario en el repositorio
        await userRepository.saveUser(user.toJSON());
        
        // 6. Retornar usuario creado (sin password hash por seguridad)
        const userResponse = {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        };
        
        return userResponse;
        
    } catch (error) {
        console.error('Error en registerUser:', error);
        throw error; // Re-lanzar el error para que lo maneje la capa de presentación
    }
}
