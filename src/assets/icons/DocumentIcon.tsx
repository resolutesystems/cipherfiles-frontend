interface Props {
    clazz?: string;
}

const DocumentIcon = ({ clazz }: Props) => {
    return (
        <svg class={`${clazz} w-4 h-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" fill="currentColor">
            <path d="M21.6 3.6H12L10.2636 1.3272C9.8568 0.5136 9.0252 0 8.1168 0H1.2C0.5364 0 0 0.5364 0 1.2V18C0 19.3248 1.074 20.4 2.4 20.4H21.6C22.9248 20.4 24 19.3248 24 18V6C24 4.6752 22.9248 3.6 21.6 3.6Z" fill="black"/>
        </svg>

    );
};

export default DocumentIcon;
