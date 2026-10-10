# Aprendizaje del proyecto

## Hito 1 · Reestructuración de rutas

### Qué se hizo

- Se liberó `/` para la futura landing de SHER.
- Se crearon rutas canónicas para XV-01, XV-02 y XV-03.
- Se añadieron redirects legacy para XV-02 y XV-03.
- Se creó un catálogo central de plantillas.

### Conceptos aprendidos

- Routing.
- Rutas canónicas.
- Redirects permanentes.
- Separación entre ruta y componente.
- Single source of truth.
- Validación con lint, typecheck y build.

### Archivos importantes para revisar

- `src/app/page.tsx`
- Las páginas bajo `src/app/plantillas/xv/`
- `src/data/catalog.ts`
- `src/app/xv-02/page.tsx`
- `src/app/xv-03/page.tsx`

## Próximos hitos

_Registrar aquí los aprendizajes de futuras fases._

## Hito 2 · Fundación documental

Conceptos:

- especificación vs implementación
- documentación de arquitectura
- AGENTS.md
- fuente de verdad
- documentación viva

## Hito 3 · Integración de marca

Conceptos:

- asset maestro vs asset de producción
- public assets
- favicon
- metadata
- design tokens
- aislamiento de estilos y tipografía
