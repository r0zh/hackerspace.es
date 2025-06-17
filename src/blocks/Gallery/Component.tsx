"use client";

import type {
    GalleryBlock as GalleryBlockProps,
    Media,
} from "src/payload-types";

import { Gallery } from "@/components/Gallery";
import { PhotoModal } from "@/components/PhotoModal";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/utilities/ui";
import type React from "react";
import { useState } from "react";
import type { Photo } from "react-photo-album";

const baseClass = "gallery-block";

type Props = {
    className?: string;
    media?: Media[];
} & GalleryBlockProps;

export const GalleryBlock: React.FC<Props> = ({
    className,
    title,
    layout = "masonry",
    targetRowHeight = 200,
    columns = 3,
    media = [],
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    // Transform media items to photo album format
    const photos: Photo[] = media
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
        const photo = photos[index];
        if (photo) {
            setSelectedPhoto(photo);
        }
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

                <Gallery
                    photos={photos}
                    layout={layout as "masonry" | "rows" | "columns"}
                    targetRowHeight={targetRowHeight || 200}
                    columns={columns || 3}
                    onPhotoClick={handlePhotoClick}
                />

                <PhotoModal
                    photo={selectedPhoto}
                    isOpen={selectedPhoto !== null}
                    onClose={closeModal}
                />
            </div>
        </div>
    );
};