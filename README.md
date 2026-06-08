# 🛸 Rick & Morty Universe

Aplicación web interactiva desarrollada con **React + TypeScript + Vite** que permite explorar el universo de la serie Rick & Morty consumiendo su [API pública](https://rickandmortyapi.com).

Proyecto desarrollado como **Actividad de Aprendizaje 1** de la asignatura *Diseño de Interfaces* — 2º DAM, curso 2025-2026, Centro San Valero.

---

## 🚀 Tecnologías utilizadas

- [React 18](https://react.dev/) — Librería de interfaces de usuario
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático
- [Vite](https://vitejs.dev/) — Bundler y servidor de desarrollo
- [React Router DOM](https://reactrouter.com/) — Navegación y rutas dinámicas
- [Rick & Morty API](https://rickandmortyapi.com/) — Fuente de datos

---

## ✨ Funcionalidades

- 👤 **Personajes** — Listado con búsqueda por nombre, filtrado por estado (Vivo/Muerto/Desconocido) y ordenación A-Z / Z-A
- 📄 **Detalle de personaje** — Vista individual con imagen, estado, especie, origen y ubicación (`/character/:id`)
- 🌍 **Ubicaciones** — Listado con búsqueda, filtrado por tipo y ordenación
- 📺 **Episodios** — Listado con búsqueda, filtrado por temporada y ordenación
- 🌙 **Tema oscuro/claro** — Toggle con persistencia en `localStorage`
- ⏳ **Estados de carga y error** — Manejo completo en cada llamada a la API

---

## 🗂️ Estructura del proyecto

```
src/
├── components/
│   ├── CharacterCard.tsx   # Tarjeta visual de cada personaje
│   ├── Footer.tsx          # Pie de página
│   ├── Header.tsx          # Cabecera con título
│   ├── InfoRow.tsx         # Fila etiqueta-valor en vista detalle
│   ├── Navigation.tsx      # Barra de navegación sticky
│   ├── SearchBar.tsx       # Búsqueda, filtro y ordenación
│   ├── StatusMessage.tsx   # Mensajes de carga, error y vacío
│   └── ThemeToggle.tsx     # Botón de cambio de tema
├── pages/
│   ├── HomePage.tsx
│   ├── CharactersPage.tsx
│   ├── CharacterDetailPage.tsx
│   ├── LocationsPage.tsx
│   └── EpisodesPage.tsx
├── utils/
│   └── api.ts              # Funciones de acceso a la API
├── types/
│   └── index.ts            # Tipos TypeScript del proyecto
├── App.tsx                 # Rutas y estructura general
├── main.tsx                # Punto de entrada
└── index.css               # Variables CSS y estilos globales
```

---

## ⚙️ Instalación y uso

```bash
# Clona el repositorio
git clone https://github.com/MarcosMartinezVijuesca/AA1-DI.git

# Entra en la carpeta
cd AA1-DI

# Instala las dependencias
npm install

# Arranca el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🌿 Metodología Git

El proyecto utiliza **Gitflow** como metodología de control de versiones:

- `main` — Versión estable de producción (release 1.0.0)
- `develop` — Rama de integración de funcionalidades
- `feature/setup-estructura` — Rama donde se desarrolló toda la aplicación

---

## 📁 Endpoints consumidos

| Endpoint | Descripción |
|----------|-------------|
| `/character` | Listado de personajes |
| `/character/:id` | Detalle de un personaje |
| `/location` | Listado de ubicaciones |
| `/episode` | Listado de episodios |

---

## 👤 Autor

**Marcos Martínez Vijuesca**  
2º DAM — Diseño de Interfaces  
Centro San Valero, Zaragoza · Curso 2025-2026
