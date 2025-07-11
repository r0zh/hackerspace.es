import type { CollectionConfig } from "payload";

import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			//required: true,
		},
		{
			name: "caption",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						FixedToolbarFeature(),
						InlineToolbarFeature(),
					];
				},
			}),
		},
		{
			name: "linkedEvent",
			type: "relationship",
			relationTo: "events",
			label: "Link to Event (Optional)",
			admin: {
				description:
					"Optionally link this media to a single event by selecting from available events",
			},
		},
	],
	upload: {
		staticDir: path.resolve(dirname, "../../storage/media"),
		adminThumbnail: "thumbnail",
		focalPoint: true,
		imageSizes: [
			{
				name: "thumbnail",
				width: 300,
			},
			{
				name: "square",
				width: 500,
				height: 500,
			},
			{
				name: "small",
				width: 600,
			},
			{
				name: "medium",
				width: 900,
			},
			{
				name: "large",
				width: 1400,
			},
			{
				name: "xlarge",
				width: 1920,
			},
			{
				name: "og",
				width: 1200,
				height: 630,
				crop: "center",
			},
		],
	},
};
