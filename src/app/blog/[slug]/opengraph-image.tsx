import { ImageResponse } from "next/og"

export const alt = "Blog post"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = {
	params: Promise<{ slug: string }>
}

export default async function PostOgImage({ params }: Props) {
	const { slug } = await params

	// Read post frontmatter directly to avoid importing blog.ts (Node.js APIs incompatible with edge)
	const fs = await import("node:fs/promises")
	const path = await import("node:path")
	const matter = (await import("gray-matter")).default

	let title = "nerixim.dev"
	let date = ""

	try {
		const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`)
		const source = await fs.readFile(filePath, "utf-8")
		const { data } = matter(source)
		title = data.title || title
		date = data.date || ""
	} catch {
		return new ImageResponse(
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					height: "100%",
					backgroundColor: "#1f2028",
					color: "#f0ede8",
					fontSize: "48px",
				}}
			>
				nerixim.dev
			</div>,
			{ ...size },
		)
	}

	const formattedDate = date
		? new Date(date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: ""

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				backgroundColor: "#1f2028",
				padding: "80px",
			}}
		>
			{/* Top accent line */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: "4px",
					background: "linear-gradient(90deg, #9ba0c0, #6b6f8e)",
				}}
			/>

			{/* Title */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "24px",
				}}
			>
				<div
					style={{
						fontSize: "52px",
						fontWeight: 700,
						color: "#f0ede8",
						lineHeight: 1.2,
						maxWidth: "900px",
					}}
				>
					{title}
				</div>
				{formattedDate && (
					<div
						style={{
							fontSize: "24px",
							color: "#9b9aaf",
							lineHeight: 1.5,
						}}
					>
						{formattedDate}
					</div>
				)}
			</div>

			{/* Branding */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "16px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "48px",
						height: "48px",
						borderRadius: "50%",
						backgroundColor: "#9ba0c0",
						color: "#1f2028",
						fontSize: "24px",
						fontWeight: 700,
					}}
				>
					N
				</div>
				<span
					style={{
						fontSize: "24px",
						color: "#9ba0c0",
						letterSpacing: "0.05em",
					}}
				>
					nerixim.dev
				</span>
			</div>
		</div>,
		{ ...size },
	)
}
