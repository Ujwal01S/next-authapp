
import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";

const ErrorCard = () => {
    return ( 
        <Card>
            <CardHeader>
                <Header label="Opps! Something went wrong!" />
            </CardHeader>
            <CardFooter>
                <BackButton 
                href="/auth/login"
                label="Back to login"
                />
            </CardFooter>
        </Card>
     );
}
 
export default ErrorCard;