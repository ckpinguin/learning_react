import { useEffect, useReducer } from "react"

import "./App.css"

import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Footer from "./Footer"
import Timer from "./Timer"
import { useQuiz } from "../contexts/QuizContext"

// status can be: "loading, "error", "ready", 'active', 'finished'

export default function App() {
  const { status, questions, index } = useQuiz()

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress index={index} />
            <Question question={questions[index]} />
            <Footer>
              <Timer />
              <NextButton index={index} />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  )
}
