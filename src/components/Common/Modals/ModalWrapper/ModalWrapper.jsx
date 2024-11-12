export const ModalWrapper = ({ children, name, no_wrapper = false, onClose }) => {

    return (
        <modal-group name={name} data-cursor-style="default">
            <modal-container>
                <modal-item>
                    {no_wrapper ? (
                        <>
                            {children}
                            <btn-modal-close onClick={onClose} data-cursor-style="off"></btn-modal-close>
                        </>
                    ) : (
                        <section className="section-modal-contact">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-10 offset-lg-1 column-contact">
                                        <div className="row contact-info">
                                            {children}
                                        </div>

                                        <btn-modal-close onClick={onClose} data-cursor-style="default">
                                            <i className="icon-close"></i>
                                            <i className="icon-arrow-left"></i>
                                            <span className="text-go-back no-desktop">Go back</span>
                                            <span className="text-hide">close</span>
                                        </btn-modal-close>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </modal-item>
            </modal-container>
        </modal-group>
    )
}
