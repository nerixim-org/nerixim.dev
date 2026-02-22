import { ExternalLink } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

function MdxLink(props: ComponentPropsWithoutRef<"a">) {
  const { href, children, ...rest } = props
  const isExternal = href?.startsWith("http")

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <ExternalLink className="ml-0.5 inline-block size-3.5 align-baseline" aria-hidden />
      </a>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

function MdxImage(props: ComponentPropsWithoutRef<"img">) {
  // biome-ignore lint/a11y/useAltText: alt is expected from MDX content
  return <img {...props} loading="lazy" />
}

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  )
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
  table: MdxTable,
}
