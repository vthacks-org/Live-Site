import React from "react"

const FacebookComponent = () => {
  const iFrame =
    '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F352591338216701&width=1200&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=435" scrolling="yes" style="border:none; overflow:hidden; width:600px; height:430px; background: white;  " allowtransparency="true" frameborder="0"></iframe>'
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: iFrame }}></div>
    </div>
  )
}

export default FacebookComponent
