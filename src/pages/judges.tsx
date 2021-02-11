import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Judges: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: judges },
  },
}) => {
  return (
    <Layout title="Judges">
      <MarkdownView templateKey="judges" list={judges} />
    </Layout>
  )
}

export default Judges

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "judges" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            templateKey
            shouldDisplayTitle
            display
          }
        }
      }
    }
  }
`
