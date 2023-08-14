import { useEffect, useRef, useState, useContext } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useRecoilState } from 'recoil';
import { analysisRecordState } from '../../../recoil/Training';
import {
  Backdrop,
  CompleteBtn,
  NowRecording,
  PracticeEnd,
  PracticeStart,
  RecordBox,
  RecordBtn,
  RestartBtn,
  SectionBtn,
  StopWatch,
  Waves
} from './RecordButton.style';
import ConfirmContext from '/src/context/confirm/ConfirmContext';

function RecordButton() {
  const [analysisRecord, setAnalysisRecord] = useRecoilState(analysisRecordState)
  const [practiceStart, setPracticeStart] = useState(false)
  const [practiceEnd, setPracticeEnd] = useState(false)
  const [initialBtn, setInitialBtn] = useState(true)
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const stopRef = useRef<number | null>(null);
  const [stop, setStop] = useState(0);

  const {
    startRecording,
    stopRecording,
    clearBlobUrl,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl } = useReactMediaRecorder({
      audio: true,
      video: false,
      mediaRecorderOptions: {
        mimeType: 'audio/webm;codecs=opus',
      }
    });

  const { confirm: confirmComp } = useContext(ConfirmContext);
  const onConfirmClick = async (text: string) => {
    const result = await confirmComp(text);
    console.log("custom", result);
    return result;
  };

  const startOrStop = () => {
    if (!isRunning) {
      setIsRunning(true);

      // 녹음 시간
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      // 녹음 시간 20초 제한
      stopRef.current = setInterval(() => {
        setStop((prevTime) => prevTime + 1);
      }, 100);
    }
    else if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      clearInterval(stopRef.current);
      setIsRunning(false);
    }
    setInitialBtn(false)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setInitialBtn(true)
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${seconds.toString().padStart(2, '0')} : ${centiseconds.toString().padStart(2, '0')}`;
  };

  const addRecord = (mediaBlobUrl: string) => {
    setAnalysisRecord([mediaBlobUrl, ...analysisRecord.slice(0, 4)])
  }

  const changePracticeEnd = () => {
    setPracticeStart(false)
    setPracticeEnd(true)
  }

  const changePracticeStart = () => {
    setPracticeStart(true)
    setPracticeEnd(false)
  }

  // 녹음 시간 20초 제한
  useEffect(() => {
    if (stop === 200) {
      startOrStop()
      stopRecording()
      setPracticeStart(false)
      setPracticeEnd(false)
    }
  }, [stop])

  const openAlert = async () => {
    const nextAction = await onConfirmClick("녹음을 중단하시겠습니까?");
    if (nextAction) {
      startOrStop();
      stopRecording();
      pauseRecording();
      changePracticeStart();
    }
    return;
  }

  return (
    <RecordBox>
      <StopWatch>
        <span>{formatTime(time)}</span>
        <span> / 20 : 00</span>
      </StopWatch>

      <PracticeStart $practiceStart={practiceStart}>연습 시작</PracticeStart>
      <PracticeEnd $practiceEnd={practiceEnd}>연습 종료</PracticeEnd>
      <SectionBtn $IsRunning={isRunning}>
        {!initialBtn && !isRunning ?
          <RestartBtn
            onClick={() => {
              setStop(0)
              resetTimer()
              stopRecording()
              clearBlobUrl()
            }}>취소</RestartBtn> : ""}

        {initialBtn ?
          (<RecordBtn
            onClick={() => {
              startOrStop()
              startRecording()
              changePracticeEnd()
            }}
            onMouseEnter={() =>
              setPracticeStart(true)}
            onMouseLeave={() => {
              setPracticeStart(false)
              setPracticeEnd(false)
            }}
            src="/src/assets/Training/startbtn.png"></RecordBtn>) :
          isRunning ?
            (<NowRecording>
              <RecordBtn
                onClick={() => {
                  startOrStop()
                  stopRecording()
                  pauseRecording()
                  changePracticeStart()
                }}
                onMouseEnter={() =>
                  setPracticeEnd(true)}
                onMouseLeave={() => {
                  setPracticeStart(false)
                  setPracticeEnd(false)
                }}
                src="/src/assets/Training/stopbtn.png">
              </RecordBtn>
              <Waves />
            </NowRecording>) :
            (<RecordBtn
              onClick={() => {
                if (stop >= 200) {
                  alert("녹음을 완료/취소 해주세요")
                  return
                }
                startOrStop()
                resumeRecording()
                changePracticeEnd()
              }}
              onMouseEnter={() =>
                setPracticeStart(true)}
              onMouseLeave={() => {
                setPracticeStart(false)
                setPracticeEnd(false)
              }}
              src="/src/assets/Training/restartbtn.png"></RecordBtn>)
        }

        {!initialBtn && !isRunning ?
          <CompleteBtn
            onClick={() => {
              setStop(0)
              stopRecording()
              addRecord(mediaBlobUrl)
              resetTimer()
            }}>완료</CompleteBtn> : ""}
      </SectionBtn>
      {isRunning ? <Backdrop onClick={e => {
        e.stopPropagation();
        openAlert()
      }}></Backdrop> : <></>}
    </RecordBox>
  )
}
export default RecordButton