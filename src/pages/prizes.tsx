import { graphql } from "gatsby"
import React from "react"
import PrizesView from "../views/PrizesView"
import Layout from "../components/layout"

import { MarkdownProps } from "../types"

const Prizes: React.FC<MarkdownProps> = ({
  data: {
    allMarkdownRemark: { edges: prizes },
  },
}) => {
  return (
    <Layout title="Prizes">
      <PrizesView prizes={prizes} />
    </Layout>
  )
}

export default Prizes

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { title: { eq: "prizes" } } }) {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`
