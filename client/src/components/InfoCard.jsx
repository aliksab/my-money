import { Card, CardBody } from "@windmill/react-ui";

const InfoCard = ({ id, title, value, icon, children }) => {
    return (
        <Card>
            <CardBody className="flex items-center justify-between">
                {icon}
                <div>
                    <p className="mb-2 text-m font-medium text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {value}
                    </p>
                </div>
                {children}
            </CardBody>
        </Card>
    );
};

export default InfoCard;
