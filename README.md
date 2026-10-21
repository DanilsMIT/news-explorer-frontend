# News Explorer - Frontend

Un proyecto interactivo desarrollado en React que permite a los usuarios buscar noticias recientes sobre cualquier tema, crear una cuenta y guardar sus artículos favoritos en un perfil personal. Este repositorio representa el Frontend de una aplicación web Full Stack completa.

## 🔗 Enlaces del Proyecto

- **Aplicación en vivo (Vercel):** [https://news-explorer-psi.vercel.app](https://news-explorer-psi.vercel.app)
- **Repositorio del Backend:** [https://github.com/DanilsMIT/news-explorer-backend.git](https://github.com/DanilsMIT/news-explorer-backend.git)
- **API en vivo (Render):** [https://news-explorer-api-gc3x.onrender.com](https://news-explorer-api-gc3x.onrender.com)

## 🚀 Características Principales

- **Búsqueda en tiempo real:** Integración con API de noticias de terceros para buscar artículos globales basados en palabras clave.
- **Autenticación y Base de Datos Real:** Conexión asíncrona con una API propia (Node.js/Express) para gestionar el registro de usuarios, el inicio de sesión seguro con tokens JWT y el almacenamiento de artículos en MongoDB.
- **Protección de Rutas:** Uso de componentes de orden superior (HOC) para proteger el acceso a las noticias guardadas exclusivas para usuarios registrados.
- **Diseño "Pixel Perfect" y Responsivo:** Adaptación estricta al diseño de Figma, garantizando una experiencia visual impecable en resoluciones de Escritorio (1440px), Tablet (768px) y Móvil (320px).
- **Animaciones:** Implementación de GSAP para transiciones y apariciones suaves de los elementos de la interfaz.

## 🛠️ Tecnologías y Herramientas

- **React:** Hooks (`useState`, `useEffect`, `useContext`, `useRef`), Context API.
- **Vite:** Herramienta de construcción rápida y empaquetador del proyecto.
- **React Router DOM:** Enrutamiento dinámico y navegación entre páginas de una sola aplicación (SPA).
- **CSS3:** Uso estricto de la metodología **BEM** (Block, Element, Modifier), Flexbox, CSS Grid y Media Queries.
- **GSAP:** Librería de animaciones web.

## ⚙️ Instalación y Uso Local

Para ejecutar el frontend de este proyecto en tu máquina local, sigue estos pasos:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/DanilsMIT/news-explorer-frontend.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd news-explorer-frontend
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en la dirección local que te indique la terminal (por lo general `http://localhost:3000` o `http://localhost:5173`).

*(Nota: Para la funcionalidad completa de registro y guardado, asegúrate de clonar y ejecutar también el servidor desde el [repositorio del backend](https://github.com/DanilsMIT/news-explorer-backend.git)).*

## 👨‍💻 Autor

**Danilo Isaac**

- Estudiante de Ingeniería en Sistemas - Saint Leo University & TripleTen.
- GitHub: [https://github.com/DanilsMIT](https://github.com/DanilsMIT)
- LinkedIn: [https://www.linkedin.com/in/daniloisaacmelgar/](https://www.linkedin.com/in/daniloisaacmelgar/)

Proyecto desarrollado con enfoque en UX/UI, maquetación estricta y lógica de componentes reutilizables.