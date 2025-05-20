import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromptForm from "../components/PromptForm";
import PromptsListComponent from "../components/PromptList";

const HomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/login"); // Redirect to the login page
    }
  }, [navigate]);

  console.log("Username:", username);

  return (
    <>
      <h1>Welcome, {username}!</h1>
      <PromptForm></PromptForm>
      <PromptsListComponent></PromptsListComponent>
    </>
  );
};

export default HomePage;
