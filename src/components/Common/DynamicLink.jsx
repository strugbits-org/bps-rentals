import AnimateLink from "./AnimateLink";

export const DynamicLink = ({ data, customClasses = "" }) => {

    let actionType;
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    if (data && data.action) {
        const urlString = data.action;
        if (isValidUrl(urlString)) {
            actionType = "external_link";
        } else if (urlString.startsWith("/")) {
            actionType = "internal_link";
        } else {
            actionType = "modal";
        };
    };

    return actionType === "modal" ? (
        <button data-set-submenu={data.action} className={customClasses} >
            <span>{data.label}</span>
        </button>
    ) : (
        <AnimateLink to={data.action} target={actionType === "external_link" ? "_blank" : undefined} className={customClasses}>
            <span>{data.label}</span>
        </AnimateLink>
    )
}