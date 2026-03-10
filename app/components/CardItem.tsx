"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaHandPointer } from "react-icons/fa";
import { GalleryItem } from "./GalleryPage";

const IMAGE_ROTATION_FACTOR = 5;
const IMAGE_SCALE_AMOUNT = 1.03;
const CARD_LIFT_AMOUNT_PX = -8;
const CARD_PUSH_BACK_AMOUNT_PX = -20;
const CARD_FOLLOW_FACTOR_PX = 5;
const CARD_HOVER_SCALE_FORWARD = 1.02;
const CARD_HOVER_SCALE_BACKWARD = 0.98;

interface CardItemProps {
  title: string;
  text?: string;
  info?: string;
  tecnologies?: string;
  year: string;
  imageUrl: string;
  appUrl?: string;
  gitUrl?: string;
  categorie: string;

  pushBackOnHover?: boolean;
  disableHoverAnimation?: boolean;
  borderRadiusClass?: string;
  cardClassName?: string;
  imageStyle?: string;

  id?: string;
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps & { pushBackOnHover?: boolean }> = ({
  title,
  text,
  info,
  tecnologies,
  year,
  imageUrl,
  appUrl,
  gitUrl,
  disableHoverAnimation = false,
  pushBackOnHover = false,
  borderRadiusClass = "rounded-xl",
  cardClassName = "bg-gray-100 dark:bg-gray-100",
  imageStyle = "object-contain",
}) => {
  const showTapIndicator = true; // luego puedes cambiarlo a false si quieres

  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableHoverAnimation || !cardRef.current || showInfo) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    if (!disableHoverAnimation && !showInfo) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    if (showInfo) {
      setShowInfo(false);
      return;
    }

    if (info) {
      setShowInfo(true);
      setIsHovered(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const handleInfoCloseClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    e.stopPropagation();
    setShowInfo(false);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 600px)");

    if (mq.matches && cardRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsHovered(true);
            } else {
              setIsHovered(false);
            }
          });
        },
        {
          root: null,
          rootMargin: "-50% 0px -50% 0px",
        },
      );

      observer.observe(cardRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const currentImageUrl = imageUrl || "/azuloscuro.jpg";

  const isGif =
    typeof currentImageUrl === "string" &&
    currentImageUrl.toLowerCase().endsWith(".gif");

  const hoverScale = pushBackOnHover
    ? CARD_HOVER_SCALE_BACKWARD
    : CARD_HOVER_SCALE_FORWARD;

  const hoverTranslateZ = pushBackOnHover ? CARD_PUSH_BACK_AMOUNT_PX : 0;

  const hoverTranslateY = pushBackOnHover
    ? CARD_LIFT_AMOUNT_PX / 2
    : CARD_LIFT_AMOUNT_PX;

  const cardTransform =
    isHovered && !disableHoverAnimation && !showInfo
      ? `translate3d(${mousePos.x * CARD_FOLLOW_FACTOR_PX}px, ${
          hoverTranslateY + mousePos.y * CARD_FOLLOW_FACTOR_PX
        }px, ${hoverTranslateZ}px) scale3d(${hoverScale}, ${hoverScale}, 1)`
      : "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)";

  const cardStyle = {
    transform: cardTransform,
    transition: "transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
  };

  const imageWrapperTransform =
    isHovered && !disableHoverAnimation && !showInfo
      ? `scale3d(${IMAGE_SCALE_AMOUNT}, ${IMAGE_SCALE_AMOUNT}, ${IMAGE_SCALE_AMOUNT}) rotateX(${
          -mousePos.y * IMAGE_ROTATION_FACTOR
        }deg) rotateY(${mousePos.x * IMAGE_ROTATION_FACTOR}deg)`
      : "scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)";

  const imageWrapperStyle = {
    transform: imageWrapperTransform,
    transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
    width: "100%",
    height: "100%",
  };

  const imageContainerClasses = `w-full h-full relative overflow-hidden ${borderRadiusClass} aspect-video`;

  return (
    <div
      ref={cardRef}
      className={`relative border border-slate-100 dark:border-slate-600
         group h-full flex flex-col overflow-hidden ${cardClassName} ${borderRadiusClass} ${
           !disableHoverAnimation ? "cursor-pointer" : ""
         }`}
      style={{ perspective: "1000px", ...cardStyle }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
    >
      {/* ICONO TAP */}
      {info && showTapIndicator && (
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm flex items-center justify-center shadow-md opacity-50">
            <FaHandPointer className="text-black dark:text-white text-sm" />
          </div>
        </div>
      )}

      {/* Imagen */}
      <div
        className={`${imageContainerClasses} flex-grow ${
          showInfo ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <div style={imageWrapperStyle} className="absolute inset-0">
          <Image
            src={process.env.NEXT_PUBLIC_BASE_PATH + currentImageUrl}
            alt={title || "Portfolio Item"}
            fill
            className={`transition-opacity duration-300 ease-in-out ${imageStyle}`}
            unoptimized={isGif}
            priority={!isHovered && !isGif}
          />
        </div>
      </div>

      {/* Título */}
      {title && !showInfo && (
        <div
          className={`absolute top-4 left-4 transition-all duration-300 pointer-events-none ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          } z-[2]`}
        >
          <div className="bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-md shadow-md">
            <h3 className="text-black dark:text-white text-sm md:text-base font-semibold">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* CONTENIDO INFERIOR */}
      {!showInfo && (tecnologies || text || appUrl || gitUrl || year) && (
        <div
          className={`absolute bottom-4 left-4 right-4 flex flex-col items-start gap-2 transition-all duration-300 pointer-events-none ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          } z-[2]`}
        >
          {tecnologies && (
            <div className="bg-white dark:bg-neutral-800 px-2 py-1 rounded-md shadow-md pointer-events-auto">
              <p className="text-black dark:text-white text-xs font-medium">
                {tecnologies}
              </p>
            </div>
          )}

          {(text || appUrl || gitUrl || year) && (
            <div className="flex items-center gap-2 w-auto pointer-events-auto">
              {(text || appUrl || gitUrl) && (
                <div className="inline-flex items-center space-x-3 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-md shadow-md">
                  {text && (
                    <p className="text-black dark:text-white text-xs md:text-sm border-r border-gray-300 dark:border-gray-600 pr-3">
                      {text}
                    </p>
                  )}

                  {appUrl && (
                    <a
                      href={appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="text-black dark:text-white hover:text-blue-500 transition-colors"
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  )}

                  {gitUrl && (
                    <a
                      href={gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="text-black dark:text-white hover:text-gray-500 transition-colors"
                    >
                      <FaGithub size={16} />
                    </a>
                  )}
                </div>
              )}

              {year && (
                <span className="bg-white dark:bg-neutral-800 px-2 py-1 text-black dark:text-white text-xs md:text-sm rounded shadow-md">
                  {year}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* INFO OVERLAY */}
      {info && (
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center p-4 transition-opacity duration-300 ${
            showInfo
              ? "opacity-100 pointer-events-auto bg-black/60 backdrop-blur-sm"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={handleInfoCloseClick}
        >
          <div
            className="bg-white/90 dark:bg-neutral-800/90 p-6 rounded-lg max-w-md w-full max-h-[80%] overflow-y-auto relative shadow-xl text-black dark:text-white"
            onClick={handleInfoCloseClick}
          >
            <button
              onClick={handleInfoCloseClick}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              ×
            </button>

            <p className="text-sm whitespace-pre-wrap pr-6">{info}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
