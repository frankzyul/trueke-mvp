# 🌟 TRUEKE MVP - Intercambio Consciente Digital

![TRUEKE](https://img.shields.io/badge/TRUEKE-Yin%20Yang%20Tech-00d4ff?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 🎯 Descripción

**TRUEKE** es un MVP de plataforma de intercambio consciente que combina bienes, servicios y conocimientos en un ambiente tecno-futurista con estética yin-yang. Basado en 5 fases adaptadas del trafkintun a un lenguaje universal de equilibrio digital.

### ⚡ Características

- **🎨 UI Futurista**: Diseño yin-yang tecno-minimalista con efectos de neón
- **🔄 5 Fases de Intercambio**: Flujo completo desde encuentro hasta conocimiento
- **🏘️ Comunidades**: Sistema de grupos con propósitos y valores
- **📦 Recursos**: Gestión de bienes y servicios disponibles
- **🤝 Ofertas**: Sistema de negociación e intercambio
- **💬 Mensajería**: Chat por oferta para coordinación

## 🚀 Deploy Rápido en Vercel

### 1️⃣ Importar Repositorio
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/frankzyul/trueke-mvp)

### 2️⃣ Variables de Entorno Requeridas
```env
DATABASE_URL=tu_url_de_neon_postgres
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu_clave_secreta_super_segura
```

### 3️⃣ ¡Deploy Automático!
Vercel detectará Next.js automáticamente y hará el build.

---

## 🏗️ Desarrollo Local

### Prerequisitos
- Node.js 18+
- pnpm (recomendado) o npm
- Base de datos PostgreSQL (Neon DB recomendado)

### Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/frankzyul/trueke-mvp.git
cd trueke-mvp

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Configurar base de datos
pnpm db:gen      # Generar migraciones
pnpm db:push     # Aplicar a BD
pnpm seed        # Poblar datos de prueba

# 5. Ejecutar en desarrollo
pnpm dev
```

### 📊 Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servidor de producción
pnpm lint         # Linter ESLint
pnpm typecheck    # Verificación de tipos
pnpm db:gen       # Generar migraciones Drizzle
pnpm db:push      # Aplicar migraciones
pnpm db:studio    # Abrir Drizzle Studio
pnpm seed         # Poblar datos de prueba
```

---

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: Next.js 15.4.6 + React 19
- **Styling**: TailwindCSS 4 + CSS futurista personalizado
- **Database**: PostgreSQL + Drizzle ORM
- **Validación**: Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

### Estructura del Proyecto
```
src/
├── app/
│   ├── (fases)/           # 5 fases del intercambio
│   │   ├── inicio/        # Fase 1: Presentación
│   │   ├── ofrecimiento/  # Fase 2: Comunidades
│   │   ├── recursos/      # Fase 3: Bienes/Servicios
│   │   ├── intercambio/   # Fase 4: Negociación
│   │   └── conocimientos/ # Fase 5: Sabiduría compartida
│   ├── api/               # API Routes
│   │   ├── communities/
│   │   ├── resources/
│   │   ├── offers/
│   │   └── messages/
│   └── layout.tsx
├── components/            # Componentes UI
├── lib/                   # Utilidades y configuración
│   ├── db.ts             # Conexión Drizzle
│   ├── schema.ts         # Esquemas de BD
│   ├── types.ts          # Tipos TypeScript
│   └── validators.ts     # Schemas Zod
└── scripts/
    └── seed.ts           # Datos de prueba
```

---

## 🎨 Diseño Yin-Yang Futurista

### Paleta de Colores
- **Primario**: Negro profundo (#000000)
- **Secundario**: Blanco puro (#ffffff)
- **Acento**: Azul celeste eléctrico (#06b6d4)
- **Gradientes**: Negro → Gris oscuro → Negro

### Efectos Visuales
- ⚡ **Electric Pulse**: Animaciones de pulso en íconos
- 🌟 **Neon Glow**: Efectos de neón en texto y bordes
- 🔮 **Glass Morphism**: Navbar con cristal difuminado
- 📱 **Responsive**: Adaptativo en todos los dispositivos

---

## 📋 Variables de Entorno

Crea un archivo `.env.local` con:

```env
# Base de datos (Neon PostgreSQL recomendado)
DATABASE_URL=postgres://usuario:password@host:5432/database?sslmode=require

# NextAuth (opcional para autenticación futura)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=clave-super-secreta-para-jwt

# Para producción, cambiar NEXTAUTH_URL por tu dominio:
# NEXTAUTH_URL=https://tu-dominio.vercel.app
```

---

## 🚀 Instrucciones de Deploy

### Opción 1: Deploy con 1-Click (Recomendado)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/frankzyul/trueke-mvp)

### Opción 2: Deploy Manual
1. Fork este repositorio
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el repositorio en Vercel
4. Añade las variables de entorno requeridas
5. ¡Deploy automático!

### Base de Datos (Requerida)
1. Crea una cuenta gratuita en [Neon](https://neon.tech)
2. Crea una nueva base de datos
3. Copia la URL de conexión
4. Añádela como `DATABASE_URL` en Vercel

---

## 🔗 Enlaces

- **🌐 Repositorio**: https://github.com/frankzyul/trueke-mvp
- **🚀 Deploy Vercel**: [Usar botón de arriba]
- **📚 Documentación**: Este README
- **🐛 Issues**: [GitHub Issues](https://github.com/frankzyul/trueke-mvp/issues)

---

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es open source bajo licencia MIT.

---

## 🙏 Créditos

Desarrollado con 💖 para la comunidad de intercambio consciente.

**Filosofía Yin-Yang**: Equilibrio entre tecnología y humanidad, entre dar y recibir, entre lo digital y lo espiritual.

---

### 🎯 ¿Listo para el intercambio consciente?

¡Explora las 5 fases del intercambio y únete a la revolución del trueque digital! 🌟
