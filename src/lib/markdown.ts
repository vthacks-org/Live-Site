import dynamic from "next/dynamic"
import path from "path"
import config from "../config.json"
import fs from "fs"
import { readdir } from "./dirent"
import matter from "gray-matter"
import { Markdown } from "../interfaces"

export const loadMarkdown = async (
  path
): Promise<matter.GrayMatterFile<string>> => {
  const rawMarkdown = fs.readFileSync(path, "utf8").toString()
  const data: matter.GrayMatterFile<string> = matter(rawMarkdown)

  return data
}

// export const loadMarkdownSorted = async (): Promise<string> => {}

export enum MarkdownPage {
  GETTING_STARTED = "getting-started",
  JUDGES = "judges",
  PRIZES = "prizes",
  RESOURCES = "resources",
  SPONSORS = "sponsors",
  SUBMISSION_GUIDELINES = "submission-guidelines",
}

export const loadMarkdownPage = async (
  page: MarkdownPage
): Promise<Markdown[]> => {
  let dirpath: string
  let route: string
  const cwd = process.cwd()

  switch (page) {
    case MarkdownPage.GETTING_STARTED:
      route = MarkdownPage.GETTING_STARTED

      break
    case MarkdownPage.JUDGES:
      route = MarkdownPage.JUDGES

      break
    case MarkdownPage.PRIZES:
      route = MarkdownPage.PRIZES

      break

    case MarkdownPage.RESOURCES:
      route = MarkdownPage.RESOURCES

      break
    case MarkdownPage.SPONSORS:
      route = MarkdownPage.SPONSORS

      break
    case MarkdownPage.SUBMISSION_GUIDELINES:
      route = MarkdownPage.SUBMISSION_GUIDELINES

      break
    default:
      throw new Error(`Unknown markdown page: ${page}`)
  }
  dirpath = path.join(cwd, "content", route)

  const dirents = readdir(dirpath)

  const markdown: matter.GrayMatterFile<string>[] = await Promise.all(
    dirents.map(async (dirent) => {
      const { name } = dirent

      const filePath = path.join(dirpath, name)

      const markdownFile = loadMarkdown(filePath)

      return markdownFile
    })
  )
  //@ts-ignore
  const sanitizedMarkdown: Markdown[] = markdown.map((item) => ({
    data: item.data,
    content: item.content,
  }))

  return sanitizedMarkdown
}
