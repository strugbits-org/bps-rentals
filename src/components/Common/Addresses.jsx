const Addresses = ({ data }) => {
  return (
    <ul className="list-address">
      {data.map((data, index) => {
        const {
          title,
          city,
          suite,
          streetAddress,
          state,
          zipCode,
          phoneNumber,
          faxNumber,
        } = data;
        return (
          <li key={index}>
            <h3 className="city">{title}</h3>
            <address>
              {streetAddress} <br />
              {suite && (
                <>
                  Suite {suite} <br />
                </>
              )}
              {city}, {state} {zipCode}
            </address>
            <div className="phones">
              <a href="tel:">
                <span>P / {phoneNumber}</span>
              </a>
              {faxNumber && (
                <a href="tel:">
                  <span>F / {faxNumber}</span>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Addresses;
