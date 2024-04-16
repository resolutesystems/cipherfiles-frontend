import { h } from 'preact';
import { useState } from 'preact/hooks';

interface Props {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    restProps?: any; // lub inny typ, który będzie pasował do przekazywanych atrybutów HTML
}

export function Button({ text, onClick, disabled, restProps }: Props) {
    const [clazz, setClazz] = useState<string>("");

    const classString = `${clazz} whiteshadow text-white py-2 rounded-lg cursor-pointer border transition-colors ${disabled ? 'disabled:cursor-not-allowed' : ''}`;

    const inputProps = {
        onClick,
        class: classString,
        type: "submit",
        value: text,
        disabled,
        ...restProps
    };

    return h('input', inputProps);
}
