import type { Block } from "payload";

export const Calendar: Block = {
	slug: "calendar",
	fields: [
		{
			name: "title",
			type: "text",
			label: "Calendar Title",
			required: false,
		},
		{
			name: "height",
			type: "number",
			label: "Calendar Height (in pixels)",
			defaultValue: 500,
			required: false,
		},
		{
			name: "view",
			type: "select",
			label: "Default View",
			defaultValue: "month",
			options: [
				{ label: "Month", value: "month" },
				{ label: "Week", value: "week" },
				{ label: "Day", value: "day" },
				{ label: "Agenda", value: "agenda" },
			],
			required: false,
		},
		{
			name: "dataSource",
			type: "select",
			label: "Event Data Source",
			defaultValue: "all",
			options: [
				{ label: "All Events from Collection", value: "all" },
				{ label: "Upcoming Events", value: "upcoming" },
				{ label: "Events by Category", value: "category" },
			],
			admin: {
				description: "Choose how to populate calendar events",
			},
		},
		{
			name: "categoryFilter",
			type: "select",
			label: "Category Filter",
			options: [
				{ label: "Meeting", value: "meeting" },
				{ label: "Conference", value: "conference" },
				{ label: "Workshop", value: "workshop" },
				{ label: "Social", value: "social" },
				{ label: "Training", value: "training" },
				{ label: "Other", value: "other" },
			],
			admin: {
				condition: (_, siblingData) => siblingData.dataSource === "category",
				description: "Filter events by category",
			},
		},
	],
	interfaceName: "CalendarBlock",
};
