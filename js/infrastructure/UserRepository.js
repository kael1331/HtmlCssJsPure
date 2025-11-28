/**
 * UserRepository.js
 * Repositorio de Usuarios - Capa de Infraestructura
 *
 * Maneja la persistencia de usuarios usando IndexedDB via localForage.
 * La clave de almacenamiento es 'AUTH_USERS'.
 */

const STORAGE_KEY = 'AUTH_USERS';

/**
 * Obtiene todos los usuarios almacenados.
 * @returns {Promise<Array>} Array de usuarios.
 */
export async function getAllUsers() {
    try {
        const users = await localforage.getItem(STORAGE_KEY) || [];
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios');
    }
}

/**
 * Busca un usuario por su ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getUserById(id) {
    const users = await getAllUsers();
    return users.find(u => u.id === id) || null;
}

/**
 * Busca un usuario por su nombre de usuario (case‑insensitive).
 * @param {string} username
 * @returns {Promise<Object|null>}
 */
export async function getUserByUsername(username) {
    const users = await getAllUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * Busca un usuario por su Google ID.
 * @param {string} googleId
 * @returns {Promise<Object|null>}
 */
export async function findByGoogleId(googleId) {
    const users = await getAllUsers();
    return users.find(u => u.googleId && u.googleId === googleId) || null;
}

/**
 * Guarda un nuevo usuario o actualiza uno existente.
 * @param {Object} user
 * @returns {Promise<Object>}
 */
export async function saveUser(user) {
    if (!user.id || !user.username || !user.role) {
        throw new Error('El usuario debe tener id, username y role');
    }
    const users = await getAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
    } else {
        users.push(user);
    }
    await localforage.setItem(STORAGE_KEY, users);
    return user;
}

/**
 * Actualiza un usuario existente.
 * @param {Object} user
 * @returns {Promise<Object>}
 */
export async function updateUser(user) {
    return await saveUser(user);
}

/**
 * Elimina un usuario por su ID.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export async function deleteUser(id) {
    const users = await getAllUsers();
    const filtered = users.filter(u => u.id !== id);
    if (users.length === filtered.length) {
        throw new Error('El usuario no existe');
    }
    await localforage.setItem(STORAGE_KEY, filtered);
    return true;
}
