import { useState } from "react";
import {useRoutes} from "react-router-dom";
import ViewCreator from "./Pages/ViewCreator";
import ErrorPage from "./Pages/ErrorPage";
import {RevertedButton} from "./Components/Button";
import DialogBox from "./Components/DialogBox";
import { DeleteIcon } from "./utils/iconProvider";
import AddCreator from "./Pages/AddCreator";
import SuccessBox from "./Components/SuccessBox";
import ErrorBox from "./Components/ErrorBox";
import ShowAllCreator from "./Pages/ShowAllCreator";
import LandingPage from "./Pages/LandingPage";
import Quiz from "./Pages/Quiz";

function App() {
  const [count, setCount] = useState(0)
  const [description, setDescription] = useState("John Doe is a passionate content creator focused on technology, web development, and gaming. He enjoys breaking down complex topics into simple, easy-to-understand ideas for beginners and aspiring developers. Through consistent learning and experimentation, he shares practical tips, real-world projects, and insights into modern tools and frameworks. His goal is to inspire curiosity, creativity, and confidence while helping others grow their skills and stay motivated in the fast-changing tech world.")

  return useRoutes([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/view/:creatorId",
      element: <ViewCreator/>
    },
    {
      path: "*",
      element: <ErrorPage/>
    },
    {
      path: "/edit/:creatorId",
      element: <AddCreator purpose="Update"/>
    },
    {
      path: "/new/:creatorId",
      element: <AddCreator purpose="Add"/>
    },
    {
      path: "/takequiz",
      element: <Quiz/>
    }
  ])
}

export default App
