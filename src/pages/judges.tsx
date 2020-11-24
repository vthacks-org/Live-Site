import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import JudgesView from "../views/JudgesView"

import { MarkdownProps } from "../types"

const Judges: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: judges },
  },
}) => {
  return (
    <Layout title="Judges">
      <JudgesView judges={judges} />
    </Layout>
  )
}

export default Judges

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "judges" } } }) {
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
