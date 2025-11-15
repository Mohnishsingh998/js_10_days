"use client";
import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const maxLimit = 200; // optional

  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const progress = Math.min((charCount / maxLimit) * 100, 100);

  return (
   <div className="min-h-screen flex items-center justify-center bg-amber-950 p-6">
    <div className="bg-amber-500 p-6 rounded-2xl shadow-xl w-full max-w-xl space-y-4">
      <h1>Character Counter</h1>
      <textarea
      className="w-full h-40 p-3 border rounded-xl focus:outline-none focus:ring-2"
      placeholder="text here.."
      value={text}
      onChange={(e) => setText(e.target.value)}
      maxLength={maxLimit}
      />
      {/* prgress bar */}
      <div
      className="w-full bg-amber-100 rounded-full h-3"
      >
        <div
        className="h-3 bg-black rounded-full"
        style={{width:`${progress}%`}}>
          {/* progess */}
        </div>
      </div>

      {/* stats */}
      <div
      className="flex justify-between text-gray-700 text-sm font-medium">
        <p>Character : {charCount}/{maxLimit}</p>
        <p>words : {wordCount}</p>
      </div>
    </div>
   </div>
  );
}


// what i learned
// --> about usestate hooks. and props passing and dymanic