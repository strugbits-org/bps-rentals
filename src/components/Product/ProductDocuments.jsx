import useUserData from "@/Hooks/useUserData";
import { updatedWatched } from "@/Utils/AnimationFunctions";
import { ATTACHMENT_TYPES, PERMISSIONS } from "@/Utils/Schema/permissions";
import { trackEvent } from "@/Utils/Analytics";
import { useEffect, useState, useCallback } from "react";

export const ProductDocuments = ({ selectedProductDetails, attachmentTypes }) => {
    const { permissions } = useUserData();
    const SHOW_FIREPROOF_CERTIFICATES = permissions?.includes(PERMISSIONS.SHOW_FIREPROOF_CERTIFICATES);
    const SHOW_DOCUMENTS = permissions?.includes(PERMISSIONS.SHOW_DOCUMENTS);
    const [productDocuments, setProductDocuments] = useState([]);

    const setInitialValues = useCallback(() => {
        if (!SHOW_DOCUMENTS && !SHOW_FIREPROOF_CERTIFICATES) {
            setProductDocuments([]);
            return;
        }

        const docs = selectedProductDetails?.productDocuments;
        if (!Array.isArray(docs)) {
            setProductDocuments([]);
            return;
        }

        const filteredDocuments = docs.filter(doc => {
            if (doc.attachmentType === ATTACHMENT_TYPES.FIREPROOF) {
                return SHOW_FIREPROOF_CERTIFICATES;
            }
            return SHOW_DOCUMENTS;
        });

        const availableAttachmentTypes = [...new Set(filteredDocuments.map(doc => doc.attachmentType))];

        const filteredAttachmentTypes = attachmentTypes
            .filter(type => availableAttachmentTypes.includes(type.value))
            .sort((a, b) => a.orderNumber - b.orderNumber);

        const documents = filteredAttachmentTypes
            .map(type => {
                const attachments = filteredDocuments.filter(doc => doc.attachmentType === type.value);
                return attachments.length > 0 ? { title: type.title, attachments } : null;
            })
            .filter(Boolean);

        setProductDocuments(documents);
        updatedWatched();
    }, [SHOW_FIREPROOF_CERTIFICATES, SHOW_DOCUMENTS, selectedProductDetails, attachmentTypes]);

    useEffect(() => {
        setInitialValues();
    }, [setInitialValues]);

    if (!productDocuments.length) {
        return null;
    }

    return (
        <>
            {productDocuments.map((document, index) => {
                const { title, attachments } = document;
                return (
                    <div key={`doc-group-${index}`} className="container-info-text" data-aos="">
                        <h3 className="title-info-text" data-aos="">
                            {title}
                        </h3>
                        <div
                            className="container-btn container-btn-downloads"
                            data-aos="fadeIn .8s ease-in-out"
                        >
                            {attachments.map((data, i) => {
                                const { fileName, downloadUrl, attachmentType } = data;
                                return (
                                    <a
                                        key={`${index}-${i}-${fileName}`}
                                        href={downloadUrl}
                                        download={fileName}
                                        onClick={() =>
                                            trackEvent("file_download", {
                                                file_name: fileName,
                                                file_type: attachmentType || "",
                                                product_name: selectedProductDetails?.product?.name || "",
                                                product_slug: selectedProductDetails?.product?.slug || "",
                                            })
                                        }
                                    >
                                        <button className="btn-small-tag">
                                            <span>{fileName}</span>
                                            <i className="icon-arrow-down"></i>
                                        </button>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};