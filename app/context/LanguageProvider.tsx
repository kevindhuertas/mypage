"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const TRANSLATIONS = {
  en: {
    contact: "Contact me",
    footer: {
      madeWith: "Made with",
      copy: "Copied!",
    },
    hero: {
      availability: "Still available for new projects",
      iAm: "I am",
      viewProjects: "View Projects",
      aboutMe: "Me & CV",
    },
    gallery: {
      filters: {
        all: "All",
        work: "Work",
        photos: "Photos",
      },
      noItemsInCategory: 'No items found in category "{category}".',
      noItemsOverall: "No items to display.",
    },
    about: {
      cvButton: "CV",
      cvDownloadEs: "Español",
      cvDownloadEn: "English",
      altProfile: "Kevin Huertas",
      altActivity: "Activity GIF",
      altInterests: "Interests",
      altGraduation: "USFQ Graduation",
      title: "Software Engineer",
      quote:
        "I like to discover what each opportunity teaches, always finding something curious to see and do.",
      toolboxTitle: "My Digital Toolbox",
      toolboxIntroCore: "My main set of tools I've used the most:",
      toolboxIntroFamiliar: "And other technologies I've become familiar with:",
      educationTitle: "Focus",
      educationDegree: "B.Sc. Computer Science",
      educationUniversity: "Universidad San Francisco de Quito",
      educationDescription:
        "University sparked my curiosity to explore new technologies, leading me to self-study and seek work experience early in my career.",
      skillAutodidact: "Self-taught",
      skillInitiative: "Initiative",
      skillCuriosity: "Curiosity",
      skillProblemSolving: "Problem Solving",
      skillDetailOriented: "Detail-Oriented",
      interestsTitle: "Beyond the Screen",
      langSpanish: "Spanish (Native)",
      langEnglish: "English (B2)",
      interestAudiovisual: "Audiovisual Production",
      interestCrypto: "Crypto & Trading",
      interestMountain: "Mountaineering",
      interestCoffee: "Good Coffee",
    },
  },
  es: {
    contact: "Contáctame",
    footer: {
      madeWith: "Hecho con",
      copy: "¡Copiado!",
    },
    hero: {
      availability: "Todavía disponible para nuevos proyectos",
      iAm: "Soy",
      viewProjects: "Ver Proyectos",
      aboutMe: "Yo & CV",
    },
    gallery: {
      filters: {
        all: "Todos",
        work: "Work",
        photos: "Fotos",
      },
      noItemsInCategory: 'No hay elementos en la categoría "{category}".',
      noItemsOverall: "No hay elementos para mostrar.",
    },
    about: {
      cvButton: "CV",
      cvDownloadEs: "Español",
      cvDownloadEn: "Inglés",
      altProfile: "Kevin Huertas",
      altActivity: "Actividad GIF",
      altInterests: "Intereses",
      altGraduation: "Graduación USFQ",
      title: "Ingeniero de Software",
      quote:
        "Me gusta descubrir lo que cada oportunidad enseña, encontrando siempre algo curioso que ver y hacer.",
      toolboxTitle: "Mi Caja de Herramientas Digitales",
      toolboxIntroCore: "Mi set principal de herramientas que más he usado:",
      toolboxIntroFamiliar:
        "Y otras tecnologías con las que me he familiarizado:",
      educationTitle: "Enfoque",
      educationDegree: "Ing. Ciencias de la Computación",
      educationUniversity: "Universidad San Francisco de Quito",
      educationDescription:
        "La universidad inspiró mi curiosidad por explorar nuevas tecnologías, llevándome a estudiar por mi cuenta y a buscar experiencias laborales desde temprano en mi carrera.",
      skillAutodidact: "Autodidacta",
      skillInitiative: "Iniciativa",
      skillCuriosity: "Curiosidad",
      skillProblemSolving: "Resolución Problemas",
      skillDetailOriented: "Atención al Detalle",
      interestsTitle: "Más Allá de la Pantalla",
      langSpanish: "Español (Nativo)",
      langEnglish: "Inglés (B2)",
      interestAudiovisual: "Producción Audiovisual",
      interestCrypto: "Cripto & Trading",
      interestMountain: "Montañismo",
      interestCoffee: "Buen Café",
    },
  },
};

interface LangContextType {
  currentLanguage: "en" | "es";
  setCurrentLanguage: React.Dispatch<React.SetStateAction<"en" | "es">>;
  text: (typeof TRANSLATIONS)["en"];
}

const LangContext = createContext<LangContextType>({
  currentLanguage: "en",
  setCurrentLanguage: () => {},
  text: TRANSLATIONS.en,
});

interface LangProviderProps {
  children: ReactNode;
}

export const LangProvider: React.FC<LangProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "es">("en");
  const text = currentLanguage === "en" ? TRANSLATIONS.en : TRANSLATIONS.es;
  // currentLanguage === "en" ? TRANSLATIONS.en : TRANSLATIONS.en;

  return (
    <LangContext.Provider value={{ currentLanguage, setCurrentLanguage, text }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
