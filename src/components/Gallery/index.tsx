"use client";

import type React from "react";
import PhotoAlbum from "react-photo-album";
import type { Photo } from "react-photo-album";
import "./index.scss";
import "react-photo-album/styles.css";




interface GalleryProps {
    photos: Photo[];
    layout?: "masonry" | "rows" | "columns";
    spacing?: number;
    targetRowHeight?: number;
    columns?: number;
    onPhotoClick?: ({ index }: { index: number }) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
    photos,
    layout = "masonry",
    columns = 3,
    targetRowHeight = 200,
    onPhotoClick,
}) => {
    return (
        <PhotoAlbum
            photos={photos}
            layout={layout}
            targetRowHeight={layout === "rows" ? targetRowHeight : undefined}
            columns={layout === "columns" || layout === "masonry" ? (containerWidth) => {
                if (containerWidth < 400) return 1;
                if (containerWidth < 800) return 2;
                if (containerWidth < 1200) return 3;
                return columns;
            } : undefined}
            onClick={onPhotoClick}
        />
    );
};