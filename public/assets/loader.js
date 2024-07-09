class Preloader {
  constructor() {
    this.img = { total: 0, remaining: 0 };
    this.video = { total: 0, remaining: 0 };
  }

  preloadImages() {
    const imgs = Array.from(document.querySelectorAll("img[data-preload]")).filter(
      (el) => el instanceof HTMLImageElement && !el.complete
    );

    this.img.total = imgs.length;
    this.img.remaining = imgs.length;

    imgs.forEach((el) => {
      let evFired = false;
      el.addEventListener(
        "load",
        () => {
          el.dataset.loaded = true;
          if (!evFired) this.img.remaining--;
          evFired = true;
        },
        { once: true }
      );

      el.addEventListener(
        "error",
        () => {
          el.dataset.loaded = true;
          if (!evFired) this.img.remaining--;
          evFired = true;
        },
        { once: true }
      );
    });
  }

  preloadVideos() {
    const videos = document.querySelectorAll("video[data-preload]");
    this.video.total = videos.length;
    this.video.remaining = videos.length;

    videos.forEach((video) => {
      this.loadVideo(video);
    });
  }

  loadVideo(videoEl) {
    const req = new XMLHttpRequest();
    req.open("GET", videoEl.dataset.src, true);
    req.responseType = "blob";

    req.onload = () => {
      if (req.status === 200) {
        const videoBlob = req.response;
        const vidURL = URL.createObjectURL(videoBlob);
        videoEl.src = vidURL;
        videoEl.dataset.loaded = true;
        this.video.remaining--;

        if (videoEl.dataset.autoplay !== undefined) {
          setTimeout(() => {
            videoEl.play();
          }, 100);
        }
      }
    };

    req.onerror = () => {
      this.video.remaining--;
    };

    req.send();
  }

  startPreloading() {
    this.preloadImages();
    this.preloadVideos();
  }

  isPreloadingComplete() {
    return this.img.remaining === 0 && this.video.remaining === 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const preloader = new Preloader();
  preloader.startPreloading();
});
