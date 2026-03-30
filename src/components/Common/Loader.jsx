import LogoBpsB from "../svgs/LogoBpsB";
import LogoBpsP from "../svgs/LogoBpsP";
import LogoBpsS from "../svgs/LogoBpsS";

const Loader = () => {
  return (
    <div id="loader">
      <div className="column-progress">
        <section className="loading-progressbar"></section>
      </div>
      <div className="container-logo">
        <div className="z-5">
          {/* <img src="/images/logo/logo-bps-b.svg" alt="" className="img-b z-3" /> */}
          <LogoBpsB className="img-b z-3" />
        </div>
        <div className="z-4">
          {/* <img src="/images/logo/logo-bps-p.svg" alt="" className="img-p z-2" /> */}
          <LogoBpsP className="img-p z-3"/>
        </div>
        <div className="z-3">
          {/* <img src="/images/logo/logo-bps-s.svg" alt="" className="img-s z-1" /> */}
          <LogoBpsS className="img-s z-3"/>
        </div>
      </div>
    </div>
  );
};
export default Loader;
