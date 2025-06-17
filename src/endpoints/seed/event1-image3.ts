import type { Media } from "@/payload-types";

export const event1Image3: Omit<Media, "createdAt" | "id" | "updatedAt"> = {
	alt: "HackerSpace.es Event Image 3",
	caption: {
		root: {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							detail: 0,
							format: 0,
							mode: "normal",
							style: "",
							text: "Event image for HackerSpace.es community meetup",
							version: 1,
						},
					],
					direction: "ltr",
					format: "",
					indent: 0,
					textFormat: 0,
					version: 1,
				},
			],
			direction: "ltr",
			format: "",
			indent: 0,
			version: 1,
		},
	},
};
