import { NextResponse } from "next/server";

// In-memory server store for Q&A per product: { [productId: string]: any[] }
const serverQnAStore: Record<string, any[]> = {};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const questions = serverQnAStore[productId] || [
    {
      id: "1",
      votes: 18,
      questionText: "Is this headset only stereo?",
      questionAuthor: "AAAA",
      questionDate: "on August 30, 2017",
      answers: [
        {
          id: "a1",
          text:
            "Hey ImJustMagik,\nYes, the Cloud Alpha is stereo, but I highly recommend that you try pairing the USB Dolby 7.1 Adapter with it for USB connectivity and Virtual Surround Sound for an amazing audio experience. Thank you!\n- Chris @HyperX",
          author: "AAAA",
          date: "on August 30, 2017",
        },
      ],
    },
  ];
  return NextResponse.json({ data: questions });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const body = await request.json();
    const { action, questionText, questionId, answerText, delta } = body;

    if (!serverQnAStore[productId]) {
      serverQnAStore[productId] = [
        {
          id: "1",
          votes: 18,
          questionText: "Is this headset only stereo?",
          questionAuthor: "AAAA",
          questionDate: "on August 30, 2017",
          answers: [
            {
              id: "a1",
              text:
                "Hey ImJustMagik,\nYes, the Cloud Alpha is stereo, but I highly recommend that you try pairing the USB Dolby 7.1 Adapter with it for USB connectivity and Virtual Surround Sound for an amazing audio experience. Thank you!\n- Chris @HyperX",
              author: "AAAA",
              date: "on August 30, 2017",
            },
          ],
        },
      ];
    }

    const questions = serverQnAStore[productId];

    if (action === "ask") {
      if (!questionText) {
        return NextResponse.json({ error: "Question text required" }, { status: 400 });
      }
      const newQuestion = {
        id: `question-${Date.now()}`,
        votes: 0,
        questionText: questionText.trim(),
        questionAuthor: "User",
        questionDate: "just now",
        answers: [],
      };
      serverQnAStore[productId] = [newQuestion, ...questions];
    } else if (action === "answer") {
      if (!questionId || !answerText) {
        return NextResponse.json({ error: "Question ID and answer text required" }, { status: 400 });
      }
      serverQnAStore[productId] = questions.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answers: [
            ...q.answers,
            {
              id: `answer-${Date.now()}`,
              text: answerText.trim(),
              author: "User",
              date: "just now",
            },
          ],
        };
      });
    } else if (action === "vote") {
      if (!questionId || typeof delta !== "number") {
        return NextResponse.json({ error: "Question ID and delta required" }, { status: 400 });
      }
      serverQnAStore[productId] = questions.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          votes: Math.max(0, q.votes + delta),
        };
      });
    }

    return NextResponse.json({ success: true, data: serverQnAStore[productId] });
  } catch (err) {
    console.error("Error managing QnA on server:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
