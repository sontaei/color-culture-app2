import React, { useState } from "react";

const QUESTIONS = [
  {
    q: "오랜만에 만난 여자친구(남자친구)가 입고 나온 옷의 색은?",
    options: ["빨강", "분홍", "하늘색", "연보라"],
    colors: ["#FF4B4B", "#FF92C2", "#81E3F9", "#CAB7FF"]
  },
  // ... (다른 질문도 동일하게)
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
  },
];

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextAnswers = [...answers];
    nextAnswers[step - 1] = selected;
    setAnswers(nextAnswers);
    setSelected(null);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  if (step === 0) {
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
          padding:30,
          borderRadius:12,
          boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
          maxWidth:400
        }}>
          <h1 style={{
            fontSize:24, fontWeight:700, marginBottom:12, textAlign:"center"
          }}>색채 감정 실험</h1>
          <p style={{
            color:"#555",fontSize:15, textAlign:"center", marginBottom:18
          }}>
            각 상황에 어울리는 색을 골라주세요.<br />
            오방색 1개 + 서양 감정색 3개 중에서<br />
            <b>당신의 선택</b>이 색채 인식 연구에 사용됩니다.
          </p>
          <button
            onClick={() => setStep(1)}
            style={{
              padding:"12px 32px",background:"#4B7BFF",color:"white",
              border:"none",borderRadius:8,fontWeight:600,
              fontSize:18,cursor:"pointer"
            }}
          >
            참여 시작
          </button>
        </div>
      </div>
    );
  }

  if (step > QUESTIONS.length) {
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
          padding:30,
          borderRadius:12,
          boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
          maxWidth:400,textAlign:"center"
        }}>
          <h2 style={{
            fontSize:20, fontWeight:700, marginBottom:8
          }}>참여해주셔서 감사합니다!</h2>
          <p style={{
            color:"#666", fontSize:15, marginBottom:15
          }}>
            여러분의 데이터는<br />
            “감정별 색채 인식 연구”에 소중하게 쓰입니다.
          </p>
          <button
            onClick={() => { setStep(0); setAnswers(Array(QUESTIONS.length).fill(null)); }}
            style={{
              padding:"10px 28px",background:"#B7D2FF",color:"#244177",
              border:"none",borderRadius:8,fontWeight:600,fontSize:16,cursor:"pointer"
            }}
          >
            처음으로
          </button>
        </div>
      </div>
    );
  }

  const currQ = QUESTIONS[step - 1];

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
        }}>{`Q${step}. ${currQ.q}`}</h2>
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
            제출하기
          </button>
        </form>
        <div style={{
          marginTop:22, fontSize:13, color:"#888", textAlign:"center"
        }}>
          {`상황 ${step} / ${QUESTIONS.length}`}
        </div>
      </div>
    </div>
  );
}

export default App;