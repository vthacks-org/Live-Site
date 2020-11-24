import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import ResourceView from "../views/ResourceView"

import { MarkdownProps } from "../types"

const Resources: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: resources },
  },
}) => {
  return (
    <Layout title="Resources">
      <ResourceView resources={resources} />
    </Layout>
  )
}

export default Resources

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "resources" } } }) {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`
