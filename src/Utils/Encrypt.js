import crypto from 'crypto';
import logError from './ServerActions';
const algorithm = 'aes-256-cbc';

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

export const encryptField = (value) => {
    try {
        if (typeof value === 'string') {
            const iv = crypto.randomBytes(16);
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

export const encryptPriceFields = (obj, fieldsToEncrypt) => {
    if (!obj) return;
    const encryptIfExists = (field) => {
        if (obj[field]) obj[field] = encryptField(obj[field].toString());
    };

    fieldsToEncrypt.forEach(encryptIfExists);
};

export const decryptPriceFields = (obj, fieldsToEncrypt) => {
    if (!obj) return;
    const decryptIfExists = (field) => {
        if (obj[field]) obj[field] = decryptField(obj[field]);
    };

    fieldsToEncrypt.forEach(decryptIfExists);
};

export const decryptProductData = (data) => {
    const fieldsToDecrypt = [
        'formattedDiscountedPrice',
        'pricePerUnitData',
        'pricePerUnit',
        'formattedPricePerUnit',
        'formattedPrice',
        'price',
        'discountedPrice',
    ];

    if (data.data?.productSets?.length) {
        data.data.productSets = data.data.productSets.map(set => {
            set.price = decryptField(set.price);
            return set;
        });
    }
    if (data.data.variantData) {
        data.data.variantData = data.data.variantData.map(val2 => {
            decryptPriceFields(val2.variant, fieldsToDecrypt);
            return val2;
        });
    }
    decryptPriceFields(data.data.product, fieldsToDecrypt);
    return data;
}