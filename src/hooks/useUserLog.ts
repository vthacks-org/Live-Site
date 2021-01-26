import { useEffect, useState } from "react"

function useUserLog(): [boolean, (val: boolean) => void] {
  const initialValue =
    window.localStorage.getItem("newcomer") === "true" ||
    window.localStorage.getItem("newcomer") === null
      ? true
      : false
  console.log(initialValue)
  const [newcomer, setValue] = useState(initialValue)
  const setNewcomer = (val: boolean) => {
    if (val) {
      window.localStorage.setItem("newcomer", "true")
    } else {
      window.localStorage.setItem("newcomer", "false")
    }

    setValue(val)
  }
  return [newcomer, setNewcomer]
}

export default useUserLog
