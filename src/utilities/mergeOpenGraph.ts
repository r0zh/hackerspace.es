import type { Metadata } from "next";
import { getServerSideURL } from "./getURL";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Official website of Hackerspace.es, a community-driven hackerspace in Spain.",
	images: [
		{
			url: `${getServerSideURL()}/website-preview.webp`,
		},
	],
	siteName: "Hackerspace.es",
	title: "Hackerspace.es",
};

export const mergeOpenGraph = (
	og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
