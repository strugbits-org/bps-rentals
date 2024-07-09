export const generateImageURL = ({
  wix_url,
  original = false,
  fit = "fill",
  q = "90",
  h = "1080",
  w = "1920",
}) => {
  if (
    wix_url &&
    (wix_url.startsWith("wix:image://v1/") ||
      wix_url.startsWith("wix:vector://v1/"))
  ) {
    const wixImageURL = wix_url.startsWith("wix:image://v1/")
      ? "https://static.wixstatic.com/media/"
      : "https://static.wixstatic.com/shapes/";
    const wixLocalURL = wix_url
      .replace("wix:image://v1/", "")
      .replace("wix:vector://v1/", "")
      .split("/")[0];
    const trimmedURL = wixLocalURL.replace("#", "");
    return (
      wixImageURL +
      trimmedURL +
      (original
        ? ""
        : `/v1/${fit}/w_${w},h_${h},al_c,q_${q},usm_0.66_1.00_0.01,enc_auto/compress.webp`)
    );
  } else {
    return wix_url;
  }
};

export const generateImageUrl2 = ({
  wix_url,
  original = false,
  fit = "fill",
  q = "90",
  h = "1080",
  w = "1920",
}) => {
  if (wix_url) {
    const src = wix_url.split("#")[0];
    if (
      src &&
      (src.startsWith("wix:image://v1/") || src.startsWith("wix:vector://v1/"))
    ) {
      const wixImageURL = src.startsWith("wix:image://v1/")
        ? "https://static.wixstatic.com/media/"
        : "https://static.wixstatic.com/shapes/";
      const wixLocalURL = src
        .replace("wix:image://v1/", "")
        .replace("wix:vector://v1/", "")
        .split("/")[1];
      return (
        wixImageURL +
        wixLocalURL +
        (original
          ? ""
          : `/v1/${fit}/w_${w},h_${h},al_c,q_${q},usm_0.66_1.00_0.01,enc_auto/compress.webp`)
      );
    } else {
      return src;
    }
  }
};
export const getFullSvgURL = (wix_url) => {
  if (!wix_url.startsWith("wix:vector://v1/")) {
    return wix_url;
  }
  let wixImageURL = "";
  wixImageURL = "https://static.wixstatic.com/shapes/";
  let splitUrl = wix_url.split("/");
  return wixImageURL + splitUrl[splitUrl.length - 2];
};

export const blogGalleryImageURL = ({
  wix_url,
  fit = "fill",
  q = "90",
  h = "1080",
  w = "1920",
}) =>
  `https://static.wixstatic.com/media/${wix_url}/v1/${fit}/w_${w},h_${h},al_c,q_${q},usm_0.66_1.00_0.01,enc_auto/compress.webp`;


  export const productImageURL = ({
    wix_url,
    fit = "fill",
    q = "90",
    h = "1080",
    w = "1920",
  }) =>
    `${wix_url}/v1/${fit}/w_${w},h_${h},al_c,q_${q},usm_0.66_1.00_0.01,enc_auto/compress.webp`;