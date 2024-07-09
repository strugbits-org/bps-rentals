function RenderVideo(videoSRC) {
  if (videoSRC && videoSRC.startsWith("wix:video://v1/")) {
    const videoID = videoSRC.replace("wix:video://v1/", "").split("/")[0];
    return `https://video.wixstatic.com/video/${videoID}/file`;
  } else {
    return videoSRC;
  }
}

export default RenderVideo;
