import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { slugField } from "@/fields/slug";

export const Sponsors: CollectionConfig = {
	slug: "sponsors",
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	defaultPopulate: {
		name: true,
		slug: true,
		link: true,
		media: true,
	},
	admin: {
		defaultColumns: ["name", "media", "link", "updatedAt"],
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "link",
			type: "text",
			required: true,
			admin: {
				description: "URL to the sponsor's website",
			},
		},
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				description: "Logo or image for the sponsor",
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Optional description about the sponsor",
			},
		},
		{
			name: "active",
			type: "checkbox",
			defaultValue: true,
			admin: {
				position: "sidebar",
				description: "Whether this sponsor should be displayed",
			},
		},
		{
			name: "priority",
			type: "number",
			defaultValue: 0,
			admin: {
				position: "sidebar",
				description: "Higher numbers will be displayed first",
			},
		},
		...slugField(),
	],
	timestamps: true,
};
