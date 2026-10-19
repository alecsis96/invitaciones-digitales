# Arquitectura actual

El flujo de producción de nuevas plantillas se define en [SHER_TEMPLATE_CONTRACT.md](../SHER_TEMPLATE_CONTRACT.md); este documento describe la implementación existente, no una identidad visual obligatoria.

## Stack

- **Framework:** Next.js `15.5.24` con React `19.0.9` y TypeScript `5.8.3`.
- **Routing:** App Router de Next.js, basado en directorios bajo `src/app`.
- **Estilos:** CSS global para las XV y componentes compartidos; CSS Modules locales para el Home comercial y BODA-01. Sin biblioteca de UI adicional.
- **Imágenes:** `next/image` en las plantillas; `next.config.mjs` permite formatos AVIF y WebP.
- **Fuentes:** `next/font/google` en `src/app/layout.tsx` (Cormorant Garamond, Montserrat y Pinyon Script); el Home carga además su configuración propia de Cormorant Garamond y Manrope.

## Rutas públicas

| Ruta | Comportamiento |
| --- | --- |
| `/` | Home comercial de SHER y catálogo |
| `/plantillas/xv/elegancia-contemporanea` | XV-01 · Elegancia Contemporánea |
| `/plantillas/xv/glam-nocturna` | XV-02 · Glam Nocturna |
| `/plantillas/xv/jardin-editorial` | XV-03 · Jardín Editorial |
| `/plantillas/boda/romance-editorial` | BODA-01 · Romance Editorial |
| `/xv-02` | Redirect permanente a Glam Nocturna |
| `/xv-03` | Redirect permanente a Jardín Editorial |

No existe una ruta legacy independiente para XV-01: antes ocupaba `/`, que ahora está reservada para SHER.

## Árbol simplificado

```text
src/
├─ app/
│  ├─ page.tsx                         # Home comercial SHER
│  ├─ layout.tsx                       # Fuentes, metadata e iconos globales
│  ├─ manifest.ts                       # Manifest web de SHER
│  ├─ xv-02/page.tsx                   # Redirect legacy
│  ├─ xv-03/page.tsx                   # Redirect legacy
│  └─ plantillas/{xv,boda}/*/page.tsx  # Adaptadores de rutas canónicas
├─ components/
│  ├─ invitation/                      # Calendario, countdown, música, RSVP, galería…
│  ├─ sher/                            # Home, catálogo y wrapper comercial de demos
│  └─ motion/ScrollReveal.tsx
├─ data/
│  ├─ catalog.ts                       # Catálogo central de rutas disponibles
│  └─ events/                          # Datos demo por plantilla
├─ hooks/useOpeningSession.ts
├─ lib/invitation/                     # Helpers de familia y RSVP
├─ templates/
│  ├─ xv/{elegance-01,glam-02,garden-03}/
│  └─ boda/romance-editorial/
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
- BODA-01: `src/templates/boda/romance-editorial/` + `src/data/events/sofia-daniel.boda.demo.ts`, con tipos propios en `types.ts`.

Las rutas son adaptadores delgados: no duplican componentes ni assets. `src/data/catalog.ts` registra las plantillas expuestas y sus rutas canónicas.

El identificador comercial, el directorio interno y el slug público son distintos: XV-01 usa `elegance-01` internamente y `elegancia-contemporanea` en su ruta; BODA-01 usa categoría de catálogo `bodas` y segmento de ruta `boda`. Las XV consumen `InvitationEvent`; BODA define su modelo local reutilizando tipos pequeños, sin un esquema universal obligatorio.

El Home muestra las cuatro plantillas disponibles con `SherTemplateCollection` y `SherTemplateCard`. Bodas enlaza a su tarjeta; Infantiles permanece como próxima categoría. Las demos incorporan `SherTemplateDemo` desde su ruta, sin introducir el bloque comercial en la invitación reutilizable.

BODA-01 compone `BodaMusic` → `BodaNarrativeMotion` → `BodaLinenOpening` → `SherTemplateDemo` → invitación. La apertura protege el contenido y el bloque comercial mediante `inert`, restaura foco y scroll y registra la sesión. La animación narrativa usa atributos `data-boda-motion`, CSS Modules y recuperación ante movimiento reducido u observadores no disponibles. La música se inicia por interacción y usa `/audio/boda-01-romance-editorial.mp3`; sus tipos de volumen y bucle permanecen locales a BODA.

`SherTemplateDemo` sigue siendo Server Component y acepta `demoActions?: ReactNode`. El control cliente compartido `SherDemoReplayButton` recibe `onReplayOpening?: () => void`; sin función no presenta botón. Cada adaptador demo es responsable de su propio reinicio, sin controlador global de aperturas.

La ruta BODA compone el contenido de servidor mediante `children` dentro de `BodaDemoExperience`; `BodaDemoReplayAction` conecta el botón con su contexto cliente local. Repetir vuelve al inicio, elimina solo el fragmento de URL y remonta música, narrativa y apertura para ejecutar sus limpiezas. `forceOpening` es opcional y falso por defecto; se activa únicamente en una repetición explícita de la demo, sin borrar `sessionStorage`. El nuevo audio permanece pausado hasta tocar el sobre. Las XV no incorporan esta acción todavía.

La composición ocurre en `page.tsx`: el adaptador cliente no importa `SherTemplateDemo` y el callback de repetición permanece en el ámbito cliente. Una demo sin apertura puede componer directamente el wrapper de servidor y la invitación, sin adaptador de repetición ni `demoActions`.

## Componentes compartidos

`src/components/invitation/` concentra comportamiento reutilizable: `AddToCalendar`, `Countdown`, `DressCode`, `EventLocation`, `EventMusic`, `FamilyDetails`, `Gallery`, `GiftRegistry`, `OpeningExperience`, `RSVP`, `Timeline` y `VisualEventCalendar`.

Las aperturas XV usan `src/hooks/useOpeningSession.ts`; BODA gestiona su sesión y efectos localmente. La normalización de familia y la construcción de la URL de WhatsApp viven en `src/lib/invitation/`; construir la URL no valida por sí solo el teléfono.

Estos componentes no son todos visualmente neutrales: `Countdown` y `ScrollReveal` dependen de clases globales; `EventMusic` escucha `invitation:play-music`. BODA adapta el countdown con overrides bajo un contenedor de CSS Module y mantiene música y animaciones propias. Reutilizar exige revisar esos acoplamientos, no copiar la apariencia ni modificar las XV.

## Assets, marca y ejecución

Los assets se sirven desde `public/` mediante rutas absolutas como `/images/...` y `/audio/...`, por lo que las rutas canónicas no cambian sus ubicaciones. Las imágenes de contenido usan principalmente `next/image`; el audio se crea en el cliente por el componente de música.

El kit maestro de SHER vive en `brand/SHER-brand-kit-v1/` y permanece fuera del control de versiones como fuente original. Solo sus derivados aprobados para producción se copian de forma explícita a `public/brand/`: variantes SVG de logo y wordmark, monograma, avatar e iconos PWA. `src/app/favicon.ico`, `src/app/apple-icon.png` y `src/app/manifest.ts` integran esos recursos con las convenciones de metadata de Next.js.

Los tokens `--sher-*` en `src/app/globals.css` expresan la paleta de SHER sin sustituir ni alterar las variables visuales de las plantillas existentes. Las fuentes del Home comercial permanecen aisladas de las invitaciones.

Scripts disponibles en `package.json`:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`

No hay script de pruebas ni configuración de Vercel versionada en el repositorio. El build de producción se produce con `next build`; cualquier integración de deployment se gestiona fuera de estos archivos rastreados.
