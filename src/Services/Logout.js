import { isAuthentiction } from "./isAuthentiction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthentiction()) {
      localStorage.removeItem("idToken");
    }
    navigate('/signin/student-Detail');
  }, [navigate]);

  return null;
 
};
export default Logout