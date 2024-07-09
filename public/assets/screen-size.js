const screen = {
  isPhone: false,
  isTablet: false,
  isMobile: false,
  isDesktop: false,
  isPhonePlus: false,
  isIphone: false,
  isSafariDesktop: false,
  isMacChrome: false,
  isMac: false,
  isFirefox: false,
  size: "",
  width: 0,
  height: 0,
  tresholdPhone: 768,
  tresholdTablet: 1025,
  isIpadPro: false
};
const uA = navigator.userAgent;
const vendor = navigator.vendor;
const isIpadPro = () => {
  return /Macintosh/.test(uA) && "ontouchend" in document;
};
const isMobileUserAgent = /iPhone|iPad|iPod|Android/i.test(uA) || isIpadPro();
screen.isSafariDesktop = /Safari/i.test(uA) && /Apple Computer/.test(vendor) && !/Mobi|Android/i.test(uA);
screen.isMac = navigator.userAgent.indexOf("Mac OS X") != -1;
screen.isIphone = navigator.userAgent.match(/iPhone/i);
screen.isIpadPro = isIpadPro();
if (screen.isMac && window.chrome) {
  screen.isMac = false;
  screen.isMacChrome = true;
}
screen.isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const size = function() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  screen.isPhone = w < screen.tresholdPhone;
  screen.isTablet = w >= screen.tresholdPhone && w <= screen.tresholdTablet || screen.isIpadPro;
  screen.isMobile = w <= screen.tresholdTablet || isMobileUserAgent;
  screen.isDesktop = w >= screen.tresholdTablet && !screen.isIpadPro;
  screen.phonePlus = w >= screen.tresholdPhone;
  if (screen.isPhone)
    screen.size = "phone";
  if (screen.isTablet)
    screen.size = "tablet";
  if (screen.isDesktop)
    screen.size = "desktop";
  screen.width = w;
  screen.height = h;
};
window.addEventListener("resize", size);
size();
export {
  screen as s
};
