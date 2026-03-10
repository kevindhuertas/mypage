"use client";

import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import CardItem from "./CardItem";
import { GalleryItem } from "./GalleryPage";
import Button from "./Button";
import { useLang } from "../context/LanguageProvider";
import Image from "next/image";
const LESS_HEIGHT_CLASS = "h-[480px]";
const DEFAULT_HEIGHT_CLASS = "h-[530px]";
const EXTRA_HEIGHT_CLASS = "h-[560px]";

const breakpointColumnsObj = {
  default: 3,
  1400: 3,
  700: 1,
  500: 1,
};

type GalleryGridProps = {
  cardData?: GalleryItem[];
  onCardClick?: (id: string) => void;
};

// Añadido "photography"
type CategoryFilter = "all" | "work" | "photography";

const GalleryGrid: React.FC<GalleryGridProps> = ({
  cardData = [],
  onCardClick = (id: string) => {},
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const { text, currentLanguage } = useLang();

  // Control para disparar la animación de pop sólo al montar
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  if (!cardData || cardData.length === 0) {
    return (
      <p className="text-center text-neutral-400 ">
        {text.gallery.noItemsOverall}
      </p>
    );
  }

  const getHeightClass = (card: GalleryItem) => {
    if (card.isExtraHeight) return EXTRA_HEIGHT_CLASS;
    if (card.isLessHeight) return LESS_HEIGHT_CLASS;
    return DEFAULT_HEIGHT_CLASS;
  };

  const filteredData = cardData.filter((card) => {
    if (selectedCategory === "all") {
      return card.categorie === "work" || card.categorie === "play";
    }
    if (selectedCategory === "photography") {
      return card.categorie === "photography";
    }
    return card.categorie === selectedCategory;
  });

  const handleFilterChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
  };

  const commonButtonClass =
    "px-8 py-2 text-sm font-medium transition-colors duration-200 ease-out inline-flex items-center justify-center";
  // color plano azul cuando está activo (seleccionado)
  const activeBgColor = "bg-blue-600";
  const activeTextColor = "text-white";
  const activeHoverBgColor = "bg-blue-700";

  // INACTIVO: ahora gris para mejor contraste con borde pequeño azul
  const inactiveBgColor = "bg-gray-200 dark:bg-gray-700";
  const inactiveTextColor = "text-gray-700 dark:text-gray-300";
  const inactiveHoverBgColor = "bg-gray-300 dark:hover:bg-gray-600";

  // Borde más pequeño (1px) azul para todos los botones
  const borderClass = "border border-blue-400";

  return (
    <div>
      {/* Estilos locales para la animación "pop" */}
      <style>{`
        @keyframes popBtn {
          0% { transform: scale(1.08); opacity: 0.98; }
          100% { transform: scale(1); opacity: 1; }
        }
        .btn-pop {
          animation: popBtn 320ms cubic-bezier(.2,.9,.2,1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .btn-pop { animation: none; transform: none; }
        }
      `}</style>

      <div className="flex justify-center space-x-4 gap-1 md:gap-2 mb-4 flex-wrap">
        {/* WORK */}
        <Button
          onClick={() => handleFilterChange("work")}
          className={`${commonButtonClass} ${borderClass} ${
            mounted ? "btn-pop" : ""
          }`}
          bgColor={
            selectedCategory === "work" ? activeBgColor : inactiveBgColor
          }
          textColor={
            selectedCategory === "work" ? activeTextColor : inactiveTextColor
          }
          hoverBgColor={
            selectedCategory === "work"
              ? activeHoverBgColor
              : inactiveHoverBgColor
          }
          withBorder={true}
          disableHoverAnimation={false}
        >
          {text?.gallery?.filters?.work ?? "Work"}
        </Button>
        {/* ALL */}
        <Button
          onClick={() => handleFilterChange("all")}
          className={`${commonButtonClass} ${borderClass} ${
            mounted ? "btn-pop" : ""
          }`}
          bgColor={selectedCategory === "all" ? activeBgColor : inactiveBgColor}
          textColor={
            selectedCategory === "all" ? activeTextColor : inactiveTextColor
          }
          hoverBgColor={
            selectedCategory === "all"
              ? activeHoverBgColor
              : inactiveHoverBgColor
          }
          withBorder={true}
          disableHoverAnimation={false}
        >
          {text?.gallery?.filters?.all ?? "All"}
        </Button>

        {/* PHOTOGRAPHY (nuevo) */}
        <Button
          onClick={() => handleFilterChange("photography")}
          className={`${commonButtonClass} ${borderClass} ${
            mounted ? "btn-pop" : ""
          }`}
          bgColor={
            selectedCategory === "photography" ? activeBgColor : inactiveBgColor
          }
          textColor={
            selectedCategory === "photography"
              ? activeTextColor
              : inactiveTextColor
          }
          hoverBgColor={
            selectedCategory === "photography"
              ? activeHoverBgColor
              : inactiveHoverBgColor
          }
          withBorder={true}
          disableHoverAnimation={false}
        >
          {text?.gallery?.filters?.photos ?? "Photos"}
        </Button>
      </div>

      {filteredData.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex w-auto"
          columnClassName="my-masonry-grid_column px-1"
        >
          {filteredData.map((card: GalleryItem, index) => {
            const heightClass = getHeightClass(card);
            const cardTexts =
              card.translations[currentLanguage] || card.translations.en;

            return (
              <div
                key={card.id || index}
                className={`mb-2 ${heightClass} w-full`}
              >
                <CardItem
                  id={card.id}
                  title={cardTexts.title}
                  text={cardTexts.text}
                  info={cardTexts.info}
                  tecnologies={cardTexts.tecnologies}
                  year={card.year}
                  categorie={card.categorie}
                  imageUrl={card.imageUrl}
                  appUrl={card.appUrl}
                  gitUrl={card.gitUrl}
                  pushBackOnHover={true}
                  borderRadiusClass={card.borderRadiusClass}
                  cardClassName={card.cardClassName}
                  imageStyle={card.imageStyle}
                />
              </div>
            );
          })}
        </Masonry>
      ) : (
        <p className="text-center text-neutral-400 mt-8">
          {text.gallery.noItemsInCategory.replace(
            "{category}",
            selectedCategory,
          )}
        </p>
      )}
    </div>
  );
};

export default GalleryGrid;
