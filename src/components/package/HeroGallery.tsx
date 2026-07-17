"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy } from "lucide-react";
import { ImageLightbox } from "@/components/shared/ImageLightbox";

interface HeroGalleryProps {
    images: string[];
}

export function HeroGallery({ images }: HeroGalleryProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    let validImages = images
        ?.map((img) => (typeof img === "string" ? img.trim() : ""))
        ?.filter(Boolean) as string[];

    // If no valid images, render a nice placeholder instead of a broken image
    if (!validImages || validImages.length === 0) {
        return (
            <div className="w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 font-medium">No Images Available</span>
            </div>
        );
    }

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    return (
        <>
            {/* Mobile: Horizontal Scroll Snap */}
            <div className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-2 pb-4 -mx-4 px-4 scrollbar-hide">
                {validImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative w-[85vw] h-[300px] shrink-0 snap-center rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={img}
                            alt={`Gallery ${idx}`}
                            fill
                            className="object-cover"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Desktop / Tablet Grid (Dynamic based on image count) */}
            <div className="hidden md:flex h-[400px] lg:h-[500px] rounded-lg overflow-hidden gap-2 group/gallery relative">
                {validImages.length === 1 && (
                    <div
                        className="relative w-full h-full cursor-pointer overflow-hidden group/item"
                        onClick={() => openLightbox(0)}
                    >
                        <Image
                            src={validImages[0]}
                            alt="Gallery Main"
                            fill
                            className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                    </div>
                )}

                {validImages.length === 2 && (
                    <>
                        <div
                            className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={validImages[0]}
                                alt="Gallery Main"
                                fill
                                className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div
                            className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                            onClick={() => openLightbox(1)}
                        >
                            <Image
                                src={validImages[1]}
                                alt="Gallery 2"
                                fill
                                className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                        </div>
                    </>
                )}

                {validImages.length === 3 && (
                    <>
                        <div
                            className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={validImages[0]}
                                alt="Gallery Main"
                                fill
                                className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div className="w-1/2 h-full flex flex-col gap-2">
                            <div
                                className="relative flex-1 cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(1)}
                            >
                                <Image
                                    src={validImages[1]}
                                    alt="Gallery 2"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                            <div
                                className="relative flex-1 cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(2)}
                            >
                                <Image
                                    src={validImages[2]}
                                    alt="Gallery 3"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                        </div>
                    </>
                )}

                {validImages.length === 4 && (
                    <>
                        <div
                            className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={validImages[0]}
                                alt="Gallery Main"
                                fill
                                className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div className="w-1/2 h-full flex gap-2">
                            <div className="w-1/2 h-full flex flex-col gap-2">
                                <div
                                    className="relative flex-1 cursor-pointer overflow-hidden group/item"
                                    onClick={() => openLightbox(1)}
                                >
                                    <Image
                                        src={validImages[1]}
                                        alt="Gallery 2"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                                </div>
                                <div
                                    className="relative flex-1 cursor-pointer overflow-hidden group/item"
                                    onClick={() => openLightbox(2)}
                                >
                                    <Image
                                        src={validImages[2]}
                                        alt="Gallery 3"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                                </div>
                            </div>
                            <div
                                className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(3)}
                            >
                                <Image
                                    src={validImages[3]}
                                    alt="Gallery 4"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                        </div>
                    </>
                )}

                {validImages.length >= 5 && (
                    <>
                        {/* Main Large Image (Left - spans 50% width) */}
                        <div
                            className="relative w-1/2 h-full cursor-pointer overflow-hidden group/item"
                            onClick={() => openLightbox(0)}
                        >
                            <Image
                                src={validImages[0]}
                                alt="Gallery Main"
                                fill
                                className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                        </div>

                        {/* Right Side 4 images grid (spans 50% width) */}
                        <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2 relative">
                            <div
                                className="relative w-full h-full cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(1)}
                            >
                                <Image
                                    src={validImages[1]}
                                    alt="Gallery 2"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                            
                            <div
                                className="relative w-full h-full cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(2)}
                            >
                                <Image
                                    src={validImages[2]}
                                    alt="Gallery 3"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                            
                            <div
                                className="relative w-full h-full cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(3)}
                            >
                                <Image
                                    src={validImages[3]}
                                    alt="Gallery 4"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                            
                            <div
                                className="relative w-full h-full cursor-pointer overflow-hidden group/item"
                                onClick={() => openLightbox(4)}
                            >
                                <Image
                                    src={validImages[4]}
                                    alt="Gallery 5"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-103"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300" />
                            </div>
                        </div>
                    </>
                )}

                {/* Show All Photos button Overlay (Styled as Secondary Outlined Button) */}
                {validImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-10">
                        <button
                            className="bg-white dark:bg-slate-800 text-color-text-primary hover:bg-muted dark:hover:bg-slate-700 border border-border rounded-md px-4 py-1.5 flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer shadow-sm hover:border-color-text-secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(0);
                            }}
                        >
                            <Copy className="w-4 h-4" />
                            Show all photos
                        </button>
                    </div>
                )}
            </div>

            <ImageLightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={validImages}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
            />
        </>
    );
}
