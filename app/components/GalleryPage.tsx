import React from "react";
import GalleryGrid from "./GalleryGrid";

interface ShowcasePageProps {}

export type GalleryItem = {
  id: string;

  year: string;
  categorie: "work" | "play" | "photography";
  imageUrl: string;
  appUrl?: string;
  gitUrl?: string;
  cardClassName?: string;
  imageStyle?: string;
  borderRadiusClass?: string;
  isLessHeight?: boolean;
  isExtraHeight?: boolean;
  disableHoverAnimation?: boolean;
  onClick?: (id: string) => void;
  translations: {
    [key in "en" | "es"]: {
      title: string;
      text?: string;
      info?: string;
      tecnologies?: string;
    };
  };
};

const galleryItemsData: GalleryItem[] = [
  {
    id: "item-6",
    year: "2024",
    categorie: "work",
    imageUrl: "/projects/xurbia.gif",
    imageStyle: "object-contain p-2 md:p-6",
    isLessHeight: true,
    translations: {
      es: {
        title: "Página XURBIA",
        tecnologies: "Wordpress",
      },
      en: {
        title: "XURBIA Page",
        tecnologies: "Wordpress",
      },
    },
  },
  {
    id: "item-9",
    year: "2021",
    categorie: "play",
    imageUrl: "/projects/desarrollogame.gif",
    cardClassName: " ",
    imageStyle: "object-cover",
    translations: {
      es: {
        title: "Desarrollo con Unity",
        text: "",
        tecnologies: "Unity | C#",
      },
      en: {
        title: "Development with Unity",
        text: "",
        tecnologies: "Unity | C#",
      },
    },
  },
  {
    id: "item-8",
    year: "2021 - 2023",
    categorie: "work",
    imageUrl: "/projects/legalbadger2.png",
    imageStyle: "object-contain p-2 md:p-8 shadow-lg rounded-sm",
    isExtraHeight: true,
    translations: {
      es: {
        title: "Ing. Software Web | Legal Badger",
        text: "Frontend (Angular/React) y Backend (NodeJs/Java)",
        info: "Desarrollo frontend inicial (AngularJS, RxJs, Tailwind) y MVP funcional.\n• Colaboración backend (Java, Spring Boot, RabbitMQ, PostgreSQL).\n• Implementación de nueva fase frontend (React, NextJS, Redux, MUI) con servicios AWS (Lambda, Cognito).\n• Integración con PostgreSQL, RxJs, DynamoDB.\n• Soporte backend (Node.js, Typescript) para endpoints y servicios AWS.\n• Trabajo con Scrum, Jira, Figma, Git y Slack.",
        tecnologies: "React | NextJS | Angular | Node | Java | AWS | SQL/NoSQL",
      },
      en: {
        title: "Web Software Eng. | Legal Badger",
        text: "Frontend (Angular/React) and Backend (NodeJs/Java)",
        info: "Initial frontend development (AngularJS, RxJs, Tailwind) and functional MVP.\n• Backend collaboration (Java, Spring Boot, RabbitMQ, PostgreSQL).\n• Implementation of new frontend phase (React, NextJS, Redux, MUI) with AWS services (Lambda, Cognito).\n• Integration with PostgreSQL, RxJs, DynamoDB.\n• Backend support (Node.js, Typescript) for endpoints and AWS services.\n• Worked with Scrum, Jira, Figma, Git, and Slack.",
        tecnologies: "React | NextJS | Angular | Node | Java | AWS | SQL/NoSQL",
      },
    },
  },
  {
    id: "item-1",
    appUrl: "https://kevindhuertas.github.io/Taski_manager/",
    gitUrl: "https://github.com/kevindhuertas/Taski_manager",
    year: "2022",
    categorie: "work",
    imageStyle: "object-contain p-2 md:p-8 shadow-lg rounded-sm",
    imageUrl: "/projects/taskiapp.png",
    isLessHeight: true,
    translations: {
      es: {
        title: "Taski | Gestor de Tareas",
        text: "Gestor de tareas simple",
        info: "Gestor de tareas desarrollado utilizando React para la interfaz, Redux para el manejo global del estado y Tailwind CSS para los estilos.",
        tecnologies: "React | Redux | Tailwind",
      },
      en: {
        title: "Taski | Task Manager",
        text: "Simple task manager",
        info: "Task manager developed using React for the interface, Redux for global state management, and Tailwind CSS for styling.",
        tecnologies: "React | Redux | Tailwind",
      },
    },
  },
  {
    id: "item-4",
    year: "2024 - 2025",
    categorie: "work",
    imageUrl: "/projects/pickupjobs.jpg",
    imageStyle: "object-contain p-1 md:p-6 rounded-sm",
    isExtraHeight: true,
    translations: {
      es: {
        title: "Ing. Software Móvil | Pickup Jobs",
        text: "Desarrollo de App Flutter (Cliente/Admin)",
        info: "• Desarrollo de apps cliente y administrador en Flutter (Android/iOS) Since MVP hasta versión funcional.\n• Implementación de Firebase (Storage, Notificaciones, Auth con Google/Apple).\n• Integración de Stripe para pagos.\n• Uso de Trello, GitHub, Figma y herramientas de Apple Development.",
        tecnologies: "Flutter | Firebase | Stripe | Dart",
      },
      en: {
        title: "Mobile Software Eng. | Pickup Jobs",
        text: "Flutter App Development (Client/Admin)",
        info: "• Development of client and administrator apps in Flutter (Android/iOS) from MVP to functional version.\n• Implementation of Firebase (Storage, Notifications, Auth with Google/Apple).\n• Integration of Stripe for payments.\n• Use of Trello, GitHub, Figma, and Apple Development tools.",
        tecnologies: "Flutter | Firebase | Stripe | Dart",
      },
    },
  },
  {
    id: "item-3",
    year: "2021",
    categorie: "work",
    gitUrl:
      "https://github.com/kevindhuertas/SlackBot_connected_with_spreadsheets_and_Web_page",
    imageUrl: "/projects/lunch4.png",
    imageStyle: "object-contain p-2 md:p-8 rounded-sm",
    isExtraHeight: true,
    translations: {
      es: {
        title: "SlackBot <-> Google Sheets",
        text: "Automatiza pedidos de comida",
        info: "Bot para Slack que automatiza la solicitud de pedidos de comida y registra la información directamente en una hoja de cálculo de Google Sheets.",
        tecnologies: "HTML | JavaScript | Google Apps Script",
      },
      en: {
        title: "SlackBot <-> Google Sheets",
        text: "Automates food orders",
        info: "Slack bot that automates food order requests and records the information directly into a Google Sheets spreadsheet.",
        tecnologies: "HTML | JavaScript | Google Apps Script",
      },
    },
  },
  {
    id: "item-12",
    year: "2020",
    categorie: "play",
    imageUrl: "/projects/skin.JPG",
    cardClassName: " ",
    imageStyle: "object-cover",
    translations: {
      es: {
        title: "Skin para Brawl Stars",
        text: "Concepto de skin para concurso",
        tecnologies: "Blender",
      },
      en: {
        title: "Skin for Brawl Stars",
        text: "Skin concept for contest",
        tecnologies: "Blender",
      },
    },
  },
  {
    id: "item-10",
    year: "2021",
    categorie: "play",
    imageStyle: "object-contain p-2 md:p-8 rounded-sm",
    imageUrl: "/projects/creatielogo.jpg",
    translations: {
      es: {
        title: "Creatie Brand",
        text: "Colaboración en desarrollo de marca",
        tecnologies: "Diseño Gráfico",
      },
      en: {
        title: "Creatie Brand",
        text: "Collaboration in brand development",
        tecnologies: "Graphic Design?",
      },
    },
  },
  {
    id: "item-5-1",
    year: "10/2025–01/2026",
    categorie: "work",
    imageUrl: "/projects/asitecno.jpg",
    imageStyle: "object-cover",
    isExtraHeight: true,
    translations: {
      es: {
        title: "Assistant Project Manager - Asitecno Cia Ltda.",
        text: "Gestión de proyecto de digitalización documental",
        info: "Apoyo en la gestión de un proyecto de digitalización y organización de documentos para la Universidad de las Artes de Guayaquil. Coordinación de un equipo de 10 personas, asistiendo en la planificación, asignación de tareas y ejecución del proyecto hasta su cierre. Optimización de flujos de trabajo, seguimiento del progreso, elaboración de reportes y presentaciones, y resolución de problemas para asegurar la entrega a tiempo.",
        tecnologies:
          "Gestión de Proyectos | Digitalización | Organización Documental",
      },
      en: {
        title: "Assistant Project Manager - Asitecno Cia Ltda.",
        text: "Document digitization project management",
        info: "Supported the management of a document digitization and organization project for the University of Arts of Guayaquil. Coordinated a team of 10 people, assisting with planning, task assignment, and project execution through closure. Optimized workflows, tracked progress, prepared reports and presentations, and supported problem-solving to ensure on-time delivery.",
        tecnologies:
          "Project Management | Document Digitization | Workflow Optimization",
      },
    },
  },
  {
    id: "item-5",
    year: "Since 2021",
    categorie: "work",
    imageUrl: "/me/mineria2.webp",
    imageStyle: "object-cover",
    isExtraHeight: true,
    translations: {
      es: {
        title: "Proyecto Minería Cripto",
        text: "Diseño y gestión de rigs",
        info: "Proyecto personal de minería de criptomonedas con inversión aproximada de $20k. Incluyó diseño, configuración, selección de hardware y mantenimiento para optimizar la minería.",
        tecnologies: "Hardware | Minería",
      },
      en: {
        title: "Crypto Mining Project",
        text: "Rig design and management",
        info: "Personal cryptocurrency mining project with an approximate investment of $20k. Included design, configuration, hardware selection, and maintenance to optimize mining.",
        tecnologies: "Hardware | Mining",
      },
    },
  },
  {
    id: "item-5-3",
    year: "Since 07/2025",
    categorie: "work",
    imageUrl: "/projects/puntovisas.gif",
    imageStyle: "object-contain p-1 md:p-6 rounded-sm",
    isExtraHeight: false,
    translations: {
      es: {
        title: "Puntovisas.com",
        text: "Fundador & Desarrollador",
        info: "Plataforma web para gestionar y adelantar citas de entrevista de visa en la embajada de Estados Unidos. Sistema automatizado para monitorear disponibilidad y reprogramar instantáneamente citas a fechas más tempranas. Implementado con backend en Python (Flask) con procesos en segundo plano y frontend en React. La versión MVP generó más de $250 en ventas iniciales.",
        tecnologies:
          "Python | Flask | React | Automatización | Web Development",
      },
      en: {
        title: "Puntovisas.com",
        text: "Founder & Developer",
        info: "Web platform for managing and advancing U.S. embassy visa interview appointments. Automated system that monitors availability and instantly reschedules earlier appointment slots. Built with a Python (Flask) backend with background processes and a React frontend. The MVP version generated over $250 in early sales.",
        tecnologies: "Python | Flask | React | Automation | Web Development",
      },
    },
  },
  {
    id: "item-2",
    appUrl:
      "https://kevindhuertas.github.io/Network-Latency-and-Bandwidth-Analysis-using-Google-Cloud-and-Azure/",
    gitUrl:
      "https://github.com/kevindhuertas/Network-Latency-and-Bandwidth-Analysis-using-Google-Cloud-and-Azure",
    year: "2023",
    categorie: "work",
    imageUrl: "/projects/rutes.png",
    imageStyle: "object-contain p-2 md:p-8 rounded-sm",
    isLessHeight: true,
    translations: {
      es: {
        title: "Análisis de Latencia/Ancho de Banda Cloud",
        text: "Rendimiento Google Cloud vs Azure",
        info: "Análisis comparativo de latencia de red y ancho de banda utilizando servidores alojados en Google Cloud y Azure, con interfaz en React.",
        tecnologies: "React | MUI",
      },
      en: {
        title: "Cloud Latency/Bandwidth Analysis",
        text: "Google Cloud vs Azure Performance",
        info: "Comparative analysis of network latency and bandwidth using servers hosted on Google Cloud and Azure, with a React interface.",
        tecnologies: "React | MUI",
      },
    },
  },
  {
    id: "item-5-4",
    year: "08/2025",
    categorie: "work",
    imageUrl: "/projects/publication.png",
    imageStyle: "object-contain p-2 md:p-8 rounded-lg",
    isExtraHeight: true,
    translations: {
      es: {
        title:
          "Application of Transformer Models for Volcano Seismic Signals Classification",
        text: "Publicación científica - ColCACI 2025",
        info: "Publicación científica sobre la aplicación de modelos Transformer para la clasificación de señales sísmicas volcánicas. El trabajo propone SigTR-Net, un enfoque basado en deep learning para mejorar la identificación y clasificación de señales sísmicas asociadas a actividad volcánica.",
        tecnologies: "Transformers | Deep Learning | Seismic Signal Processing",
      },
      en: {
        title:
          "Application of Transformer Models for Volcano Seismic Signals Classification",
        text: "Scientific publication - ColCACI 2025",
        info: "Scientific publication on the application of Transformer models for the classification of volcanic seismic signals. The work introduces SigTR-Net, a deep learning–based approach to improve the identification and classification of seismic signals related to volcanic activity.",
        tecnologies: "Transformers | Deep Learning | Seismic Signal Processing",
      },
    },
  },
];

/*
  {
    id: "item-11",
    title: "Prácticas | Asitecno",
    text: "Automatización y Desarrollo Web Interno",
    info: "• Contribución en desarrollo de proyectos internos de automatización.\n• Desarrollo y manejo de aplicaciones web para clientes.\n• Administración de proyecto de digitalización de documentos (planificación a ejecución).",
    tecnologies: "Web Dev | Gestión Proyectos",
    year: "2023 - 2024",
    categorie: "work",
    imageUrl: "/path/to/asitecno_image.png",
    // appUrl: "...",
    // gitUrl: "...",
  },
  {
    id: "item-13",
    title: "Prácticas | Shockoe",
    text: "Corrección y Mejoras de Diseño Web",
    info: "Asistencia en la corrección de errores y aplicación de mejoras de diseño para sitios web según diseños aprobados.",
    tecnologies: "HTML | CSS | Diseño Web",
    year: "2019",
    categorie: "work",
    imageUrl: "/path/to/shockoe_image.png",
  },
   {
    id: "item-14",
    title: "Contenido YouTube / Facebook",
    text: "Creación y Edición Multimedia",
    info: "Creación y monetización de contenido multimedia, desarrollando habilidades en edición de video e imágenes, además de marketing digital.",
    tecnologies: "Edición Video | Edición Imagen | Marketing Digital",
    year: "2015 - 2016",
    categorie: "play",
    imageUrl: "/path/to/youtube_facebook_image.png",
    appUrl: "link-a-canal-o-pagina",
  },
  */

const aboutMe: GalleryItem[] = [
  {
    id: "item-13",
    year: "2022",
    categorie: "play",
    imageUrl: "/me/patineta.gif",
    cardClassName: " ",
    imageStyle: "object-cover",
    translations: {
      es: {
        title: "Skate y yo",
      },
      en: {
        title: "Skateboarding and me",
      },
    },
  },
  {
    id: "item-11",
    year: "2020",
    categorie: "play",
    imageUrl: "/projects/primercomponent.JPG",
    translations: {
      es: {
        title: "Primeros pasos en el desarrollo web",
        tecnologies: "Html | Css",
      },
      en: {
        title: "First steps in web development",
        tecnologies: "Html | Css",
      },
    },
  },
  {
    id: "item-14",
    year: "2023",
    categorie: "play",
    imageUrl: "/me/cafe.jpg",
    imageStyle: "object-cover",
    isExtraHeight: true,
    translations: {
      es: {
        title: "Amor por el café y ser barista",
      },
      en: {
        title: "Love for coffee and being a barista",
      },
    },
  },
];
const photos: GalleryItem[] = Array.from({ length: 24 }, (_, i) => {
  const num = i + 1;
  return {
    id: `photo-${num}`,
    year: "",
    categorie: "photography",
    imageUrl: `/photos/foto ${num}.JPG`,
    imageStyle: "object-cover",
    isExtraHeight: true,
    translations: {
      es: {
        title: "",
      },
      en: {
        title: "",
      },
    },
  };
});

const GalleryPage: React.FC<ShowcasePageProps> = (props) => {
  const handleCardClick = (cardIdentifier: string) => {};
  return (
    <main className="w-full relative pt-3 z-10 mb-0">
      <div className="rounded-t-2xl rounded-b-3xl">
        <GalleryGrid
          cardData={[...galleryItemsData, ...photos]}
          onCardClick={handleCardClick}
        />
      </div>
    </main>
  );
};

export default GalleryPage;
