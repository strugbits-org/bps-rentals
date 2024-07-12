import AnimateLink from "./AnimateLink";

const SocialLinks = ({ data }) => {
  return (
    <ul className="list-social-media">
      {data.map((data, index) => {
        const { iconClass, link } = data;
        return (
          <li key={index}>
            <AnimateLink to={link} target="_blank" rel="noopener noreferrer">
              <i className={iconClass}></i>
            </AnimateLink>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
