"use client";

import type React from "react";
import PhotoAlbum from "react-photo-album";
import type { Photo } from "react-photo-album";
import "./index.scss";
import "react-photo-album/styles.css";

interface SponsorsGalleryProps {
    photos: (Photo & { link?: string })[];
    targetRowHeight?: number;
    onPhotoClick?: ({ index, photo }: { index: number; photo: Photo & { link?: string } }) => void;
}

export const SponsorsGallery: React.FC<SponsorsGalleryProps> = ({
    photos,
    targetRowHeight = 200,
    onPhotoClick,
}) => {
    return (
        <PhotoAlbum
            photos={photos}
            layout="rows"
            spacing={50}
            padding={50}
            targetRowHeight={targetRowHeight}
            onClick={onPhotoClick}
        />
    );
};
