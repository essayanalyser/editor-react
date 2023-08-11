import Editor from "./components/Editor/Editor"
import Statistics from "./components/Statistics/Statistics"
import Auth from "./components/Auth/Auth"; // Update the path to auth.js if needed
import './stylesheets/home.css'

function App() {
  return (
    <div id='home'>
      <Editor />
      <Statistics />
    </div>
  );
}

export default App;
