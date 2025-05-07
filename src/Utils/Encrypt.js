import crypto from 'crypto';
import logError from './ServerActions';
const algorithm = 'aes-256-cbc';

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

export const encryptField = (value, options = {}) => {
    try {
        if (typeof value === 'string') {
            const iv = options.useConsistentIV
                ? generateConsistentIV(value)
                : crypto.randomBytes(16);

            const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
            let encrypted = cipher.update(value, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return `${iv.toString('hex')}:${encrypted}`;
        }
        return value;
    } catch (error) {
        logError("Error encrypting field:", error);
        return value;
    }
};

// Generate a consistent IV based on the input value
const generateConsistentIV = (value) => {
    const hash = crypto.createHash('sha256').update(value).digest();
    return Buffer.from(hash.subarray(0, 16));
};

export const decryptField = (value) => {
    try {
        if (typeof value === 'string') {
            const [ivString, encryptedData] = value.split(':');
            const iv = Buffer.from(ivString, 'hex');
            const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        return value;
    } catch (error) {
        logError("Error decrypting field:", error);
        return value;
    }
};

export const encryptPriceFields = (obj, fieldsToEncrypt, options = {}) => {
    if (!obj) return;
    const encryptIfExists = (field) => {
        if (obj[field]) obj[field] = encryptField(obj[field].toString(), options);
    };

    fieldsToEncrypt.forEach(encryptIfExists);
};

export const decryptPriceFields = (obj, fieldsToDecrypt) => {
    if (!obj) return;
    const decryptIfExists = (field) => {
        if (obj[field]) obj[field] = decryptField(obj[field]);
    };

    fieldsToDecrypt.forEach(decryptIfExists);
};