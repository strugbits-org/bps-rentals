import AnimateLink from "./AnimateLink";

export const CustomButton = ({ data, customClasses = "", attributes, target, showArrow = true }) => {
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    const actionType = data?.action
        ? isValidUrl(data.action)
            ? "external_link"
            : data.action.startsWith("/")
                ? "internal_link"
                : "modal"
        : null;
    const openMarketModal = () => {
        if (data.action === "modal-market") {
            document.querySelector("[data-set-submenu='market']")?.click();
        } else if (data.action === "chat-box") {
            const chat = document.querySelector(".chat");
            if (chat && !chat.classList.contains("active")) {
                setTimeout(() => {
                    chat.classList.add("active");
                }, 200);
            }
        }
    }
    return actionType === "modal" ? (
        <btn-modal-open
            onClick={openMarketModal}
            group={data.action}
            class={`${customClasses || 'btn-blue'} ${data.action === "modal-market" ? "disable-click-outside" : ''}`}
            {...attributes}
        >
            <span>{data.label}</span>
            {showArrow && <i className="icon-arrow-right-2"></i>}
        </btn-modal-open>
    ) : (
        <AnimateLink to={data.action} target={actionType === "external_link" && target !== "self" ? "_blank" : undefined}>
            <button className={customClasses || 'btn-blue'} data-cursor-style="off" {...attributes}>
                <span>{data.label}</span>
                {showArrow && <i className="icon-arrow-right"></i>}
            </button>
        </AnimateLink>
    )
}
