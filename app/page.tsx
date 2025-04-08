"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import GalleryPage from "./components/GalleryPage";
import AboutMe from "./components/AboutMe";
import Button from "./components/Button";
import { IoClose } from "react-icons/io5";

// --- Animation Variants (sin cambios) ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
const aboutCardVariants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
    y: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const backdropVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// --- Home Component ---
const Home = () => {
  const [isAboutMeCardOpen, setIsAboutMeCardOpen] = useState(false);

  const toggleAboutMeCard = () => {
    setIsAboutMeCardOpen((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center overflow-x-hidden">
      {/* --- Header --- */}
      <Header />
      {/* --- Hero Section --- */}
      <motion.div
        className="w-full"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <HeroSection
          onAboutMeClick={toggleAboutMeCard}
          isAboutMeOpen={isAboutMeCardOpen}
        />
      </motion.div>
      {/* --- Contenedor Relativo para Gallery y About Card --- */}
      <motion.div
        id="gallery-section-start"
        // Añadimos rounded-b-3xl (o -2xl, -xl) y overflow-hidden. Mantenemos relative y z-10.
        className="w-full px-4 sm:px-6 lg:px-8 relative z-10 rounded-b-3xl overflow-hidden bg-white dark:bg-gray-800" // Añade fondo explícito para que overflow funcione bien
        custom={1}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        {/* Gallery Page (con blur condicional) */}
        <div
          className={`transition-filter duration-300 ${isAboutMeCardOpen ? "blur-sm pointer-events-none" : "blur-none"} pb-10 md:pb-16`}
        >
          {" "}
          {/* Añade padding bottom DENTRO */}
          <GalleryPage />
        </div>

        {/* --- Overlay Contenedor (Backdrop + Card) --- */}
        {/* La lógica de AnimatePresence y la tarjeta AboutMe permanece DENTRO del contenedor de galería */}
        <AnimatePresence>
          {isAboutMeCardOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="about-backdrop"
                className="absolute inset-0 z-15 bg-black/10 dark:bg-white/5 backdrop-blur-sm cursor-pointer"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={toggleAboutMeCard}
              />
              {/* Tarjeta About Me */}
              <motion.div
                key="about-me-card-cover"
                className="absolute top-0 inset-x-0 z-20 bg-white dark:bg-gray-900 rounded-b-xl shadow-xl w-full max-w-5xl mx-auto max-h-full flex flex-col overflow-hidden transform-gpu"
                style={{ transformOrigin: "top" }}
                variants={aboutCardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón Cierre X */}
                <div className="flex justify-end p-2 absolute top-1 right-1 z-10">
                  <button
                    onClick={toggleAboutMeCard}
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Cerrar Sobre Mí"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
                {/* Contenido Scrollable */}
                <div className="flex-grow overflow-y-auto p-6 pt-10 md:p-8 md:pt-12">
                  <AboutMe />
                </div>
                {/* Botón Cerrar Inferior */}
                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={toggleAboutMeCard} withBorder>
                    {" "}
                    Cerrar{" "}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>{" "}
      {/* Fin del Contenedor Relativo de Galería */}
      {/* --- Footer Area --- */}
      <motion.div
        id="contact"
        // Añadimos fondo, margen negativo y padding top. Mantenemos relative y z-0.
        className="dark:bg-gray-100 dark:text-black bg-slate-900 w-full -mt-28 md:-mt-20 relative z-0"
        // pt-* debe ser mayor que el valor absoluto de -mt-*
        custom={2}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <FooterSection />
      </motion.div>
    </div> // Fin del contenedor principal
  );
};

export default Home;
