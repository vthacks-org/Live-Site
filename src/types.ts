import { MarkdownContent } from "./interfaces"

export type MarkdownProps = {
  data: {
    allMarkdownRemark: {
      edges: [MarkdownContent]
    }
  }
}
