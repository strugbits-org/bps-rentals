import AnimateLink from "./AnimateLink";

const SocialLinks = () => {
  return (
    <ul className="list-social-media">
      {/* {[1, 2, 3, 4].map((index) => {
        return (
          <li key={index}>
            <AnimateLink to="/#" target="_blank" rel="noopener noreferrer">
              <i className="icon-facebook"></i>
            </AnimateLink>
          </li>
        );
      })} */}
      <li>
        <AnimateLink to="/#" target="_blank" rel="noopener noreferrer">
          <i className="icon-facebook"></i>
        </AnimateLink>
      </li>
      <li>
        <AnimateLink to="/#" target="_blank" rel="noopener noreferrer">
          <i className="icon-instagram"></i>
        </AnimateLink>
      </li>
      <li>
        <AnimateLink to="/#" target="_blank" rel="noopener noreferrer">
          <i className="icon-x"></i>
        </AnimateLink>
      </li>
      <li>
        <AnimateLink to="/#" target="_blank" rel="noopener noreferrer">
          <i className="icon-linkedin"></i>
        </AnimateLink>
      </li>
    </ul>
  );
};

export default SocialLinks;
