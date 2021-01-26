import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import MarkdownView from "../views/MarkdownView"

import { MarkdownProps } from "../types"

const Ux: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: ux_events },
  },
}) => {
  return (
    <Layout title="UX Events">
      <MarkdownView templateKey="ux_events" list={ux_events} />
    </Layout>
  )
}

export default Ux

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "ux_events" } } }
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
