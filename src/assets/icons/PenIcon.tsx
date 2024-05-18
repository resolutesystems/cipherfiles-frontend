interface Props {
    onClick: () => void;
}

const PenIcon = ({ onClick }: Props) => {
    return (
        <svg class={"w-6 h-6"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}>
            <path d="M17.6723 10.3132L18.1763 9.80978C19.2746 8.71126 19.2746 6.92311 18.1763 5.82389C17.0779 4.72537 15.2894 4.72537 14.191 5.82389L13.6877 6.32799L17.6723 10.3132ZM12.6971 7.31588L6.6992 13.3164L10.6844 17.3012L16.6823 11.3006L12.6971 7.31588ZM5.86995 18.9794L9.47926 18.0777L5.92316 14.5209L5.02083 18.1309C4.96133 18.3689 5.03133 18.6217 5.20494 18.7953C5.37854 18.9689 5.63125 19.0383 5.86995 18.9794Z" fill="white"/>
        </svg>
    );
};

export default PenIcon;
