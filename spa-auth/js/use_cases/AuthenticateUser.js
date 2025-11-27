/**
 * AuthenticateUser.js
 * Caso de Uso: Autenticar Usuario - Capa de Casos de Uso
 * 
 * Este módulo implementa la lógica de aplicación para autenticar un usuario.
 * Orquesta las operaciones entre la capa de dominio y la capa de infraestructura.
 * 
 * Principio de Inyección de Dependencias:
 * Este caso de uso NO importa directamente AuthService ni UserRepository.
 * En su lugar, recibe estas dependencias como parámetros (Dependency Injection).
 */

/**
 * Autentica un usuario en el sistema
 * 
 * Flujo del caso de uso:
 * 1. Buscar usuario por username
 * 2. Validar que el usuario existe
 * 3. Comparar contraseña con hash almacenado
 * 4. Si es válido, crear sesión (guardar en localStorage)
 * 5. Retornar datos del usuario autenticado (sin password)
 * 
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña en texto plano
 * @param {Object} authService - Servicio de autenticación (inyectado)
 * @param {Object} userRepository - Repositorio de usuarios (inyectado)
 * @returns {Promise<Object>} - Usuario autenticado (sin password)
 * @throws {Error} - Si las credenciales son inválidas
 * 
 * Ejemplo de uso:
 * const user = await authenticateUser(
 *     'admin',
 *     '1234',
 *     authService,
 *     userRepository
 * );
 * console.log('Usuario autenticado:', user.username);
 */
export async function authenticateUser(username, password, authService, userRepository) {
    try {
        // 1. Validar que se proporcionaron username y password
        if (!username || !password) {
            throw new Error('Username y password son obligatorios');
        }
        
        // 2. Buscar usuario por username
        const user = await userRepository.getUserByUsername(username);
        
        // 3. Validar que el usuario existe
        if (!user) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        
        // 4. Comparar contraseña con hash almacenado
        const isPasswordValid = await authService.comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        
        // 5. Si es válido, crear sesión (guardar en localStorage)
        // Guardamos el ID y el rol del usuario para mantener la sesión
        const sessionData = {
            userId: user.id,
            userRole: user.role,
            username: user.username
        };
        
        localStorage.setItem('AUTH_SESSION', JSON.stringify(sessionData));
        
        // 6. Retornar datos del usuario autenticado (sin password por seguridad)
        const userResponse = {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        };
        
        return userResponse;
        
    } catch (error) {
        console.error('Error en authenticateUser:', error);
        throw error; // Re-lanzar el error para que lo maneje la capa de presentación
    }
}

/**
 * Cierra la sesión del usuario actual
 * Elimina los datos de sesión del localStorage
 * 
 * Ejemplo de uso:
 * logoutUser();
 * console.log('Sesión cerrada');
 */
export function logoutUser() {
    try {
        // Eliminar datos de sesión del localStorage
        localStorage.removeItem('AUTH_SESSION');
        
        return true;
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        throw new Error('No se pudo cerrar la sesión');
    }
}

/**
 * Obtiene la sesión actual del usuario
 * Lee los datos de sesión del localStorage
 * 
 * @returns {Object|null} - Datos de sesión o null si no hay sesión
 * 
 * Ejemplo de uso:
 * const session = getCurrentSession();
 * if (session) {
 *     console.log('Usuario logueado:', session.username);
 * }
 */
export function getCurrentSession() {
    try {
        // Obtener datos de sesión del localStorage
        const sessionData = localStorage.getItem('AUTH_SESSION');
        
        if (!sessionData) {
            return null;
        }
        
        // Parsear y retornar los datos
        return JSON.parse(sessionData);
        
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
}
