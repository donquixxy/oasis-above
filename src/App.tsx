import HomePage from "./pages/home";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="background">
      <Toaster />
      <HomePage></HomePage>
    </div>
  );
}

export default App;
