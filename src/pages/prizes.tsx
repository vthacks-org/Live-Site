import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Prizes: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: prizes },
  },
}) => {
  return (
    <Layout title="Prizes">
      <MarkdownView templateKey="prizes" list={prizes} />
    </Layout>
  )
}

export default Prizes

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "prizes" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            templateKey
            shouldDisplayTitle
          }
        }
      }
    }
  }
`
