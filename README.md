# ONCA IT - Website

Landing page corporativa para ONCA IT desarrollada con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

- ✅ Next.js 14 con App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Internacionalización (Español/Inglés) con next-intl
- ✅ Formulario de contacto con validación (React Hook Form + Zod)
- ✅ Integración con Resend para emails
- ✅ Google Analytics 4
- ✅ Meta Pixel (Facebook)
- ✅ SEO optimizado
- ✅ Responsive design
- ✅ Animaciones suaves

## 📦 Instalación

```bash
# Clonar o descargar el proyecto
cd onca-it-project

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Editar .env.local con tus valores
```

## ⚙️ Configuración

### Variables de Entorno (.env.local)

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXX

# Resend API Key (para formulario de contacto)
RESEND_API_KEY=re_XXXXXXXXXX

# URL del sitio
NEXT_PUBLIC_SITE_URL=https://oncait.com.ar
```

### Datos del sitio (lib/utils.ts)

Editar `siteConfig` con los datos reales:
- Teléfono
- Email
- WhatsApp
- Redes sociales

## 🏃 Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 🚀 Deploy en Vercel

1. Subir el proyecto a GitHub
2. Importar en Vercel
3. Configurar variables de entorno
4. Deploy!

## 📁 Estructura del Proyecto

```
├── app/
│   ├── [locale]/          # Rutas con i18n
│   │   ├── page.tsx       # Home
│   │   ├── servicios/     # Servicios
│   │   ├── contacto/      # Contacto
│   │   ├── casos-de-exito/
│   │   └── partners/
│   ├── api/
│   │   └── contact/       # API para formulario
│   └── globals.css
├── components/
│   ├── layout/            # Header, Footer, etc.
│   ├── home/              # Componentes de home
│   ├── services/          # Componentes de servicios
│   └── ui/                # Componentes reutilizables
├── lib/
│   ├── utils.ts           # Utilidades y config
│   └── analytics.ts       # Google Analytics & Meta Pixel
├── messages/
│   ├── es.json            # Traducciones español
│   └── en.json            # Traducciones inglés
└── public/
    └── images/            # Imágenes estáticas
```

## 📝 Personalización

### Agregar nuevo servicio

1. Agregar key en `serviceKeys` (lib/utils.ts)
2. Agregar icono en `serviceIcons`
3. Agregar traducciones en es.json y en.json

### Agregar testimonial

1. Agregar objeto en array `testimonials` (lib/utils.ts)

### Agregar partner

1. Agregar nombre en array `partners` (lib/utils.ts)

### Cambiar colores

Editar `tailwind.config.ts`:
- `onca.orange` - Color principal
- `service.blue` - Color secundario

## 📧 Formulario de Contacto

El formulario usa:
- **React Hook Form** para manejo de formulario
- **Zod** para validación
- **Resend** para envío de emails

Para configurar Resend:
1. Crear cuenta en [resend.com](https://resend.com)
2. Verificar dominio
3. Obtener API Key
4. Agregar a .env.local

## 🌐 SEO

- Metadata configurada por página
- Open Graph tags
- Twitter cards
- Sitemap (agregar con next-sitemap)

## 📱 Responsive

- Mobile first
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## 📄 Licencia

Privado - ONCA IT
# onca
