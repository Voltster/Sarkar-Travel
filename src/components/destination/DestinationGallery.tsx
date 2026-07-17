"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/shared/ImageLightbox";

interface DestinationGalleryProps {
    images: string[];
}

export function DestinationGallery({ images }: DestinationGalleryProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    if (!images || images.length === 0) return null;

    return (
        <section className="p-6 bg- white dark:bg-black section-card">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Gallery</h2>
                    {/* <div className="h-1 w-20 bg-red-600" /> */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[600px] md:h-[500px]">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative rounded-xl overflow-hidden cursor-pointer group ${index === 0 ? "col-span-2 row-span-2 h-full" : "h-full"
                                }`}
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={image}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>

            <ImageLightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={images}
                currentIndex={currentImageIndex}
                onIndexChange={setCurrentImageIndex}
            />
        </section>
    );
}
