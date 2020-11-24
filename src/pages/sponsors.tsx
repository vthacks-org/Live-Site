import { graphql } from "gatsby"
import React from "react"
import SponsorsView from "../views/SponsorsView"
import Layout from "../components/layout"

import { MarkdownProps } from "../types"

const Sponsors: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: sponsors },
  },
}) => {
  return (
    <Layout title="Sponsors">
      <SponsorsView sponsors={sponsors} />
    </Layout>
  )
}

export default Sponsors

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "sponsors" } } }) {
      edges {
        node {
          id
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
