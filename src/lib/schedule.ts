import fs from "fs"
import path from "path"

import { IEvent } from "../interfaces"
import { readdir } from "./dirent"

export const loadSchedule = async (): Promise<IEvent[]> => {
  const dirents = readdir(path.join(process.cwd(), "content/schedule"))

  const schedule = await Promise.all(
    dirents.map(async dirent => {
      const { name } = dirent
      const filePath = path.join(process.cwd(), "content/schedule", name)

      const scheduleItemJSON = fs.readFileSync(filePath, "utf-8")

      return JSON.parse(scheduleItemJSON)
    })
  )

  return schedule
}

export const loadScheduleSorted = async (): Promise<IEvent[]> => {
  const schedule = await loadSchedule()

  const sortedSchedule = schedule.sort((a, b) => {
    const diff = new Date(a.start).getTime() - new Date(b.start).getTime()

    if (diff === 0) {
      return a.duration - b.duration
    }

    return diff
  })

  return sortedSchedule
}
