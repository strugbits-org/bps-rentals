const Addresses = () => {
  return (
    <ul className="list-address">
      {/* {[1, 2, 3].map((index) => {
        return (
          <li key={index}>
            <h3 className="city">Napa Valley</h3>
            <address>
              955 Vintage Ave <br />
              St. Helena, CA 94574
            </address>
            <div className="phones">
              <a href="tel:">
                <span>P / 707742.7777</span>
              </a>
              <a href="tel:">
                <span>F / 415.822.8844</span>
              </a>
            </div>
          </li>
        );
      })} */}
      <li>
        <h3 className="city">Napa Valley</h3>
        <address>
          955 Vintage Ave <br />
          St. Helena, CA 94574
        </address>
        <div className="phones">
          <a href="tel:">
            <span>P / 707742.7777</span>
          </a>
          <a href="tel:">
            <span>F / 415.822.8844</span>
          </a>
        </div>
      </li>
      <li>
        <h3 className="city">Las Vegas</h3>
        <address>
          7900 W Sunset RD <br />
          Suite 400 <br />
          Las Vegas, NV 89113
        </address>
        <div className="phones">
          <a href="tel:">
            <span>P / 702.757.7987</span>
          </a>
        </div>
      </li>
      <li>
        <h3 className="city">San Francisco</h3>
        <address>
          352 Shaw RD <br />
          S. San Francisco, CA 94080
        </address>
        <div className="phones">
          <a href="tel:">
            <span>P / 415.922.9004</span>
          </a>
          <a href="tel:">
            <span>F / 415.822.8844</span>
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Addresses;
