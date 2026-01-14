import { createWixClient } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { NextResponse } from "next/server";

// Honeypot field name - bots will fill this hidden field
const HONEYPOT_FIELD = "website_url";

// Enable spam logging for analysis (set to true to log spam attempts)
const LOG_SPAM_ATTEMPTS = true;

/**
 * Check if submission is spam based on honeypot field
 * @param {Object} data - Form submission data
 * @returns {boolean} - True if spam detected
 */
const isSpamSubmission = (data) => {
    return data[HONEYPOT_FIELD] && data[HONEYPOT_FIELD].trim() !== "";
};

/**
 * Log spam attempt to Wix SpamLogs collection
 * @param {string} formName - Name of the form
 * @param {Object} data - Spam submission data
 */
const logSpamAttempt = async (formName, data) => {
    if (LOG_SPAM_ATTEMPTS) {
        try {
            const wixClient = await createWixClient();

            await wixClient.items.insert("SpamLogs", {
                title: "Rentals",
                formData: data,
                formType: formName,
                timestamp: new Date().toISOString(),
            });

        } catch (error) {
            // Log to console as fallback if Wix insert fails
            console.error("[SPAM LOG ERROR] Failed to save spam log to Wix:", error.message);
            console.warn(`[SPAM DETECTED] Form: ${formName}`, {
                timestamp: new Date().toISOString(),
                formData: data,
            });
        }
    }
};

export const POST = async (req, { params }) => {
    const { name } = params;

    try {
        const wixClient = await createWixClient();

        if (name === "contact" || name === "newsletter") {
            const id = name === "contact" ? process.env.WIX_CLIENT_CORPORATE_CONTACT_FORM_ID : process.env.WIX_CLIENT_CORPORATE_NEWSLETTER_ID;
            const data = await req.json();

            // Honeypot spam detection
            if (isSpamSubmission(data)) {
                await logSpamAttempt(name, data);
                // Return success to not alert bots, but don't process the submission
                return NextResponse.json({
                    message: "Submission received",
                    _isSpam: true // Internal flag, not exposed to client in production
                }, { status: 200 });
            }

            // Remove honeypot field before submitting to Wix
            const { [HONEYPOT_FIELD]: honeypot, ...cleanData } = data;

            const response = await wixClient.submissions.createSubmission({
                formId: id,
                status: "CONFIRMED",
                submissions: cleanData,
            });
            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json({
                message: "Error in POST method: Invalid request",
                body: req.body,
            }, { status: 400 });
        }
    } catch (error) {
        logError("Error in form submission:", error);
        return NextResponse.json({
            message: error.message,
            body: req.body,
        }, { status: 500 });
    }
};
