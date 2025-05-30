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

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzKyKTWpJTHKAVwMgbZmDo0kYmpZ_TlwxaDMiN98_xShL4fktR7PoWClwmOuh7gscZ6tQ/exec";

function App() {
  const [name, setName] = useState("");
  const [nameDone, setNameDone] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [sending, setSending] = useState(false);

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

  // 설문 끝나면 구글시트로 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextAnswers = [...answers];
    nextAnswers[step - 1] = selected;
    setAnswers(nextAnswers);
    setSelected(null);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setSending(true);
      try {
        await fetch(SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            answers: nextAnswers
          }),
        });
      } catch (err) {
        alert("응답 전송에 실패했습니다! (인터넷 확인)");
      }
      setSending(false);
      setStep(step + 1);
    }
  };

  // **설문 완료 후 "감사 인사" 화면**
  if (step > QUESTIONS.length) {
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
            <b style={{color:"#244177"}}>감정별 색채 인식 연구</b>에 소중하게 쓰입니다.<br />
            <span style={{color:"#4B7BFF"}}>(관리자는 구글 시트에서 결과 확인 가능)</span>
          </p>
          <button
            onClick={() => { setStep(0); setAnswers(Array(QUESTIONS.length).fill(null)); setNameDone(false); }}
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
            disabled={!selected || sending}
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
