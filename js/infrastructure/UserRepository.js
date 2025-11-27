/**
 * UserRepository.js
 * Repositorio de Usuarios - Capa de Infraestructura
 * 
 * Este módulo encapsula toda la lógica de persistencia de usuarios
 * utilizando IndexedDB a través de localForage.
 * 
 * La clave de almacenamiento es 'AUTH_USERS' y contiene un array de objetos de usuario.
 * 
 * Funciones exportadas:
 * - getAllUsers: Obtiene todos los usuarios
 * - getUserById: Busca un usuario por su ID
 * - getUserByUsername: Busca un usuario por su nombre de usuario
 * - saveUser: Guarda un nuevo usuario o actualiza uno existente
 * - updateUser: Actualiza un usuario existente
 * - deleteUser: Elimina un usuario por su ID
 */

// Clave de almacenamiento en localForage (IndexedDB)
const STORAGE_KEY = 'AUTH_USERS';

/**
 * Obtiene todos los usuarios almacenados
 * 
 * @returns {Promise<Array>} - Array de objetos de usuario
 * 
 * Ejemplo de uso:
 * const users = await getAllUsers();
 * console.log(users); // [{ id: '1', username: 'admin', ... }, ...]
 */
export async function getAllUsers() {
    try {
        // Obtener el array de usuarios desde localForage
        // Si no existe, retornar un array vacío
        const users = await localforage.getItem(STORAGE_KEY) || [];
        
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('No se pudieron obtener los usuarios');
    }
}

/**
 * Busca un usuario por su ID
 * 
 * @param {string} id - ID del usuario a buscar
 * @returns {Promise<Object|null>} - Objeto de usuario o null si no se encuentra
 * 
 * Ejemplo de uso:
 * const user = await getUserById('123');
 * if (user) {
 *     console.log('Usuario encontrado:', user.username);
 * }
 */
export async function getUserById(id) {
    try {
        // Obtener todos los usuarios
        const users = await getAllUsers();
        
        // Buscar el usuario con el ID especificado
        const user = users.find(u => u.id === id);
        
        return user || null;
    } catch (error) {
        console.error('Error al buscar usuario por ID:', error);
        throw new Error('No se pudo buscar el usuario');
    }
}

/**
 * Busca un usuario por su nombre de usuario (username)
 * 
 * @param {string} username - Nombre de usuario a buscar
 * @returns {Promise<Object|null>} - Objeto de usuario o null si no se encuentra
 * 
 * Ejemplo de uso:
 * const user = await getUserByUsername('admin');
 * if (user) {
 *     console.log('Usuario encontrado:', user.id);
 * }
 */
export async function getUserByUsername(username) {
    try {
        // Obtener todos los usuarios
        const users = await getAllUsers();
        
        // Buscar el usuario con el username especificado (case-insensitive)
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        
        return user || null;
    } catch (error) {
        console.error('Error al buscar usuario por username:', error);
        throw new Error('No se pudo buscar el usuario');
    }
}

/**
 * Guarda un nuevo usuario en el almacenamiento
 * Si ya existe un usuario con el mismo ID, lo actualiza
 * 
 * @param {Object} user - Objeto de usuario a guardar
 * @returns {Promise<Object>} - Usuario guardado
 * 
 * Ejemplo de uso:
 * const newUser = {
 *     id: '123',
 *     username: 'admin',
 *     password: 'hashedPassword',
 *     role: 'SuperAdmin'
 * };
 * await saveUser(newUser);
 */
export async function saveUser(user) {
    try {
        // Validar que el usuario tenga las propiedades mínimas requeridas
        if (!user.id || !user.username || !user.password || !user.role) {
            throw new Error('El usuario debe tener id, username, password y role');
        }
        
        // Obtener todos los usuarios
        const users = await getAllUsers();
        
        // Verificar si ya existe un usuario con el mismo ID
        const existingIndex = users.findIndex(u => u.id === user.id);
        
        if (existingIndex !== -1) {
            // Si existe, actualizar el usuario existente
            users[existingIndex] = user;
        } else {
            // Si no existe, agregar el nuevo usuario
            users.push(user);
        }
        
        // Guardar el array actualizado en localForage
        await localforage.setItem(STORAGE_KEY, users);
        
        return user;
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        throw new Error('No se pudo guardar el usuario');
    }
}

/**
 * Actualiza un usuario existente
 * 
 * @param {Object} user - Objeto de usuario con los datos actualizados
 * @returns {Promise<Object>} - Usuario actualizado
 * 
 * Ejemplo de uso:
 * const updatedUser = { ...existingUser, username: 'nuevoNombre' };
 * await updateUser(updatedUser);
 */
export async function updateUser(user) {
    try {
        // Verificar que el usuario exista
        const existingUser = await getUserById(user.id);
        
        if (!existingUser) {
            throw new Error('El usuario no existe');
        }
        
        // Usar saveUser que ya maneja la actualización
        return await saveUser(user);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error('No se pudo actualizar el usuario');
    }
}

/**
 * Elimina un usuario por su ID
 * 
 * @param {string} id - ID del usuario a eliminar
 * @returns {Promise<boolean>} - true si se eliminó correctamente
 * 
 * Ejemplo de uso:
 * await deleteUser('123');
 * console.log('Usuario eliminado');
 */
export async function deleteUser(id) {
    try {
        // Obtener todos los usuarios
        const users = await getAllUsers();
        
        // Filtrar el usuario a eliminar
        const updatedUsers = users.filter(u => u.id !== id);
        
        // Verificar que se eliminó al menos un usuario
        if (users.length === updatedUsers.length) {
            throw new Error('El usuario no existe');
        }
        
        // Guardar el array actualizado
        await localforage.setItem(STORAGE_KEY, updatedUsers);
        
        return true;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw new Error('No se pudo eliminar el usuario');
    }
}
