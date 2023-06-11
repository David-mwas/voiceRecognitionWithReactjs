import './App.css';
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faMicrophone,
    faMicrophoneSlash,
    faArrowRotateRight,
  } from "@fortawesome/free-solid-svg-icons";
function App() {

  const [value, setValue] = useState("");
  const { speak } = useSpeechSynthesis();

    const {
    transcript,
    listening,
    resetTranscript, 
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="relative w-[100vw] h-[100vh] flex items-center justify-center flex-col bg-black text-white py-[40px] px-[20px]">
      <h1 className="absolute  top-[35px] font-bold text-white/75 text-[30px]">
        VoiceToText
      </h1>

      <div className="flex flex-col justify-between items-start py-[15px] px-[20px] w-[100%] h-[300px] mb-[20px] shadow-shadow shadow-white-400 rounded-[10px] max-w-[600px]">

        <div className="flex w-[100%] items-center flex-col justify-center">
          <input
            onChange={(event) => setValue(event.target.value)}
            value={value || transcript}
            type="text"
            placeholder="enter text to convert"
            className="w-[100%] h-[40px] outline-none border-[2px] border-gray-500 bg-black p-[5px] rounded-[10px]"
          />

          <input
            onClick={() => speak({ text: value})}
            type="submit"
            value="convert"
            className="bg-red-500 rounded-lg w-[40%] h-[30px] p-[5px] mt-[20px] uppercase font-bold text-white/75"
          />
        </div>
      </div>

      <div className="mt-[50px]">
        <button onClick={SpeechRecognition.startListening} className="m-4">
          <FontAwesomeIcon
            icon={faMicrophone}
            className={`text-[30px] hover:text-gray-400 hover:transform hover:scale-[1.3] ${
              listening ? "text-red-500 animate-ping" : ""
            }`}
          />
          <p className="text-red-500 text-sm">StartRecord</p>
        </button>

        <button onClick={SpeechRecognition.stopListening} className="m-4">
          <FontAwesomeIcon
            icon={faMicrophoneSlash}
            className="text-[30px] hover:text-gray-400 hover:transform hover:scale-[1.3]"
          />
          <p className="text-red-500 text-sm">StopRecord</p>
        </button>

        <button onClick={resetTranscript}>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className="text-[30px] hover:text-gray-400 hover:transform hover:scale-[1.3]"
          />
          <p className="text-red-500 text-sm">Reload</p>
        </button>
      </div>
    </div>
  );
}

export default App;
