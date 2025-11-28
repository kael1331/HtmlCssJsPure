/**
 * AuthenticateWithGoogle.js
 * Caso de uso para autenticar usuarios mediante Google Sign‑In.
 *
 * Recibe el ID token JWT, lo decodifica, busca o crea el usuario en
 * IndexedDB y guarda la sesión en localStorage.
 */
import { decodeIdToken } from '../infrastructure/GoogleAuthService.js';
import * as userRepository from '../infrastructure/UserRepository.js';

/**
 * Autentica al usuario con Google.
 * @param {string} idToken - JWT devuelto por Google.
 * @returns {Promise<Object>} Objeto de usuario autenticado.
 */
export async function authenticateWithGoogle(idToken) {
    // Decodificar el token para obtener el payload (sub, email, name, etc.)
    const payload = await decodeIdToken(idToken);
    const googleId = payload.sub; // identificador único de Google
    const email = payload.email;
    const name = payload.name || email.split('@')[0];

    // Buscar si ya existe un usuario con este googleId
    let user = await userRepository.findByGoogleId(googleId);
    if (!user) {
        // No existe, crear nuevo usuario (rol Client por defecto)
        const newUser = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            username: name,
            password: '', // No se guarda password para login Google
            role: 'Client',
            googleId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await userRepository.saveUser(newUser);
        user = newUser;
    }

    // Guardar sesión en localStorage (incluye provider para distinguir)
    const session = {
        userId: user.id,
        provider: 'google',
        role: user.role,
        username: user.username
    };
    localStorage.setItem('AUTH_SESSION', JSON.stringify(session));

    return user;
}
