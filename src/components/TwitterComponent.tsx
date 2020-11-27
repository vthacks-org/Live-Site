import React, { useEffect } from "react"

const TwitterComponent = ({ limit, account, theme, className, alt }) => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    document.getElementsByClassName(className)[0].appendChild(script)
  }, [])

  if (theme !== "light" || theme !== "dark") {
    theme = "light"
  }
  if (alt === "") {
    alt = `Tweets by ${account}`
  }
  return (
    <div className={className}>
      <a
        className="twitter-timeline"
        data-theme={theme}
        data-tweet-limit={limit}
        data-chrome="noheader nofooter noborders"
        href={`https://twitter.com/${account}`}
      >
        {alt}
      </a>
    </div>
  )
}

export default TwitterComponent
