# SHER · Template Workflow v1

**Versión:** 1.0 · Resultado documental pendiente de aprobación.
**Objetivo:** producir plantillas compatibles mediante construcción aislada con ChatGPT e integración con Codex.

## 1. Reutilizar ingeniería, no creatividad

Cada plantilla conserva dirección de arte, tipografías, composición, narrativa, recursos, secciones, animaciones y apertura propias. Las plantillas anteriores son referencias técnicas, nunca bases visuales obligatorias.

Reutilizar componentes o helpers solo cuando sean compatibles con la experiencia aprobada. No crear componentes visuales universales, modelos de datos universales, dependencias ni abstracciones nuevas sin aprobación. Este flujo no modifica las tres XV existentes.

## 2. Fuentes de verdad y preparación

- [AGENTS.md](AGENTS.md): reglas generales de trabajo y seguridad.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): arquitectura, stack y componentes existentes.
- [docs/SHER-SPEC.md](docs/SHER-SPEC.md): producto y decisiones comerciales; no duplicar precios aquí.
- Código, tipos y configuración del SHA base: contratos técnicos efectivos. Ante una discrepancia documental, identificarla antes de integrar.

Antes de construir, aprobar ficha de identidad y diferenciación, mockup integral móvil/escritorio, recorrido, interacciones, estados opcionales, recursos y criterios funcionales/visuales de aceptación. No imponer un orden común de secciones.

La ficha declara identificador comercial, categoría de catálogo, directorio interno, slug y ruta canónica por separado. No son intercambiables: BODA-01 usa `boda-01`, categoría `bodas`, directorio `boda/romance-editorial` y ruta `/plantillas/boda/romance-editorial`.

## 3. Estructura y compatibilidad

- `src/templates/<categoria-interna>/<directorio-plantilla>/`: componentes, estilos y tipos locales cuando correspondan.
- `src/data/events/`: datos demo, separados de los componentes.
- `src/app/plantillas/`: rutas y metadata, integradas por Codex.
- `public/images/` y `public/audio/`: recursos aprobados, organizados por plantilla; URL pública `/images/...` o `/audio/...`, sin el prefijo `public`.

Respetar TypeScript estricto, imports `@/*` y versiones/configuración del SHA base. No sustituir configuración o lockfiles por los de un proyecto independiente.

Usar CSS Modules para nuevas plantillas, con tokens y overrides contenidos en su raíz local. Los componentes compartidos pueden depender de CSS global, eventos o fuentes: revisar esas dependencias antes de reutilizarlos. No alterar estilos, fuentes ni tokens compartidos para conseguir un diseño local; cualquier cambio compartido requiere PLAN y autorización de integración.

## 4. Datos y recursos

Cada plantilla define los datos que necesita. Reutilizar tipos pequeños existentes cuando encajen, sin extender obligatoriamente `InvitationEvent` ni trasladar campos propios de XV a bodas u otras categorías.

Definir el comportamiento ante datos ausentes o inválidos, secciones deshabilitadas y fotografías de distinta cantidad o proporción. Usar zona horaria explícita en fechas que representen instantes y verificar enlaces, teléfonos y fechas antes de presentar acciones funcionales.

Usar nombres nuevos ASCII, texto UTF-8, rutas con mayúsculas/minúsculas exactas e imágenes optimizadas; preferir `next/image` para contenido y declarar fondos CSS necesarios. Las fuentes y recursos creativos son decisiones propias, no requisitos visuales heredados.

Incluir solo recursos de producción aprobados y con procedencia/autorización documentada, también para música. No incorporar secretos, dependencias, cachés ni originales privados de marca. No renombrar ni eliminar recursos existentes como parte de la entrega aislada.

## 5. Apertura y repetición en demos

Toda nueva plantilla SHER tendrá una apertura propia, salvo excepción expresamente aprobada. Todas las demos con apertura deberán ofrecer «Repetir apertura» mediante la capacidad compartida existente. No se impone una animación ni un componente visual universal, un controlador global o un sistema universal de animaciones.

- `SherTemplateDemo` permanece Server Component: recibe `templateId`, `children` y `demoActions?: ReactNode`.
- `SherDemoReplayButton` es cliente: recibe `onReplayOpening?: () => void` y `disabled?: boolean`; sin callback no muestra botón.
- Codex compone desde `page.tsx` el contenido de servidor y lo pasa mediante `children`/slots al adaptador cliente propio. Un puente cliente accede al contexto local y entrega el callback al botón. No importar el wrapper de servidor desde un módulo cliente ni pasar callbacks ordinarios de servidor a cliente; los datos que crucen esa frontera deben ser serializables.

El adaptador reinicia su experiencia: detiene el audio anterior, cancela trabajo pendiente, vuelve al inicio, elimina solo el fragmento de URL y restaura apertura, foco y scroll sin duplicaciones ni bloqueos. Conserva pathname/query, política normal de sesión/recarga y tiempos/diseño aprobados. La música no se reinicia automáticamente: comienza desde cero por la nueva interacción de apertura.

El mecanismo concreto es local; no exigir remontaje ni `forceOpening` a otras experiencias. La acción y el bloque comercial quedan fuera de las invitaciones reales. Las excepciones sin apertura siguen siendo técnicamente compatibles: su demo omite adaptador de repetición y `demoActions`. Las tres XV existentes permanecen intactas y no se adaptan en este hito.

## 6. Construcción aislada con ChatGPT

ChatGPT recibe este contrato, las fuentes especializadas, el SHA base, la ficha/diseños/recursos aprobados y un paquete técnico mínimo: configuración/versiones, alias y fuentes o firmas de los componentes, tipos y helpers que consumirá, con sus dependencias de estilos/fuentes. Un SHA sin acceso a esas interfaces no basta.

Después de PLAN, revisión y autorización, construye fuera del repositorio componentes React/TypeScript, estilos propios, tipos locales, datos demo y recursos aprobados. Puede entregar un adaptador demo propio y describir su composición; no modifica rutas, catálogo, Home, archivos compartidos ni configuración del repositorio.

El paquete incluye un `HANDOFF.md` breve con:

- SHA base, entrada exportada y props/datos necesarios.
- Inventario de archivos y destinos propuestos; tamaños y SHA-256 de recursos.
- Dependencias/imports externos al paquete, incluidos CSS, fuentes y contratos compartidos.
- Instrucciones de integración, composición Server/Client y estados opcionales.
- Procedencia/autorización de recursos; pruebas ejecutadas, resultados y pruebas pendientes.

No incluir otro repositorio completo, `node_modules`, `.next`, credenciales ni documentación duplicada.

## 7. Integración con Codex

Codex revisa inventario, recursos, compatibilidad y divergencias desde el SHA base; entrega un PLAN breve y espera autorización. Después integra los archivos y controla rutas, metadata —incluida la decisión de indexación—, catálogo y modificaciones compartidas necesarias.

Registrar disponibilidad únicamente cuando existan ruta, recursos y experiencia verificables. No inventar productos ni rediseñar Home o plantillas. Corregir solo incompatibilidades técnicas justificadas; cualquier cambio de diseño, comportamiento aprobado o alcance compartido requiere autorización específica.

## 8. QA y aprobación

Para integrar una plantilla, ejecutar los scripts reales `npm run typecheck`, `npm run lint` y `npm run build`. No inventar una suite automatizada inexistente ni declarar pruebas no ejecutadas. Los cambios exclusivamente documentales se validan por lectura y diff, sin builds innecesarios.

Comprobar rutas, imágenes/audio, consola e hidratación, navegación, responsive, teclado/foco, movimiento reducido, datos opcionales, personalización, fechas y enlaces aplicables. Verificar limpieza de efectos y referencias compatibles con los tipos React del repositorio; las APIs del navegador pertenecen al ámbito cliente.

Si hay apertura/música: sesión nueva y recarga, repetición consecutiva si aplica, audio único, errores de reproducción, cancelación de animaciones y recuperación de scroll/foco. Si no hay apertura: acceso directo sin overlay, bloqueo de scroll ni control de repetición. Revisar regresiones de Home y las cuatro plantillas existentes.

En PC, revisar mediante localhost y DevTools. Ejecutar desarrollo y producción secuencialmente, deteniendo una instancia antes de construir/iniciar la otra para no compartir `.next` activamente. Vercel Preview solo con autorización; registrar como pendientes los dispositivos físicos no probados.

**PLAN → revisión → autorización → implementación → QA → aprobación visual → commit.** El commit final, push, merge y deploy requieren la autorización correspondiente; aprobar una implementación no autoriza por sí solo esas operaciones.

## 9. Producción simultánea y mantenimiento

Mantener un único worktree local y una integración activa a la vez. Puede coexistir otra plantilla en construcción aislada y otra en dirección creativa, fuera del repositorio activo; cada paquete registra su SHA base y Codex comprueba su vigencia antes de integrarlo.

Actualizar este contrato solo cuando cambien las convenciones de producción. Mantener arquitectura en su documento y decisiones comerciales en la especificación, sin duplicar manuales ni precios.
