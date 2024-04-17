import { h } from 'preact';
import { formatBytes } from './helpers';
import DocumentIcon from "../assets/icons/DocumentIcon";
import XIcon from "../assets/icons/XIcon";

interface Props {
    name: string;
    progress: number | null;
    size: number;
    canRemove: boolean;
}

export function File({ name, progress, size, canRemove }: Props) {
    const handleClick = () => {
        // todo removing
    };

    return (
        <div class="flex flex-col px-3 py-3 font-light gap-3 rounded-lg border border-white whiteshadow">
            <div class="flex items-center gap-2">
                <div class="flex items-center bg-white p-2 rounded-[20%]">
                {/* <div class="flex items-center p-2"> */}
                    <DocumentIcon/>
                </div>
                <p>{name}</p>
                <p class="ml-auto text-neutral-400 whitespace-nowrap">{formatBytes(size)}</p>
                {canRemove && (
                    <button onClick={handleClick}>
                        <XIcon/>
                    </button>
                )}
            </div>
            {progress !== null && (
                <progress class="progressbar" value={progress} max={size}></progress>
            )}
        </div>
    );
};
