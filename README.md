# 🔐 Sistema de Autenticación SPA

Sistema de autenticación de página única (SPA) con arquitectura limpia, desarrollado con JavaScript vanilla, HTML5 y CSS3.

## ✨ Características

- 🏗️ **Arquitectura Limpia** con separación de responsabilidades (Domain, Use Cases, Infrastructure, Presentation)
- 🔒 **Seguridad**: Hashing de contraseñas con bcryptjs
- 💾 **Persistencia Local**: IndexedDB vía localForage
- 👥 **3 Roles de Usuario**: SuperAdmin, Admin, Client
- 🎨 **3 Dashboards Diferenciados** con temas de color por rol
- 🛡️ **Protección de Rutas** basada en roles
- 📱 **Diseño Responsive** y moderno
- 🌐 **100% Client-Side**: Sin backend ni base de datos externa

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js instalado (para npx) o Python 3

### Instalación y Ejecución

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd spa-auth
```

2. **Iniciar servidor HTTP**

Opción 1 - Con npx (recomendado):

```bash
npx -y http-server -p 8080 -c-1
```

Opción 2 - Con Python:

```bash
python -m http.server 8080
```

3. **Abrir en el navegador**

```
http://localhost:8080
```

> ⚠️ **Importante**: La aplicación NO funciona con `file://` debido a restricciones de CORS. Debe servirse desde un servidor HTTP.

## 🔑 Credenciales por Defecto

Al iniciar la aplicación por primera vez, se crea automáticamente un SuperAdmin:

- **Usuario**: `kael`
- **Contraseña**: `1234`

## 📁 Estructura del Proyecto

```
/spa-auth
├── index.html                      # Archivo HTML principal
├── /css
│   └── main.css                    # Estilos con temas diferenciados
└── /js
    ├── main.js                     # Punto de entrada y routing
    ├── /domain                     # Reglas de negocio puras
    │   ├── User.js                 # Entidad de Usuario
    │   └── RoleValidation.js       # Validación de roles
    ├── /use_cases                  # Lógica de aplicación
    │   ├── RegisterUser.js         # Registrar usuario
    │   └── AuthenticateUser.js     # Autenticar usuario
    ├── /infrastructure             # Detalles técnicos
    │   ├── UserRepository.js       # Persistencia
    │   └── AuthService.js          # Hashing
    └── /presentation               # Componentes UI
        ├── LoginView.js            # Vista de login
        ├── ClientDashboard.js      # Dashboard Client
        ├── AdminDashboard.js       # Dashboard Admin
        └── SuperAdminDashboard.js  # Dashboard SuperAdmin
```

## 👥 Roles y Permisos

### 🔴 SuperAdmin

- Ver TODOS los usuarios
- Crear usuarios de cualquier rol
- Editar cualquier usuario
- Eliminar usuarios
- Cambiar roles

### 🟡 Admin

- Ver solo usuarios Client
- Crear usuarios Client
- Editar usuarios Client
- NO puede gestionar SuperAdmins ni Admins

### 🟢 Client

- Ver su propio perfil
- Editar su nombre de usuario
- Cambiar su contraseña
- NO puede gestionar otros usuarios

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y diseño responsive
- **JavaScript (ES Modules)** - Lógica de aplicación
- **IndexedDB** - Almacenamiento local
- **localForage** - Wrapper para IndexedDB
- **bcryptjs** - Hashing de contraseñas

## 📝 Principios de Desarrollo

- ✅ Arquitectura limpia con separación de responsabilidades
- ✅ Inyección de dependencias en casos de uso
- ✅ Código completamente comentado en español
- ✅ Validación atómica de componentes
- ✅ Principios SOLID

## 🔒 Seguridad

- Las contraseñas se hashean con bcryptjs (10 rondas de salt)
- Las contraseñas NUNCA se almacenan en texto plano
- Validación de permisos basada en roles
- Protección de rutas en el router

> ⚠️ **Nota**: Esta es una aplicación de demostración 100% client-side. Para producción con datos sensibles reales, se recomienda implementar un backend con autenticación del lado del servidor.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ siguiendo las mejores prácticas de arquitectura limpia.
