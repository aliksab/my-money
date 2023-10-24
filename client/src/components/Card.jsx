const Card = ({ children }) => {
    return (
        <div className="rounded flex flex-col">
            <div className="flex flex-col items-center">{children}</div>
        </div>
    );
};

export default Card;
