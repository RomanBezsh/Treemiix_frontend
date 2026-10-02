"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";

const API_BASE_URL = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com").replace(/\/api$/, "").replace(/\/$/, "") : "https://treemiix-backend.onrender.com";

interface AnswerItemData {
  id: string;
  text: string;
  author: string;
  date: string;
}

interface QuestionItemData {
  id: string;
  votes: number;
  questionText: string;
  questionAuthor: string;
  questionDate: string;
  answers: AnswerItemData[];
}

interface QnACardProps {
  data: QuestionItemData;
  onAddAnswer: (questionId: string, answer: string) => void;
  onVote: (questionId: string, delta: number) => void;
}

interface ProductQnASectionProps {
  productId?: string;
  questions?: QuestionItemData[];
}

const QnACard = ({ data, onAddAnswer, onVote }: QnACardProps) => {
  const [answerText, setAnswerText] = useState("");

  const submitAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answerText.trim()) return;
    onAddAnswer(data.id, answerText.trim());
    setAnswerText("");
  };

  return (
    <article className="flex w-full flex-col gap-[18px] border-b border-[#E5E5E5] pb-[32px] sm:flex-row sm:gap-[24px]">
      <div className="flex shrink-0 flex-row items-center gap-[10px] sm:w-[42px] sm:flex-col sm:gap-[4px]">
        <button type="button" aria-label="Up vote" onClick={() => onVote(data.id, 1)} className="transition-transform duration-200 ease-out hover:-translate-y-[2px] active:scale-90"><svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_i_1349_26995)"><path d="M11.5297 0.999998C12.2995 -0.333335 14.224 -0.333333 14.9938 1L26.2521 20.5C27.0219 21.8333 26.0596 23.5 24.52 23.5H2.00339C0.463786 23.5 -0.498463 21.8333 0.271338 20.5L11.5297 0.999998Z" fill="#F8F8F8" /></g></svg></button>
        <div className="flex items-baseline gap-[5px] sm:flex-col sm:items-center sm:gap-0">
          <span className="text-[26px] font-light leading-none text-[#333333] sm:text-4xl">{data.votes}</span>
          <span className="text-[13px] text-[#333333] sm:text-lg">votes</span>
        </div>
        <button type="button" aria-label="Down vote" onClick={() => onVote(data.id, -1)} className="transition-transform duration-200 ease-out hover:translate-y-[2px] active:scale-90"><svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_i_1349_26997)"><path d="M14.9938 22.5C14.224 23.8333 12.2995 23.8333 11.5297 22.5L0.271339 3C-0.498461 1.66666 0.463791 -2.60502e-06 2.00339 -2.47042e-06L24.5201 -5.01952e-07C26.0597 -3.67356e-07 27.0219 1.66667 26.2521 3L14.9938 22.5Z" fill="#F8F8F8" /></g></svg></button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[28px]">
        <div className="flex flex-col items-start gap-[6px] sm:flex-row sm:gap-[18px]">
          <span className="shrink-0 text-[16px] font-medium text-[#333333] sm:text-lg">Question:</span>
          <div className="min-w-0">
            <p className="break-words text-[15px] leading-[150%] text-[#333333] sm:text-[16px]">{data.questionText}</p>
            <div className="mt-[8px] flex flex-wrap items-center gap-x-[10px] gap-y-[6px]">
              <span className="rounded-[20px] bg-[#F8F8F8] px-[14px] py-[5px] text-[12px] text-[#E9852A] shadow-[0_2px_4px_#00000033] sm:px-4 sm:text-sm">{data.questionAuthor}</span>
              <span className="text-[12px] text-[#828282] sm:text-sm">{data.questionDate}</span>
            </div>
          </div>
        </div>

        {data.answers.map((answer) => (
          <div key={answer.id} className="flex flex-col items-start gap-[6px] sm:flex-row sm:gap-[29px]">
            <span className="shrink-0 text-[16px] font-medium text-[#333333] sm:text-lg">Answer:</span>
            <div className="min-w-0">
              <p className="whitespace-pre-line break-words text-[15px] leading-[150%] text-[#333333] sm:text-[16px]">{answer.text}</p>
              <div className="mt-[8px] flex flex-wrap items-center gap-x-[10px] gap-y-[6px]">
                <span className="rounded-[20px] bg-[#F8F8F8] px-[14px] py-[5px] text-[12px] text-[#E9852A] shadow-[0_2px_4px_#00000033] sm:px-4 sm:text-sm">{answer.author}</span>
                <span className="text-[12px] text-[#828282] sm:text-sm">{answer.date}</span>
              </div>
            </div>
          </div>
        ))}

        <form onSubmit={submitAnswer} className="w-full max-w-[930px]">
          <label htmlFor={`answer-${data.id}`} className="mb-[8px] block text-[15px] font-medium text-[#333333] sm:text-[16px]">Write an answer</label>
          <div className="flex w-full flex-col gap-[10px] sm:flex-row sm:items-end sm:gap-[12px]">
            <textarea id={`answer-${data.id}`} value={answerText} onChange={(e) => setAnswerText(e.target.value)} rows={3} placeholder="Write your answer..." className="min-h-[88px] w-full min-w-0 flex-1 resize-none rounded-[18px] border border-[#E5E5E5] bg-[#F8F8F8] px-[16px] py-[12px] text-[14px] leading-[150%] text-[#333333] outline-none transition-all duration-200 placeholder:text-[#B3B3B3] focus:border-[#7C9BC0] focus:bg-white focus:shadow-[0_4px_12px_rgba(124,155,192,0.14)] sm:min-h-[72px] sm:px-[18px] sm:text-[15px]" />
            <button type="submit" disabled={!answerText.trim()} className="flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] text-[15px] font-medium text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#6D8FB7] hover:shadow-[0_5px_12px_rgba(124,155,192,0.25)] active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 sm:w-auto">Answer</button>
          </div>
        </form>
      </div>
    </article>
  );
};

const ProductQnASection = ({ productId = "default" }: ProductQnASectionProps) => {
  const [questionItems, setQuestionItems] = useState<QuestionItemData[]>([]);

  const mapBackendToFrontend = (data: any[]) => data.map((q: any) => ({
    id: q.id,
    votes: q.votesCount || 0,
    questionText: q.content,
    questionAuthor: q.user?.firstName || "User",
    questionDate: new Date(q.createdAt).toLocaleDateString(),
    answers: (q.answers || []).map((a: any) => ({
        id: a.id,
        text: a.content,
        author: a.user?.firstName || "User",
        date: new Date(a.createdAt).toLocaleDateString()
    }))
  }));

  useEffect(() => {
    async function fetchQnA() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/productquestions/byproduct/${productId}`);
        if (res.ok) setQuestionItems(mapBackendToFrontend(await res.json()));
      } catch (e) { console.error("Failed to fetch", e); }
    }
    fetchQnA();
  }, [productId]);

  const [questionText, setQuestionText] = useState("");

  const submitQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/productquestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ productId, content: questionText.trim() }),
      });
      if (res.ok) {
        const refetchRes = await fetch(`${API_BASE_URL}/api/productquestions/byproduct/${productId}`);
        if (refetchRes.ok) setQuestionItems(mapBackendToFrontend(await refetchRes.json()));
      }
    } catch (e) { console.error("Error submitting question", e); }
    setQuestionText("");
  };

  const addAnswer = async (questionId: string, answer: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/productanswers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ questionId, content: answer, isOfficialAnswer: false }),
      });
      if (res.ok) {
        const refetchRes = await fetch(`${API_BASE_URL}/api/productquestions/byproduct/${productId}`);
        if (refetchRes.ok) setQuestionItems(mapBackendToFrontend(await refetchRes.json()));
      }
    } catch (e) { console.error("Error submitting answer", e); }
  };

  const handleVote = async (questionId: string, delta: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`${API_BASE_URL}/api/questionvotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ questionId, value: delta }),
      });
      if (res.ok) {
        const refetchRes = await fetch(`${API_BASE_URL}/api/productquestions/byproduct/${productId}`);
        if (refetchRes.ok) setQuestionItems(mapBackendToFrontend(await refetchRes.json()));
      }
    } catch (e) { console.error("Error voting", e); }
  };

  return (
    <section className="mb-[70px] w-full max-w-[1690px] px-[16px] font-[var(--font-roboto)] sm:px-[24px] lg:mb-[148px] lg:px-[40px]">
      <h2 className="mb-[24px] text-[22px] font-semibold leading-[130%] text-[#333333] sm:text-2xl lg:mb-[40px]">Customer questions & answers</h2>
      <form onSubmit={submitQuestion} className="mb-[38px] w-full max-w-[930px]">
        <label htmlFor="product-question" className="mb-[8px] block text-[15px] font-medium text-[#333333] sm:text-[16px]">Ask a question</label>
        <div className="flex w-full flex-col gap-[10px] sm:flex-row sm:items-end sm:gap-[12px]">
            <textarea id="product-question" value={questionText} onChange={e => setQuestionText(e.target.value)} rows={3} placeholder="What would you like to know?" className="min-h-[88px] w-full resize-none rounded-[22px] border border-transparent bg-[#F8F8F8] pb-[12px] pl-[52px] pr-[16px] pt-[13px] text-[14px] leading-[150%] text-[#333333] outline-none focus:border-[#7C9BC0] focus:bg-white focus:shadow-[0_4px_12px_rgba(124,155,192,0.14)] sm:min-h-[72px] sm:rounded-[26px] sm:pl-[63px] sm:pr-[20px] sm:text-[16px]" />
            <button type="submit" className="flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[26px] text-[15px] font-medium text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#6D8FB7] hover:shadow-[0_5px_12px_rgba(124,155,192,0.25)] active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 sm:w-auto">Ask question</button>
        </div>
      </form>
      <div className="flex flex-col gap-[32px]">
        {questionItems.map((q) => <QnACard key={q.id} data={q} onAddAnswer={addAnswer} onVote={handleVote} />)}
      </div>
    </section>
  );
};

export default ProductQnASection;