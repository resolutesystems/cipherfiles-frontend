import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
    text: string;
    onClick?: (event: Event) => void;
    disabled?: boolean;
    restProps?: any;
}

export function Button({ text, onClick, disabled, restProps }: Props) {
    const [clazz] = useState<string>("");

    const classString = `${clazz} whiteshadow text-white py-2 rounded-lg cursor-pointer border transition-colors ${disabled ? 'disabled:cursor-not-allowed' : ''}`;

    const handleClick = (event: Event) => {
        if (onClick) {
            onClick(event);
        }
    };

    const inputProps = {
        onClick: handleClick,
        class: classString,
        type: "submit",
        value: text,
        disabled,
        ...restProps
    };

    return h('input', inputProps);
}
