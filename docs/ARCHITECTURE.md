# Arquitectura actual

## Stack

- **Framework:** Next.js `14.2.31` con React `18.3.1` y TypeScript `5.8.3`.
- **Routing:** App Router de Next.js, basado en directorios bajo `src/app`.
- **Estilos:** CSS global en `src/app/globals.css`; no se detectó una biblioteca de UI en uso.
- **Imágenes:** `next/image` en las plantillas; `next.config.mjs` permite formatos AVIF y WebP.
- **Fuentes:** `next/font/google` se carga desde `src/app/layout.tsx` (Cormorant Garamond, Montserrat y Pinyon Script).

## Rutas públicas

| Ruta | Comportamiento |
| --- | --- |
| `/` | Placeholder temporal de SHER |
| `/plantillas/xv/elegancia-contemporanea` | XV-01 · Elegancia Contemporánea |
| `/plantillas/xv/glam-nocturna` | XV-02 · Glam Nocturna |
| `/plantillas/xv/jardin-editorial` | XV-03 · Jardín Editorial |
| `/xv-02` | Redirect permanente a Glam Nocturna |
| `/xv-03` | Redirect permanente a Jardín Editorial |

No existe una ruta legacy independiente para XV-01: antes ocupaba `/`, que ahora está reservada para SHER.

## Árbol simplificado

```text
src/
├─ app/
│  ├─ page.tsx                         # Placeholder SHER con logo de marca
│  ├─ layout.tsx                       # Fuentes, metadata e iconos globales
│  ├─ manifest.ts                       # Manifest web de SHER
│  ├─ xv-02/page.tsx                   # Redirect legacy
│  ├─ xv-03/page.tsx                   # Redirect legacy
│  └─ plantillas/xv/*/page.tsx         # Adaptadores de rutas canónicas
├─ components/
│  ├─ invitation/                      # Calendario, countdown, música, RSVP, galería…
│  └─ motion/ScrollReveal.tsx
├─ data/
│  ├─ catalog.ts                       # Catálogo central de rutas disponibles
│  └─ events/                          # Datos demo por plantilla
├─ hooks/useOpeningSession.ts
├─ lib/invitation/                     # Helpers de familia y RSVP
├─ templates/xv/
│  ├─ elegance-01/
│  ├─ glam-02/
│  └─ garden-03/
└─ types/invitation.ts

public/
├─ audio/                              # Audio opcional de invitaciones
├─ brand/                              # Assets de producción de SHER
└─ images/                             # Fotos, assets y recursos por plantilla
```

## Plantillas y datos

Cada página canónica importa una plantilla visual y sus datos demo correspondientes:

- XV-01: `src/templates/xv/elegance-01/` + `src/data/events/ana-sofia.demo.ts`.
- XV-02: `src/templates/xv/glam-02/` + `src/data/events/camila.glam.demo.ts`.
- XV-03: `src/templates/xv/garden-03/` + `src/data/events/raquel.garden.demo.ts`.

Las rutas son adaptadores delgados: no duplican componentes ni assets. `src/data/catalog.ts` registra las plantillas expuestas y sus rutas canónicas.

## Componentes compartidos

`src/components/invitation/` concentra comportamiento reutilizable: `AddToCalendar`, `Countdown`, `DressCode`, `EventLocation`, `EventMusic`, `FamilyDetails`, `Gallery`, `GiftRegistry`, `OpeningExperience`, `RSVP`, `Timeline` y `VisualEventCalendar`.

La apertura usa `src/hooks/useOpeningSession.ts`; la normalización de familia y la URL de WhatsApp viven en `src/lib/invitation/`.

## Assets, marca y ejecución

Los assets se sirven desde `public/` mediante rutas absolutas como `/images/...` y `/audio/...`, por lo que las rutas canónicas no cambian sus ubicaciones. Las imágenes de contenido usan principalmente `next/image`; el audio se crea en el cliente por el componente de música.

El kit maestro de SHER vive en `brand/SHER-brand-kit-v1/` y permanece fuera del control de versiones como fuente original. Solo sus derivados aprobados para producción se copian de forma explícita a `public/brand/`: variantes SVG de logo y wordmark, monograma, avatar e iconos PWA. `src/app/favicon.ico`, `src/app/apple-icon.png` y `src/app/manifest.ts` integran esos recursos con las convenciones de metadata de Next.js.

Los tokens `--sher-*` en `src/app/globals.css` expresan la paleta de SHER sin sustituir ni alterar las variables visuales de las plantillas existentes. Las fuentes actuales se conservan aisladas; la posible incorporación de Manrope para una futura landing se decidirá junto con esa interfaz, no desde la integración del kit.

Scripts disponibles en `package.json`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`

No hay script de pruebas ni configuración de Vercel versionada en el repositorio. El build de producción se produce con `next build`; cualquier integración de deployment se gestiona fuera de estos archivos rastreados.
