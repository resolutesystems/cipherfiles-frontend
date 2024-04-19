import { formatBytes } from './helpers';
import DocumentIcon from "../assets/icons/DocumentIcon";
import XIcon from "../assets/icons/XIcon";

interface Props {
    name: string;
    progress: number | null;
    size: number;
    canRemove: boolean;
    onRemove: () => void;
}

export function File({ name, progress, size, canRemove, onRemove }: Props) {
    const lastDotIndex = name.lastIndexOf('.');
    let fileNameWithoutExtension = name;
    let fileExtension = '';

    if (lastDotIndex !== -1 && lastDotIndex < name.length - 2) {
        fileNameWithoutExtension = name.slice(0, lastDotIndex);
        fileExtension = name.slice(lastDotIndex + 1);
    }

    let formattedName = fileNameWithoutExtension;
    const maxNameLength = 20;
    if (fileNameWithoutExtension.length > maxNameLength) {
        const remainingChars = maxNameLength - 5;
        formattedName = `${fileNameWithoutExtension.slice(0, remainingChars)}....`;
    }

    return (
        <div class="flex flex-col px-3 py-3 font-light gap-3 rounded-lg border border-white whiteshadow">
            <div class="flex items-center gap-2">
                <div class="flex items-center bg-white p-2 rounded-[20%]">
                    <DocumentIcon/>
                </div>
                <p>{formattedName}{fileExtension && `.${fileExtension}`}</p>
                <p class="ml-auto text-neutral-400 whitespace-nowrap">{formatBytes(size)}</p>
                {canRemove && (
                    <button onClick={onRemove}>
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

