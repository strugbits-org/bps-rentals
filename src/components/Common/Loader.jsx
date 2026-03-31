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
          <LogoBpsB className="img-b z-3" />
        </div>
        <div className="z-4">
          <LogoBpsP className="img-p z-2"/>
        </div>
        <div className="z-3">
          <LogoBpsS className="img-s z-1"/>
        </div>
      </div>
    </div>
  );
};
export default Loader;
