import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "오랜만에 만난 여자친구(남자친구)가 입고 나온 옷의 색은?",
    options: ["빨강", "분홍", "하늘색", "연보라"],
    colors: ["#FF4B4B", "#FF92C2", "#81E3F9", "#CAB7FF"]
  },
  {
    q: "중요한 면접에서 면접관이 입고 있는 넥타이의 색은?",
    options: ["노랑", "남색", "검정", "초록"],
    colors: ["#FFE066", "#304CB2", "#222222", "#53E57B"]
  },
  {
    q: "슬픈 날 혼자 앉아있는 방 커튼의 색은?",
    options: ["흰색", "회색", "남색", "보라"],
    colors: ["#FFFFFF", "#BDBDBD", "#304CB2", "#9B4BFF"]
  },
  {
    q: "새로 이사 간 집에서 처음 본 현관문의 색은?",
    options: ["파랑", "베이지", "초록", "갈색"],
    colors: ["#4B7BFF", "#FFF3C2", "#53E57B", "#9B7B4B"]
  },
  {
    q: "깊은 밤 꿈속에서 만난 낯선 사람이 입고 있던 옷의 색은?",
    options: ["검정", "자주색", "회색", "짙은 녹색"],
    colors: ["#222222", "#7D3C98", "#BDBDBD", "#006400"]
  }
];

const CONTINENTS = [
  "북미대륙", "남미대륙", "아프리카대륙", "유럽대륙", "아시아대륙", "오세아니아대륙"
];

function App() {
  const [name, setName] = useState("");
  const [nameDone, setNameDone] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);

  // 결과 해석 중, 결과, 감사 화면 상태
  const [showResultProcessing, setShowResultProcessing] = useState(false);
  const [continentResult, setContinentResult] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  // 이름 입력 화면
  if (!nameDone) {
    return (
      <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#F6F7FB"}}>
        <div style={{background:"white",padding:36,borderRadius:12,boxShadow:"0 4px 16px rgba(0,0,0,0.07)",maxWidth:400}}>
          <h1 style={{fontSize:25, fontWeight:700, marginBottom:16, textAlign:"center"}}>참여자 이름 입력</h1>
          <p style={{color:"#555",fontSize:15, textAlign:"center", marginBottom:12}}>
            설문 참여자 이름을 입력해 주세요.<br />(본명, 별명, 이니셜 모두 가능)
          </p>
          <input
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={{
              width:"100%",padding:"14px",fontSize:17,borderRadius:7,border:"1.5px solid #bbb",marginBottom:18
            }}
          />
          <button
            onClick={()=>name && setNameDone(true)}
            disabled={!name}
            style={{
              width:"100%",padding:"13px 0",background:name?"#4B7BFF":"#ddd",color:"white",border:"none",borderRadius:8,fontWeight:600,fontSize:17,cursor:name?"pointer":"not-allowed"
            }}
          >
            설문 시작
          </button>
        </div>
      </div>
    );
  }

  // "결과 해석 중..." 화면
  if (showResultProcessing) {
    return (
      <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#F6F7FB"}}>
        <div style={{
          background:"white",
          padding:36,
          borderRadius:12,
          boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
          maxWidth:400,
          textAlign:"center"
        }}>
          <h2 style={{fontSize:26, fontWeight:700, color:"#4B7BFF", marginBottom:12}}>
            결과 해석 중...
          </h2>
          <div className="loader" style={{margin:"26px auto 8px", width:48, height:48}}>
            <div style={{
              border: "6px solid #f3f3f3",
              borderTop: "6px solid #4B7BFF",
              borderRadius: "50%",
              width: 48,
              height: 48,
              animation: "spin 1s linear infinite"
            }} />
          </div>
          <style>
            {`@keyframes spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}
          </style>
          <p style={{color:"#777", marginTop:18, fontSize:15}}>색채 심리 분석 중입니다...</p>
        </div>
      </div>
    );
  }

  // "대륙 결과" 화면
  if (continentResult && !showThankYou) {
    return (
      <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#F6F7FB"}}>
        <div style={{
          background:"white",
          padding:36,
          borderRadius:12,
          boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
          maxWidth:400,
          textAlign:"center"
        }}>
          <h2 style={{fontSize:25, fontWeight:700, marginBottom:18, color:"#4B7BFF"}}>
            당신의 색채 심리는
          </h2>
          <p style={{color:"#FF80B7",fontWeight:900, fontSize:28, marginBottom:24}}>
            {continentResult} 입니다!
          </p>
        </div>
      </div>
    );
  }

  // "감사합니다" 화면
  if (showThankYou) {
    return (
      <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",background:"#F6F7FB"}}>
        <div style={{
          background:"white",
          padding:36,
          borderRadius:12,
          boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
          maxWidth:400,
          textAlign:"center"
        }}>
          <h2 style={{fontSize:28, fontWeight:700, marginBottom:18, color:"#4B7BFF"}}>
            참여해주셔서 감사합니다!
          </h2>
          <p style={{color:"#666", fontSize:15, marginBottom:18}}>
            여러분의 데이터는<br />
            <b style={{color:"#244177"}}>감정별 색채 인식 연구</b>에 소중하게 쓰입니다.
          </p>
          <button
            onClick={() => {
              setStep(0); setAnswers(Array(QUESTIONS.length).fill(null));
              setNameDone(false); setContinentResult(null); setShowThankYou(false);
            }}
            style={{
              padding:"10px 28px",background:"#B7D2FF",color:"#244177",border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer"
            }}
          >
            처음으로
          </button>
        </div>
      </div>
    );
  }

  // 설문 제출(마지막 질문 이후)
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextAnswers = [...answers];
    nextAnswers[step] = selected;
    setAnswers(nextAnswers);
    setSelected(null);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // 결과 해석 중 → 3초 후 대륙 결과 → 2초 후 감사합니다
      setShowResultProcessing(true);
      setTimeout(() => {
        setShowResultProcessing(false);
        const continent = CONTINENTS[Math.floor(Math.random() * CONTINENTS.length)];
        setContinentResult(continent);
        setTimeout(() => {
          setShowThankYou(true);
        }, 5000);
      }, 3000);
      setStep(step + 1);
    }
  };

  // 설문 질문 화면
  const currQ = QUESTIONS[step];

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#F6F7FB"
    }}>
      <div style={{
        background:"white",
        padding:36,
        borderRadius:16,
        boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
        maxWidth:500,
        width:"100%"
      }}>
        <h2 style={{
          fontSize:21,fontWeight:700,marginBottom:28, textAlign:"center"
        }}>{`Q${step+1}. ${currQ.q}`}</h2>
        <form onSubmit={handleSubmit} style={{
          display:"flex",flexDirection:"column",alignItems:"center",gap:22
        }}>
          <div style={{
            display:"flex",justifyContent:"center",gap:28,marginBottom:10,flexWrap:"wrap"
          }}>
            {currQ.options.map((opt,i) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelected(opt)}
                style={{
                  width:100, height:100,
                  borderRadius:"50%",
                  margin:"0 10px 14px 10px",
                  border:selected === opt ? "5px solid #244177" : "3px solid #ccc",
                  background: currQ.colors[i],
                  color: currQ.colors[i]==="#FFFFFF" ? "#333":"#fff",
                  fontWeight:700,
                  fontSize:17,
                  cursor:"pointer",
                  outline: selected===opt ? "2px solid #4B7BFF" : "none",
                  transition:"border 0.2s",
                  boxShadow: selected === opt
                    ? "0 0 15px 3px #4B7BFF55"
                    : "0 2px 8px rgba(0,0,0,0.08)",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
                }}
                title={opt}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{marginTop:6, marginBottom:2, fontSize:16,fontWeight:600}}>{selected}</div>
          )}
          <button
            type="submit"
            disabled={!selected}
            style={{
              width:180,padding:"15px 0",background: selected ? "#FF80B7":"#ddd",
              color: selected ? "white":"#888",
              border:"none",borderRadius:7,fontWeight:700,fontSize:18,cursor: selected ? "pointer":"not-allowed"
            }}
          >
            {step === QUESTIONS.length - 1 ? "제출하기" : "다음"}
          </button>
        </form>
        <div style={{
          marginTop:22, fontSize:13, color:"#888", textAlign:"center"
        }}>
          {`상황 ${step+1} / ${QUESTIONS.length}`}
        </div>
      </div>
    </div>
  );
}

export default App;
