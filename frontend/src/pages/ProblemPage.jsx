import { useState, useEffect } from 'react'
import { Form, useNavigate, useParams } from 'react-router'
import { PROBLEMS } from '../data/problems'
import Navbar from '../components/Navbar'
import OutputPanel from '../components/OutputPanel'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import CodeEditorPanel from '../components/CodeEditorPanel'
import ProblemDescription from '../components/ProblemDescription'
import { executeCode } from '../lib/piston'

import toast from "react-hot-toast"
import confetti from "canvas-confetti";


function ProblemPage() {
    const { id } =  useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    useEffect(() => {
      if (id && PROBLEMS[id]) {
        setCurrentProblemId(id);
        setCode(PROBLEMS[id].starterCode[selectedLanguage]);
        setOutput(null)
      }
    }, [id, selectedLanguage])
    console.log("PROBLEMS: ",PROBLEMS[id].id)

    const handelLanguageChange = (e) => {
      const newLang = e.target.value
      setSelectedLanguage(newLang)
      setCode(currentProblem.starterCode[newLang])
      setOutput(null)
    };

    const handelProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

    const triggerConfetti = () => {
      confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
      });

      confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
      });
    };

    const normalizeOutput = (output) => {
      // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
    }

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
      const normalizeActual = normalizeOutput(actualOutput)
      const normalizeExpected = normalizeOutput(expectedOutput);
      return normalizeActual == normalizeExpected
    }

    const handelRunCode = async () => {
      setIsRunning(true)
      setOutput(null)

      const result = await executeCode(selectedLanguage, code)
      setOutput(result)
      setIsRunning(false)

      // check if code executed successfully and matches executed output

      if(result.success){
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput)

        if (testsPassed) {
          triggerConfetti();
          toast.success("All tests passed! Great job")
        }else {
        toast.error("Tests failed. Check your output!");
        }
      }else {
      toast.error("Code execution failed!");
      }
    };
  return <div className='h-screen bg-base-100 flex flex-col'>
    <Navbar/>

    <div className='flex-1'>
      <PanelGroup direction='horizontal'>
        <Panel defaultSize={40} minSize={30}>
          {/* left panel- problem desc */}
          <ProblemDescription 
            problem={currentProblem} // two sum problem, not id
            currentProblemId={currentProblemId}
            onProblemChange={handelProblemChange}
            allProblems={Object.values(PROBLEMS)}
          />
        </Panel>

        <PanelResizeHandle className='w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize'/>

        <Panel defaultSize={40} minSize={30}>
          {/* right panel- problem desc */}
          <PanelGroup direction='vertical'>
            {/* Top panel - code editor */}
            <Panel defaultSize={30} minSize={30}>
              <CodeEditorPanel
                selectedLanguage={selectedLanguage}
                code={code}
                isRunning={isRunning}
                onLanguageChange={handelLanguageChange}
                onCodeChange={setCode}
                onRunCode={handelRunCode}
              />
            </Panel>

            <PanelResizeHandle className='h-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize'/>

            {/* Bottom panel - output panel */}
            <Panel defaultSize={30} minSize={30}>
              <OutputPanel output={output}/>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  </div>
}

export default ProblemPage