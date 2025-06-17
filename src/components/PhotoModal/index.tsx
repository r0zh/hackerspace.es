"use client";

import type React from "react";
import { useEffect } from "react";
import type { Photo } from "react-photo-album";
import "./index.scss";

interface PhotoModalProps {
    photo: Photo | null;
    isOpen: boolean;
    onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
    photo,
    isOpen,
    onClose,
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !photo) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === "Escape") {
                    onClose();
                }
            }}
            aria-modal="true"
            tabIndex={-1}
        >
            <div
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="img"
                aria-label={photo.alt || "Gallery image"}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-opacity-75 z-10"
                    aria-label="Close modal"
                >
                    ×
                </button>
                <img
                    src={photo.src}
                    alt={photo.alt || "Gallery image"}
                    className="max-w-full max-h-full object-contain rounded"
                />
            </div>
        </div>
    );
};
