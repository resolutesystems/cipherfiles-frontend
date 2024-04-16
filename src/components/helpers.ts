export const API_URL = "http://127.0.0.1:8000";
export const SELF_URL = "http://127.0.0.1:5173";

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 B"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}