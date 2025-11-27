/**
 * AuthService.js
 * Servicio de Autenticación - Capa de Infraestructura
 *
 * Este módulo encapsula toda la lógica relacionada con la criptografía
 * de contraseñas utilizando bcryptjs para hashing seguro.
 *
 * Funciones exportadas:
 * - hashPassword: Genera un hash bcrypt de una contraseña
 * - comparePassword: Compara una contraseña con su hash almacenado
 */

/**
 * Genera un hash bcrypt de una contraseña
 *
 * @param {string} password - Contraseña en texto plano a hashear
 * @returns {Promise<string>} - Hash bcrypt de la contraseña
 *
 * Ejemplo de uso:
 * const hash = await hashPassword('miContraseña123');
 * console.log(hash); // $2a$10$...
 */
export async function hashPassword(password) {
  try {
    // Número de rondas de salt (10 es un buen balance entre seguridad y rendimiento)
    const saltRounds = 10;

    // Generar el hash usando bcryptjs
    // bcryptjs está disponible globalmente desde el CDN incluido en index.html
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  } catch (error) {
    console.error("Error al generar hash de contraseña:", error);
    throw new Error("No se pudo generar el hash de la contraseña");
  }
}

/**
 * Compara una contraseña en texto plano con un hash almacenado
 *
 * @param {string} password - Contraseña en texto plano a verificar
 * @param {string} hash - Hash bcrypt almacenado para comparar
 * @returns {Promise<boolean>} - true si la contraseña coincide, false si no
 *
 * Ejemplo de uso:
 * const isValid = await comparePassword('miContraseña123', hashAlmacenado);
 * if (isValid) {
 *     console.log('Contraseña correcta');
 * }
 */
export async function comparePassword(password, hash) {
  try {
    // Comparar la contraseña con el hash usando bcryptjs
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  } catch (error) {
    console.error("Error al comparar contraseña:", error);
    throw new Error("No se pudo verificar la contraseña");
  }
}
