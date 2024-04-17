import { h } from 'preact';

interface Props {
    clazz?: string;
}

const DocumentIcon = ({ clazz }: Props) => {
    return (
        // TODO: w-4 h-4 testing
        // <svg class={`${clazz} w-4 h-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        //     <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
        //     <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        // </svg>
        <svg class={`${clazz} w-4 h-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" fill="currentColor">
            <path d="M21.6 3.6H12L10.2636 1.3272C9.8568 0.5136 9.0252 0 8.1168 0H1.2C0.5364 0 0 0.5364 0 1.2V18C0 19.3248 1.074 20.4 2.4 20.4H21.6C22.9248 20.4 24 19.3248 24 18V6C24 4.6752 22.9248 3.6 21.6 3.6Z" fill="black"/>
        </svg>

    );
};

export default DocumentIcon;
