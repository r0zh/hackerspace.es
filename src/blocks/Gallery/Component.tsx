"use client";

import type {
    GalleryBlock as GalleryBlockProps,
    Media,
} from "src/payload-types";

import { cn } from "@/utilities/ui";
import type React from "react";
import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import { getMediaUrl } from "@/utilities/getMediaUrl";

const baseClass = "gallery-block";

type Props = {
    className?: string;
    media?: Media[];
} & GalleryBlockProps;

export const GalleryBlock: React.FC<Props> = ({
    className,
    title,
    layout = "masonry",
    spacing = 10,
    targetRowHeight = 200,
    columns = 3,
    media = [],
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    // Transform media items to photo album format
    const photos = media
        .filter((item) => item.mimeType?.startsWith("image/"))
        .map((item) => {
            const width = item.width || 400;
            const height = item.height || 300;

            return {
                src: getMediaUrl(item.url, item.updatedAt),
                width,
                height,
                alt: item.alt || "",
            };
        });

    const handlePhotoClick = ({ index }: { index: number }) => {
        setSelectedPhoto(index);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    if (!photos.length) {
        return (
            <div className={cn(baseClass, "mx-auto my-16 px-4 sm:px-6 lg:px-8", className)}>
                <div className="max-w-7xl mx-auto">
                    {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
                    <div className="text-center py-8 text-gray-500">
                        No images to display in this gallery.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(baseClass, "mx-auto my-16 px-4 sm:px-6 lg:px-8", className)}>
            <div className="max-w-7xl mx-auto">
                {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}

                <PhotoAlbum
                    photos={photos}
                    layout={layout as "masonry" | "rows" | "columns"}
                    spacing={spacing || 10}
                    targetRowHeight={layout === "rows" ? (targetRowHeight || 200) : undefined}
                    columns={layout === "columns" ? (columns || 3) : undefined}
                    onClick={handlePhotoClick}
                />

                {/* Simple modal for viewing larger images */}
                {selectedPhoto !== null && photos[selectedPhoto] && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                closeModal();
                            }
                        }}
                        role="dialog"
                        aria-modal="true"
                        tabIndex={-1}
                    >
                        <div
                            className="relative max-w-4xl max-h-full"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            role="img"
                            aria-label={photos[selectedPhoto]?.alt || "Gallery image"}
                        >
                            <button
                                type="button"
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-opacity-75 z-10"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                            <img
                                src={photos[selectedPhoto]?.src || ""}
                                alt={photos[selectedPhoto]?.alt || "Gallery image"}
                                className="max-w-full max-h-full object-contain rounded"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};