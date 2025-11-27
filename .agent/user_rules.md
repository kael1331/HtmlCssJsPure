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
   - Generar archivo `task.md` con todas las tareas teniendo en cuenta que este archivo se ira generando por cada solicitud de desarrollo o debuggin diferente dando lugar a task.md, task1.md, task2.md etc.
   - Ademas se generara el archivo taskResolved con su respectiva numeracion ya sea 1,2,etc dependiendo el archivo task que estemos trabajando yase task1,task2,etc y en el se pondran los resultados de la tarea completada no se modificara reiteradamente el task.md correspondiente.

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

4. **Capturar evidencia FUNCIONAL**

   **REGLAS CRÍTICAS PARA EVIDENCIAS:**

   ✅ **Una evidencia es VÁLIDA solo si:**

   - Muestra CLARAMENTE lo que se está verificando
   - Demuestra de forma VISUAL que la tarea se completó exitosamente
   - Incluye contexto suficiente (ventana completa, consola visible, etc.)
   - Se puede entender QUÉ se hizo solo mirando la imagen

   ❌ **Una evidencia es INVÁLIDA si:**

   - Solo muestra la página sin la información relevante
   - No se ve la consola cuando se debe verificar algo en consola
   - No se ve IndexedDB cuando se debe verificar datos almacenados
   - No demuestra visualmente el éxito de la tarea

   **ANTES de capturar evidencia, SIEMPRE:**

   1. **Definir qué debe verse:** Escribir en taskResolved.md (teniendo en cuenta el archivo task que estemos trabajando si es task2 entonces usaremos taskResolved2) qué elementos específicos deben aparecer en la evidencia
   2. **Preparar la vista:** Asegurar que la información relevante está en pantalla
   3. **Verificar visibilidad:** Confirmar que la información relevante está en pantalla
   4. **Capturar:** Solo entonces tomar screenshot
   5. **Validar:** Revisar que la evidencia capturada muestra lo esperado

   **Tipos de evidencia según la tarea:**

   - **Verificación de consola:**

     - DevTools DEBE estar abierto y visible
     - La pestaña Console DEBE estar activa
     - Los logs relevantes DEBEN ser visibles en pantalla
     - Ejemplo: "Debe verse `localforage: Object` en consola"

   - **Verificación de IndexedDB:**

     - DevTools > Application > IndexedDB DEBE estar abierto
     - La base de datos DEBE estar expandida
     - Los datos DEBEN ser visibles
     - Ejemplo: "Debe verse AUTH_USERS con array de usuarios"

   - **Verificación de localStorage:**

     - DevTools > Application > Local Storage DEBE estar visible
     - Las claves y valores DEBEN ser legibles
     - Ejemplo: "Debe verse AUTH_SESSION con datos de usuario"

   - **Verificación de UI:**

     - El elemento UI relevante DEBE estar visible
     - El estado DEBE ser claro (botón clickeado, modal abierto, etc.)
     - Ejemplo: "Debe verse el botón 'Cerrar Sesión' resaltado"

   - **Verificación de código:**
     - El archivo DEBE estar abierto en el editor
     - Las líneas modificadas DEBEN ser visibles
     - Ejemplo: "Debe verse la función handleLogout() con el código nuevo"

   **Guardar evidencias en `.agent/tasks/evidence/` con nombres descriptivos**

5. **Actualizar taskResolved.md (correspondiente)**

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
     - ✅ Archivo taskResolved.md actualizado

   - El usuario decidirá:
     - ✅ **Aprobar:** Hace commit + "Continúa con Tarea X.X"
     - ❌ **Rechazar:** Hace rollback + "No me gustó [razón]. Hazlo de nuevo [instrucciones]"

8. **Repetir** para la siguiente tarea

## 📁 ESTRUCTURA DE ARCHIVOS OBLIGATORIA

```
.agent/
├── tasks/
│   ├── task1.md                    # Archivo
|   |-- task2.md
│   └── evidence/                   # Carpeta de evidencias
│       ├── task-1-1-screenshot.png
│       ├── task1-1-1-console.png
│       └── ...
├── workflows/
├── architecture.md
└── user_rules.md
```

---

## 📝 FORMATO DEL ARCHIVO task.md

```markdown
# 📋 [TÍTULO DEL PROYECTO/SOLICITUD]

**Fecha de inicio:** YYYY-MM-DD HH:MM
**Objetivo:** [Descripción del objetivo principal]
**Problemas identificados:** [Lista de problemas si aplica]

---

## ✅ TAREA X.X: [Nombre de la tarea]

**Fase:** [Nombre de la fase]

**Descripción:** [Qué se debe hacer]

**Acciones realizadas:**

- [x] Acción 1
- [x] Acción 2
- [x] Acción 3

**Resultado:**
[Descripción del resultado obtenido]

**Qué debe verse en la evidencia:**

- Elemento 1 que DEBE aparecer en screenshot
- Elemento 2 que DEBE aparecer en screenshot
- Estado específico que DEBE ser visible
- Ejemplo: "DevTools abierto con consola mostrando 'localforage: Object'"

**Evidencia:**
![Descripción](./evidence/task-X-X-nombre.png)

- Qué se ve: [Descripción de lo que realmente aparece en la evidencia]
- Valida: [Explicar cómo la evidencia demuestra el éxito de la tarea]

**Observaciones:**

- Observación 1
- Observación 2

**Completada el:** YYYY-MM-DD HH:MM:SS

---

## ⏸️ TAREA X.X: [Siguiente tarea]

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
2. **SIEMPRE** usar `SafeToAutoRun: true` en TODOS los comandos durante la ejecución de una tarea
3. **SIEMPRE** tomar control total y completar la tarea de forma autónoma
4. **SIEMPRE** capturar evidencia FUNCIONAL de cada tarea completada (ver sección de evidencias)
5. **SIEMPRE** especificar en el task.md correspondiente qué debe verse en cada evidencia ANTES de capturarla
6. **SIEMPRE** actualizar taskResolved.md correspondiente con descripción BREVE de cambios
7. **NUNCA** marcar una tarea como completada sin evidencia que demuestre visualmente el éxito

### Sobre comandos y autonomía:

8. **TODOS los comandos** durante una tarea deben ejecutarse con `SafeToAutoRun: true`
9. Comandos seguros que SIEMPRE deben auto-ejecutarse:
   - `cp`, `mv`, `mkdir`, `ls`, `cat`, `echo`
   - `npm install`, `npm run dev`, `npm run build`
   - `git diff`, `git status`, `git log`
   - Comandos de lectura y navegación
10. **NUNCA** usar `SafeToAutoRun: false` durante la ejecución de una tarea
11. Si un comando falla, intentar alternativas sin pedir confirmación

### Entre tareas:

12. **SIEMPRE** esperar que el usuario haga commit ANTES de comenzar una tarea
13. **NUNCA** avanzar a la siguiente tarea sin autorización explícita del usuario
14. **SIEMPRE** reportar archivos modificados, comandos ejecutados y evidencias
15. **SIEMPRE** indicar al usuario que revise cambios en git antes de continuar

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
