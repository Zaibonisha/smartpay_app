import React, { useState } from "react";
import { getAIPaymentPlan } from "../api/api";

const AIPaymentPlan = () => {
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getAIPaymentPlan(topic);
    setPlan(res.data.plan);
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">AI Payment Strategy</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter topic (e.g. Real estate)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Generate Plan
        </button>
      </form>
      {plan && <p className="mt-3 whitespace-pre-line">{plan}</p>}
    </div>
  );
};

export default AIPaymentPlan;
