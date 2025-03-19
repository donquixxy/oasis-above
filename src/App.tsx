import HomePage from "./pages/home";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { useCookie } from "./hooks/cookies";

function App() {
  const session = useCookie();

  session.setSessionID();

  return (
    <div className="background">
      <Toaster />
      <HomePage></HomePage>
    </div>
  );
}

export default App;
