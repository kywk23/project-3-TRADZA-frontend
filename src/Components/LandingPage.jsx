import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <h1> Title/Image/Logo of our App </h1>
      <h1>welcome to the Landing Page</h1>
    </div>
  );
}

export default LandingPage;
