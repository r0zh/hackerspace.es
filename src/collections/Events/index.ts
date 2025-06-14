import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";

export const Events: CollectionConfig = {
	slug: "events",
	access: {
		admin: authenticated,
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated,
	},
	admin: {
		defaultColumns: ["title", "start", "end"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
		},
		{
			name: "start",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
				},
			},
		},
		{
			name: "end",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
				},
			},
		},
		{
			name: "allDay",
			type: "checkbox",
			defaultValue: false,
		},
		{
			name: "location",
			type: "text",
		},
		{
			name: "category",
			type: "select",
			options: [
				{ label: "Meeting", value: "meeting" },
				{ label: "Conference", value: "conference" },
				{ label: "Workshop", value: "workshop" },
				{ label: "Social", value: "social" },
				{ label: "Training", value: "training" },
				{ label: "Other", value: "other" },
			],
		},
		{
			name: "status",
			type: "select",
			defaultValue: "scheduled",
			options: [
				{ label: "Scheduled", value: "scheduled" },
				{ label: "Cancelled", value: "cancelled" },
				{ label: "Completed", value: "completed" },
				{ label: "Postponed", value: "postponed" },
			],
		},
	],
	timestamps: true,
};
