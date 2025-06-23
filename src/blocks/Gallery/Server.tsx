import React from "react";
import type {
    GalleryBlock as GalleryBlockProps,
    Media,
} from "src/payload-types";
import { GalleryBlock } from "./Component";
import {
    getAllMedia,
    getMediaByEvent,
    getAllEventMedia,
} from "@/utilities/getMedia";

interface GalleryServerProps extends GalleryBlockProps {
    className?: string;
}

export async function GalleryServer({
    className,
    dataSource = "all",
    selectedEvent,
    selectedMedia,
    ...galleryProps
}: GalleryServerProps) {
    let media: Media[] = [];

    try {
        switch (dataSource) {
            case "event":
                if (selectedEvent) {
                    const eventId = typeof selectedEvent === "object" ? selectedEvent.id : selectedEvent;
                    media = await getMediaByEvent(eventId);
                }
                break;
            case "all-events":
                media = await getAllEventMedia();
                break;
            case "selection":
                if (selectedMedia && selectedMedia.length > 0) {
                    // Filter out any null/undefined values and extract media objects
                    media = selectedMedia
                        .filter((item): item is Media => item != null && typeof item === "object")
                        .map((item) => typeof item === "object" ? item : null)
                        .filter((item): item is Media => item !== null);
                }
                break;
            default:
                media = await getAllMedia();
                break;
        }
    } catch (error) {
        console.error("Error fetching media for gallery:", error);
        media = [];
    }

    return (
        <GalleryBlock
            {...galleryProps}
            className={className}
            media={media}
        />
    );
}
