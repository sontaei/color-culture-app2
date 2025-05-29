import React, { useState } from "react";

// 구체적 상황별 질문 + 색상 4개(오방색 1 + 서양색 3)
const QUESTIONS = [
  {
    q: "오랜만에 만난 여자친구(남자친구)가 입고 나온 옷의 색은?",
    options: [
      { name: "빨강", hex: "#FF4B4B" },      // 오방색: 적
      { name: "분홍", hex: "#FF92C2" },      // 서양: 사랑, 로맨스
      { name: "하늘색", hex: "#81E3F9" },    // 서양: 산뜻함, 친근감
      { name: "연보라", hex: "#CAB7FF" },    // 서양: 부드러움, 우아함
    ],
  },
  {
    q: "중요한 면접에서 면접관이 입고 있는 넥타이의 색은?",
    options: [
      { name: "노랑", hex: "#FFE066" },      // 오방색: 황
      { name: "남색", hex: "#304CB2" },      // 서양: 신뢰, 권위
      { name: "검정", hex: "#222222" },      // 서양: 포멀, 권위, 중후함
      { name: "초록", hex: "#53E57B" },      // 서양: 안정, 신뢰
    ],
  },
  {
    q: "슬픈 날 혼자 앉아있는 방 커튼의 색은?",
    options: [
      { name: "흰색", hex: "#FFFFFF" },      // 오방색: 백
      { name: "회색", hex: "#BDBDBD" },      // 서양: 슬픔, 공허
      { name: "남색", hex: "#304CB2" },      // 서양: 우울, 고독
      { name: "보라", hex: "#9B4BFF" },      // 서양: 신비, 고독
    ],
  },
  {
    q: "새로 이사 간 집에서 처음 본 현관문의 색은?",
    options: [
      { name: "파랑", hex: "#4B7BFF" },      // 오방색: 청
      { name: "베이지", hex: "#FFF3C2" },    // 서양: 포근함, 따뜻함
      { name: "초록", hex: "#53E57B" },      // 서양: 희망, 시작
      { name: "갈색", hex: "#9B7B4B" },      // 서양: 안정, 자연
    ],
  },
  {
    q: "깊은 밤 꿈속에서 만난 낯선 사람이 입고 있던 옷의 색은?",
    options: [
      { name: "검정", hex: "#222222" },      // 오방색: 흑
      { name: "자주색", hex: "#7D3C98" },    // 서양: 신비, 공포
      { name: "회색", hex: "#BDBDBD" },      // 서양: 중립, 모호함
      { name: "짙은 녹색", hex: "#006400" }, // 서양: 신비, 자연
    ],
  },
];

function App() {
  const [step, setStep] = useState(0); // 0: Intro, 1~N: 설문, N+1: 완료
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState(null);

  // 답 저장 후 다음
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextAnswers = [...answers];
    nextAnswers[step - 1] = selected;
    setAnswers(nextAnswers);
    setSelected(null);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // 데이터 저장/분석 (여기서 서버/구글폼 등으로 전송 가능)
      console.log(
        QUESTIONS.map((q, i) => ({
          question: q.q,
          answer: nextAnswers[i]?.name,
        }))
      );
      setStep(step + 1);
    }
  };

  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">
            색채 감정 실험
          </h1>
          <p className="mb-6 text-gray-600 text-center">
            각 상황에 어울리는 색을 골라주세요.<br />
            오방색 1개 + 서양 감정색 3개 중에서<br />
            <b>당신의 선택</b>이 색채 인식 연구에 사용됩니다.
          </p>
          <button
            onClick={() => setStep(1)}
            className="px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          >
            참여 시작
          </button>
        </div>
      </div>
    );
  }

  if (step > QUESTIONS.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-3">참여해주셔서 감사합니다!</h2>
          <p className="text-gray-600 text-center mb-3">
            여러분의 데이터는<br />
            “감정별 색채 인식 연구”에 소중하게 쓰입니다.
          </p>
          <button
            onClick={() => { setStep(0); setAnswers(Array(QUESTIONS.length).fill(null)); }}
            className="px-5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition"
          >
            처음으로
          </button>
        </div>
      </div>
    );
  }

  // 설문 질문 화면
  const currQ = QUESTIONS[step - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">{`Q${step}. ${currQ.q}`}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-wrap gap-6 justify-center mt-2 mb-2">
            {currQ.options.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelected(c)}
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center
                  ${selected?.name === c.name ? "border-black ring-2 ring-blue-400 scale-110" : "border-gray-300"}
                  transition`}
                style={{ background: c.hex }}
                title={c.name}
              >
                {["흰색", "베이지"].includes(c.name) ? (
                  <span className="text-sm text-gray-700 font-bold">{c.name[0]}</span>
                ) : ""}
              </button>
            ))}
          </div>
          {selected && (
            <div className="mt-1 text-center">
              <span className="text-base font-semibold">{selected.name}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={!selected}
            className="w-full px-6 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold disabled:bg-gray-300 transition"
          >
            제출하기
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">
          {`상황 ${step} / ${QUESTIONS.length}`}
        </div>
      </div>
    </div>
  );
}

export default App;