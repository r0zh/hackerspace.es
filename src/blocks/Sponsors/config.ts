import type { Block } from "payload";

export const Sponsors: Block = {
	slug: "sponsors",
	interfaceName: "SponsorsBlock",
	fields: [
		{
			name: "title",
			type: "text",
			label: "Sponsors Section Title",
			required: false,
			defaultValue: "Our Sponsors",
		},
		{
			name: "targetRowHeight",
			type: "number",
			label: "Target Row Height (in pixels)",
			defaultValue: 200,
			min: 100,
			max: 500,
			admin: {
				description: "Target height for rows in the sponsors gallery",
			},
		},
	],
};
