import fs from "fs"
import path from "path"

export const readdir = (dir: string): fs.Dirent[] => {
  const dirents = fs.readdirSync(dir, {
    withFileTypes: true,
    encoding: "utf-8",
  })

  return dirents
}
