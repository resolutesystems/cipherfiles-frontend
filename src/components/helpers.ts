import { useEffect } from "preact/hooks";

export const API_URL = "http://127.0.0.1:3000";
export const WEBSITE_URL = "http://127.0.0.1:5173";
export const COMMUNITY_URL = "https://discord.gg/DmRhftYcvN";
export const FOOTER_QUOTE = `© ${new Date().getFullYear()} Resolute Systems. All rights reserved.`;
export const ABUSE_EMAIL = "abuse@cipherfiles.com";
// For FooterWithFounders.tsx
export const STAN_SOCIAL = "https://github.com/stanislawkuriata";
export const HITO_SOCIAL = "https://github.com/HitoIRL";

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 B"

    const k = 1024 
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};