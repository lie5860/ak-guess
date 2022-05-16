import {React, ReactRouterDOM} from './global'
import Home from "@/pages/home";
import DoQuest from "@/pages/doQuest";
import PostQuest from "@/pages/postQuest";

const {HashRouter, Route} = ReactRouterDOM;

export default function App() {
  return (
    <HashRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/postQuest" exact component={PostQuest}/>
      <Route path="/doQuest" exact component={DoQuest}/>
    </HashRouter>
  )
}
