import { MarkdownContent } from "./interfaces"

export type MarkdownProps = {
  data: {
    allMarkdownRemark: {
      edges: [MarkdownContent]
    }
  }
}

export type EffectCallback = () => void | (() => void | undefined)
