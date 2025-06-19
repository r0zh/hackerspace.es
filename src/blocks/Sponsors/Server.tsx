import React from "react";
import type {
    Sponsor,
} from "src/payload-types";
import { SponsorsBlock } from "./Component";
import {
    getAllActiveSponsors,
} from "@/utilities/getSponsors";

interface SponsorsServerProps {
    className?: string;
    title?: string;
    targetRowHeight?: number;
}

export async function SponsorsServer({
    className,
    ...sponsorsProps
}: SponsorsServerProps) {
    let sponsors: Sponsor[] = [];

    try {
        sponsors = await getAllActiveSponsors();
    } catch (error) {
        console.error("Error fetching sponsors:", error);
        sponsors = [];
    }

    return (
        <SponsorsBlock
            {...sponsorsProps}
            className={className}
            sponsors={sponsors}
        />
    );
}
