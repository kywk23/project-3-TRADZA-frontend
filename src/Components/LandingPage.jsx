import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tradiza from "../Assets/Tradiza.png";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img src={Tradiza} alt="Logo of our App" className="max-w-full mb-4" />
      <h1 className="font-bold text-6xl"></h1>
    </div>
  );
}

export default LandingPage;
