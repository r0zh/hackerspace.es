import type { Block } from "payload";

export const Gallery: Block = {
	slug: "gallery",
	interfaceName: "GalleryBlock",
	fields: [
		{
			name: "title",
			type: "text",
			label: "Gallery Title",
			required: false,
		},
		{
			name: "dataSource",
			type: "select",
			label: "Media Data Source",
			defaultValue: "all",
			options: [
				{ label: "All Media from Collection", value: "all" },
				{ label: "Media by Event", value: "event" },
				{ label: "Individual Selection", value: "selection" },
			],
			admin: {
				description: "Choose how to populate gallery media",
			},
		},
		{
			name: "selectedEvent",
			type: "relationship",
			relationTo: "events",
			label: "Event",
			admin: {
				condition: (_, siblingData) => siblingData.dataSource === "event",
				description: "Select an event to show media for",
			},
		},
		{
			name: "selectedMedia",
			type: "relationship",
			relationTo: "media",
			hasMany: true,
			label: "Selected Media",
			admin: {
				condition: (_, siblingData) => siblingData.dataSource === "selection",
				description: "Select specific media items to display",
			},
		},
		{
			name: "layout",
			type: "select",
			label: "Layout Style",
			defaultValue: "masonry",
			options: [
				{ label: "Masonry", value: "masonry" },
				{ label: "Rows", value: "rows" },
				{ label: "Columns", value: "columns" },
			],
			admin: {
				description: "Choose the layout style for the gallery",
			},
		},
		{
			name: "spacing",
			type: "number",
			label: "Spacing (in pixels)",
			defaultValue: 10,
			min: 0,
			max: 50,
			admin: {
				description: "Space between images in the gallery",
			},
		},
		{
			name: "targetRowHeight",
			type: "number",
			label: "Target Row Height (in pixels)",
			defaultValue: 200,
			min: 100,
			max: 500,
			admin: {
				condition: (_, siblingData) => siblingData.layout === "rows",
				description: "Target height for rows in the gallery",
			},
		},
		{
			name: "columns",
			type: "number",
			label: "Number of Columns",
			defaultValue: 3,
			min: 1,
			max: 6,
			admin: {
				condition: (_, siblingData) => siblingData.layout === "columns",
				description: "Number of columns in the gallery",
			},
		},
	],
};
