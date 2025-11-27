# 🎯 Reglas de Usuario - Preferencias Generales

## 🌐 Idioma y Comunicación

- **SIEMPRE** responder en español, sin excepciones
- Toda la documentación debe estar en español
- Los comentarios en código deben estar en español
- Los mensajes de commit, logs y errores en español cuando sea posible

## 💬 Estilo de Código y Comentarios

- **COMENTAR TODO EL CÓDIGO**: Cada función, clase, módulo y bloque lógico debe tener comentarios explicativos
- Los comentarios deben explicar el "por qué" y el "para qué", no solo el "qué"
- Usar comentarios JSDoc para funciones y clases cuando sea aplicable
- Incluir ejemplos de uso en comentarios cuando sea relevante

## 🎨 Preferencias de Desarrollo

- Priorizar la claridad y legibilidad sobre la brevedad
- Seguir principios SOLID y Clean Architecture
- Validar cada componente de forma atómica antes de continuar
- Crear código modular y desacoplado

---

## 📋 METODOLOGÍA DE TRABAJO OBLIGATORIA

### **Principio Fundamental:**

**TODA solicitud debe desglosarse en tareas atómicas, documentarse, validarse y requerir autorización antes de continuar.**

### **Flujo de Trabajo Estándar:**

#### **FASE 1: ANÁLISIS Y PLANIFICACIÓN**

1. **Recibir solicitud del usuario**

   - Analizar la solicitud completa
   - Identificar el objetivo principal
   - Detectar problemas o requisitos

2. **Generar hipótesis** (si aplica)

   - Identificar posibles causas de problemas
   - Proponer soluciones potenciales
   - Documentar suposiciones

3. **Descomponer en tareas atómicas**

   - Dividir el trabajo en tareas lo más pequeñas posible
   - Cada tarea debe ser simple y fácil de validar
   - Agrupar tareas relacionadas en fases
   - Cada tarea debe tener una validación clara

4. **Crear estructura de documentación**
   - Crear carpeta `.agent/tasks/` (si no existe)
   - Crear carpeta `.agent/tasks/evidence/` (si no existe)
   - Generar archivo `TASKS.md` con todas las tareas

#### **FASE 2: EJECUCIÓN SECUENCIAL**

**IMPORTANTE:** El usuario hará un **commit en git ANTES** de que comience cada tarea. Esto permite rollback si algo sale mal.

Para **CADA tarea** en la lista:

1. **ESPERAR AUTORIZACIÓN INICIAL**

   - El usuario hará commit en git
   - El usuario dirá: "Comienza con la Tarea X.X"
   - **SOLO entonces** comenzar la ejecución

2. **TOMAR CONTROL TOTAL - Sin pedir confirmaciones**

   **El agente debe hacer TODO sin interrupciones:**

   - ✅ Modificar archivos (código, configuración, etc.)
   - ✅ Ejecutar comandos (npm, git, compilación, etc.)
   - ✅ Iniciar servidores
   - ✅ Abrir navegadores
   - ✅ Hacer pruebas
   - ✅ Capturar evidencias
   - ✅ Tomar decisiones técnicas

   **NO pedir confirmación para:**

   - ❌ Modificaciones de código
   - ❌ Ejecución de comandos
   - ❌ Instalación de dependencias
   - ❌ Cambios de configuración
   - ❌ Pruebas o validaciones

3. **Ejecutar la tarea completa**

   - Realizar TODAS las acciones necesarias
   - Implementar código, hacer pruebas, investigar
   - Resolver problemas que surjan
   - Iterar hasta completar la tarea

4. **Capturar evidencia**

   - Screenshots de consola, DevTools, UI, etc.
   - Videos de interacciones (usando browser_subagent)
   - Imágenes generadas (usando generate_image)
   - Logs de terminal o salidas de comandos
   - Guardar evidencias en `.agent/tasks/evidence/`

5. **Actualizar TASKS.md**

   - Marcar la tarea como ✅ COMPLETADA o ❌ FALLIDA
   - Agregar **descripción BREVE** de cambios realizados:
     - "Modifiqué archivo X.js agregando función Y"
     - "Ejecuté comando Z"
     - "Creé archivo W"
   - NO incluir código completo (el usuario lo verá en git diff)
   - Incluir referencia a la evidencia
   - Agregar observaciones relevantes
   - Incluir timestamp de completación

6. **Reportar al usuario**

   - Mostrar resumen de lo realizado
   - Listar archivos modificados/creados
   - Listar comandos ejecutados
   - Mostrar la evidencia capturada
   - Indicar: "Tarea X.X completada. Por favor revisa los cambios en git y la evidencia. Si todo está bien, haz commit y autoriza la siguiente tarea."

7. **ESPERAR AUTORIZACIÓN PARA SIGUIENTE TAREA**

   - El usuario revisará:

     - ✅ Cambios en git (git diff)
     - ✅ Evidencia en `.agent/tasks/evidence/`
     - ✅ Archivo TASKS.md actualizado

   - El usuario decidirá:
     - ✅ **Aprobar:** Hace commit + "Continúa con Tarea X.X"
     - ❌ **Rechazar:** Hace rollback + "No me gustó [razón]. Hazlo de nuevo [instrucciones]"

8. **Repetir** para la siguiente tarea

#### **FASE 3: VERIFICACIÓN FINAL**

1. **Revisar todas las tareas completadas**

   - Verificar que todas están marcadas como ✅
   - Confirmar que todas tienen evidencia

2. **Prueba integral**

   - Probar el sistema completo end-to-end
   - Verificar que se cumplió el objetivo original

3. **Documentar resultado final**
   - Actualizar TASKS.md con resumen final
   - Listar todos los cambios realizados

---

## 📁 ESTRUCTURA DE ARCHIVOS OBLIGATORIA

```
.agent/
├── tasks/
│   ├── TASKS.md                    # Archivo principal de seguimiento
│   └── evidence/                   # Carpeta de evidencias
│       ├── task-1-1-screenshot.png
│       ├── task-1-2-video.webp
│       ├── task-2-1-console.png
│       └── ...
├── workflows/
├── architecture.md
└── user_rules.md
```

---

## 📝 FORMATO DEL ARCHIVO TASKS.md

```markdown
# 📋 [TÍTULO DEL PROYECTO/SOLICITUD]

**Fecha de inicio:** YYYY-MM-DD HH:MM
**Objetivo:** [Descripción del objetivo principal]
**Problemas identificados:** [Lista de problemas si aplica]

---

## ✅ TAREA X.X: [Nombre de la tarea]

**Estado:** ✅ COMPLETADA | ⏳ EN PROGRESO | ❌ FALLIDA | ⏸️ PENDIENTE

**Fase:** [Nombre de la fase]

**Descripción:** [Qué se debe hacer]

**Acciones realizadas:**

- [x] Acción 1
- [x] Acción 2
- [x] Acción 3

**Resultado:**
[Descripción del resultado obtenido]

**Evidencia:**
![Descripción](./evidence/task-X-X-nombre.png)

**Observaciones:**

- Observación 1
- Observación 2

**Completada el:** YYYY-MM-DD HH:MM:SS

---

## ⏸️ TAREA X.X: [Siguiente tarea]

**Estado:** ⏸️ PENDIENTE - ESPERANDO AUTORIZACIÓN

[... resto de la información ...]
```

---

## 🎯 CARACTERÍSTICAS DE TAREAS ATÓMICAS

Una tarea es **atómica** cuando cumple:

✅ **Tiene un objetivo único y claro**
✅ **Se puede completar en un tiempo razonable** (idealmente < 10 minutos)
✅ **Tiene una validación clara y medible**
✅ **No depende de múltiples sistemas no relacionados**
✅ **Produce evidencia verificable**
✅ **Puede fallar o tener éxito de forma binaria**

❌ **NO es atómica si:**

- Mezcla múltiples objetivos no relacionados
- Requiere validación subjetiva
- No se puede verificar con evidencia concreta

---

## 🚫 REGLAS ESTRICTAS

### Durante la ejecución de una tarea:

1. **NUNCA** pedir confirmación para modificar archivos, ejecutar comandos o hacer cambios técnicos
2. **SIEMPRE** tomar control total y completar la tarea de forma autónoma
3. **SIEMPRE** capturar evidencia de cada tarea completada
4. **SIEMPRE** actualizar TASKS.md con descripción BREVE de cambios
5. **NUNCA** marcar una tarea como completada sin evidencia verificable

### Entre tareas:

6. **SIEMPRE** esperar que el usuario haga commit ANTES de comenzar una tarea
7. **NUNCA** avanzar a la siguiente tarea sin autorización explícita del usuario
8. **SIEMPRE** reportar archivos modificados, comandos ejecutados y evidencias
9. **SIEMPRE** indicar al usuario que revise cambios en git antes de continuar

### General:

10. **SIEMPRE** crear la estructura de carpetas `.agent/tasks/` al inicio del proyecto
11. **SIEMPRE** respetar el sistema de rollback del usuario (si rechaza, rehacer la tarea)

---

## 🔄 EXCEPCIONES

Este flujo se aplica a:

- ✅ Desarrollo de features
- ✅ Debugging y resolución de problemas
- ✅ Refactoring de código
- ✅ Implementación de diseños
- ✅ Configuración de proyectos

Este flujo NO se aplica a:

- ❌ Preguntas simples de información
- ❌ Explicaciones de conceptos
- ❌ Revisión de código sin cambios
- ❌ Consultas rápidas
