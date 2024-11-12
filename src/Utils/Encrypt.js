import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

export const encryptField = (value) => {
    if (typeof value === 'string') {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        let encrypted = cipher.update(value, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }
    return value;
};

export const decryptField = (value) => {
    if (typeof value === 'string') {
        const [ivString, encryptedData] = value.split(':');
        const iv = Buffer.from(ivString, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    return value;
};

export const encryptPriceFields = (obj, fieldsToEncrypt) => {
    if (!obj) return;
    const encryptIfExists = (field) => {
        if (obj[field]) {
            obj[field] = encryptField(obj[field].toString());
        }
    };

    fieldsToEncrypt.forEach(encryptIfExists);
};