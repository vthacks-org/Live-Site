import React, { useEffect } from "react"

const TwitterComponent = ({ limit, account, theme, className, alt }) => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  if (theme !== "light" || theme !== "dark") {
    theme = "light"
  }
  if (alt === "") {
    alt = `Tweets by ${account}`
  }
  return (
    <section className={className}>
      <div className="twitter-embed">
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
    </section>
  )
}

export default TwitterComponent
