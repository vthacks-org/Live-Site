import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Resources: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: resources },
  },
}) => {
  return (
    <Layout title="Resources">
      <MarkdownView templateKey="resources" list={resources} />
    </Layout>
  )
}

export default Resources

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "resources" } } }
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
