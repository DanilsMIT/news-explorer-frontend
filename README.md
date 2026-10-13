# News Explorer - Frontend

Un proyecto interactivo desarrollado en React que permite a los usuarios buscar noticias recientes sobre cualquier tema, crear una cuenta y guardar sus artículos favoritos en un perfil personal. Este proyecto representa la etapa de Frontend del programa de desarrollo web Full Stack.

## 🚀 Características Principales

- **Búsqueda en tiempo real:** Integración con API de noticias para buscar artículos globales basados en palabras clave.
- **Diseño "Pixel Perfect" y Responsivo:** Adaptación estricta al diseño de Figma, garantizando una experiencia visual impecable en resoluciones de Escritorio (1440px), Tablet (768px) y Móvil (320px).
- **Autenticación y Base de Datos Simulada:** Lógica de estado y almacenamiento local (`localStorage`) que simula el registro de usuarios, inicio de sesión y guardado/borrado de artículos antes de la integración con el backend.
- **Protección de Rutas:** Uso de componentes de orden superior (HOC) para proteger el acceso a las noticias guardadas exclusivas para usuarios registrados.
- **Animaciones:** Implementación de GSAP para transiciones y apariciones suaves de los elementos de la interfaz.

## 🛠️ Tecnologías y Herramientas

- **React:** Hooks (`useState`, `useEffect`, `useContext`, `useRef`), Context API.
- **Vite:** Herramienta de construcción rápida y empaquetador del proyecto.
- **React Router DOM:** Enrutamiento dinámico y navegación entre páginas de una sola aplicación (SPA).
- **CSS3:** Uso estricto de la metodología **BEM** (Block, Element, Modifier), Flexbox, CSS Grid y Media Queries.
- **GSAP:** Librería de animaciones web.

## ⚙️ Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona este repositorio:

   git clone https://github.com/DanilsMIT/news-explorer-frontend.git

2. Navega al directorio del proyecto:

   cd news-explorer-frontend

3. Instala las dependencias necesarias:

   npm install

### ▶️ Ejecución del Proyecto

4. Inicia el servidor de desarrollo local:

   npm run dev

5. Abre tu navegador en la dirección local que te indique la terminal (por lo general `http://localhost:3000` o `http://localhost:5173`).

## 👨‍💻 Autor

**Danilo Isaac**

- Estudiante de Ingeniería en Sistemas - Saint Leo University & TripleTen.
- GitHub: https://github.com/DanilsMIT
- LinkedIn: https://www.linkedin.com/in/daniloisaacmelgar/

Proyecto desarrollado con enfoque en UX/UI, maquetación estricta y lógica de componentes reutilizables.
