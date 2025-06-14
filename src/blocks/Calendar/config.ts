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
			defaultValue: "manual",
			options: [
				{ label: "Manual Events (below)", value: "manual" },
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
				condition: (data) => data.dataSource === "category",
				description: "Filter events by category",
			},
		},
		{
			name: "eventLimit",
			type: "number",
			label: "Event Limit",
			defaultValue: 50,
			min: 1,
			max: 200,
			admin: {
				condition: (data) => data.dataSource !== "manual",
				description: "Maximum number of events to display",
			},
		},
		{
			name: "events",
			type: "array",
			label: "Events",
			fields: [
				{
					name: "title",
					type: "text",
					label: "Event Title",
					required: true,
				},
				{
					name: "start",
					type: "date",
					label: "Start Date/Time",
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
					label: "End Date/Time",
					required: true,
					admin: {
						date: {
							pickerAppearance: "dayAndTime",
						},
					},
				},
				{
					name: "description",
					type: "textarea",
					label: "Event Description",
					required: false,
				},
				{
					name: "allDay",
					type: "checkbox",
					label: "All Day Event",
					defaultValue: false,
				},
			],
			admin: {
				condition: (data) => data.dataSource === "manual",
				description:
					"Manual events for this calendar (only shown when using manual data source)",
			},
			required: false,
		},
	],
	interfaceName: "CalendarBlock",
};
