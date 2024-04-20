export const API_URL = "http://127.0.0.1:3000";
export const WEBSITE_URL = "http://localhost:5173";
export const COMMUNITY_URL = "https://t.me/cipherfiles";
export const FOOTER_QUOTE = `© ${new Date().getFullYear()} Resolute Systems. All rights reserved.`;
export const ABUSE_EMAIL = "abuse@cipherfiles.com";

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 B"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
