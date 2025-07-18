import { withPayload } from "@payloadcms/next/withPayload";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
	? process.env.NEXT_PUBLIC_SERVER_URL
	: undefined || process.env.__NEXT_PRIVATE_ORIGIN || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
				const url = new URL(item);

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(":", ""),
				};
			}),
		],
	},
	reactStrictMode: true,
	redirects,
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
