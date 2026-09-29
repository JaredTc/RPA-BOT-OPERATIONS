# 🤖 RPA Bot Operations Center - Frontend API Client

Interfaz web  desarrollada en **Angular** para el monitoreo, gestión y control centralizado de usuarios y operaciones RPA. Diseñada bajo una arquitectura limpia, escalable y basada en **Standalone Components**.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** Angular 21+ (Standalone Components Architecture)
* **Lenguaje:** TypeScript / HTML5 / SCSS
* **Gestión de Peticiones:** HttpClient & HTTP Interceptors (JWT Bearer Injection)
* **Enrutamiento y Seguridad:** Angular Router (Functional Guards & Lazy Loading)
* **Formateo y Estilo:** Prettier & EditorConfig

---

## 📂 Estructura del Proyecto

El proyecto implementa el patrón **Enterprise Angular Architecture** (Core / Features / Shared), garantizando modularidad, mantenibilidad y desacoplamiento de responsabilidades:

```text
RPA_Bot_Operations_Center/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios globales, lógica de negocio y estado
│   │   │   ├── guards/              # Protección de rutas (AuthGuard, AdminGuard)
│   │   │   ├── models/              # Interfaces y tipos de datos (User, AuthToken)
│   │   │   ├── services/            # Servicios de API (AuthService, UserService)
│   │   │   └── utils/               # Helpers y constantes universales
│   │   │
│   │   ├── features/                # Módulos/Páginas funcionales (Lazy Loaded)
│   │   │   ├── auth/                # Vistas de Login y Registro público
│   │   │   └── users/               # Vistas de Administración y Perfil de Usuario
│   │   │
│   │   ├── interceptors/            # Interceptores HTTP (Inyección de JWT & Manejo de 401/500)
│   │   ├── layout/                  # Componentes estructurales (Sidebar, Navbar, Footer)
│   │   ├── shared/                  # Componentes reusables, directivas y pipes (UI Kit)
│   │   │
│   │   ├── app.config.ts            # Configuración global de proveedores e interceptores
│   │   ├── app.routes.ts            # Mapeo general de rutas y Lazy Loading
│   │   ├── app.ts / app.html        # Componente raíz de la aplicación
│   │   └── app.scss                 # Estilos globales de la app
│   │
│   ├── environments/                # Variables de entorno (API URL, Dev/Prod)
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   │
│   ├── main.ts                      # Punto de entrada de la aplicación Angular
│   └── styles.scss                  # Reglas CSS/SCSS globales
│
├── angular.json                     # Configuración del CLI de Angular
├── package.json                     # Dependencias y scripts NPM
├── README.md
└── tsconfig.json                    # Configuración del compilador TypeScript
