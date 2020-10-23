import React, { useEffect } from "react"

const TwitterComponent = ({ limit, account }) => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    document.getElementsByClassName("twitter-embed")[0].appendChild(script)
  }, [])

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-theme="light"
          data-tweet-limit={limit}
          data-chrome="noheader nofooter noborders"
          href={`https://twitter.com/${account}`}
        >
          Tweets by VT_Hacks
        </a>
      </div>
    </section>
  )
}

export default TwitterComponent
