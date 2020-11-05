import React from "react"

const DiscordComponent = ({ className, serverId }) => {
  return (
    <div className={className}>
      <iframe
        src={`https://discordapp.com/widget?id=${serverId}`}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  )
}

export default DiscordComponent
