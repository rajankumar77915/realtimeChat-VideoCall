import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Logged out");
        localStorage.clear();
        navigate(`/app1`);
    }, [navigate]);

    return null;
}

export default Logout;
