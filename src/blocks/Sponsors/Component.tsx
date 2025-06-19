"use client";

import type {
    Sponsor,
    Media,
} from "src/payload-types";

import { SponsorsGallery } from "@/components/SponsorsGallery";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import { cn } from "@/utilities/ui";
import type React from "react";
import type { Photo } from "react-photo-album";

const baseClass = "sponsors-block";

type Props = {
    className?: string;
    sponsors?: Sponsor[];
    title?: string;
    targetRowHeight?: number;
};

export const SponsorsBlock: React.FC<Props> = ({
    className,
    title = "Our Sponsors",
    targetRowHeight = 200,
    sponsors = [],
}) => {
    // Transform sponsors to photo album format with links
    const sponsorPhotos: (Photo & { link?: string })[] = sponsors
        .filter((sponsor) => sponsor.media && typeof sponsor.media === "object")
        .map((sponsor) => {
            const media = sponsor.media as Media;
            const width = media.width || 400;
            const height = media.height || 300;

            return {
                src: getMediaUrl(media.url, media.updatedAt),
                width,
                height,
                alt: sponsor.name || media.alt || "",
                link: sponsor.link,
            };
        });

    const handleSponsorClick = ({ photo }: { index: number; photo: Photo & { link?: string } }) => {
        if (photo.link) {
            window.open(photo.link, '_blank', 'noopener,noreferrer');
        }
    };

    if (!sponsorPhotos.length) {
        return (
            <div className={cn(baseClass, "mx-auto my-16 px-4 sm:px-6 lg:px-8", className)}>
                <div className="max-w-7xl mx-auto">
                    {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
                    <div className="text-center py-8 text-gray-500">
                        No sponsors to display.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(baseClass, "mx-auto my-16 px-4 sm:px-6 lg:px-8", className)}>
            <div className="max-w-7xl mx-auto">
                {title && <h2 className="mb-6 text-2xl font-bold text-center">{title}</h2>}

                <SponsorsGallery
                    photos={sponsorPhotos}
                    targetRowHeight={targetRowHeight || 200}
                    onPhotoClick={handleSponsorClick}
                />
            </div>
        </div>
    );
};