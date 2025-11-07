import React, { useEffect, useState } from "react";
import { getPayments, createPayment, getCreators, getAITip } from "../api/api";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [creators, setCreators] = useState([]);
  const [amount, setAmount] = useState("");
  const [selectedCreator, setSelectedCreator] = useState("");
  const [tips, setTips] = useState({});

  // Fetch payments and creators on mount
  useEffect(function () {
    (async function () {
      const res = await getPayments();
      setPayments(res.data);
    })();
    (async function () {
      const res = await getCreators();
      setCreators(res.data);
      if (res.data.length > 0) setSelectedCreator(res.data[0].id);
    })();
  }, []);

  // Create a new payment
  const handleCreatePayment = async function () {
    if (!selectedCreator) {
      alert("Select a creator first");
      return;
    }
    const res = await createPayment({ amount, creator_id: selectedCreator });
    setPayments(payments.concat(res.data));
    setAmount("");
  };

  // Fetch AI tip for a specific creator
  const handleFetchTip = async function (creatorId) {
    try {
      const res = await getAITip(creatorId, { likes: 200, views: 1000 });
      setTips(Object.assign({}, tips, { [creatorId]: res.data.suggested_tip_usdc }));
    } catch (err) {
      alert("Error fetching AI tip");
    }
  };

  return React.createElement(
    "div",
    { className: "max-w-md mx-auto bg-white p-4 rounded shadow" },
    React.createElement("h2", { className: "text-xl font-bold mb-3" }, "Payments & AI Tips"),
    
    // Add Payment Section
    React.createElement(
      "div",
      { className: "flex flex-col gap-2 mb-4" },
      React.createElement(
        "select",
        {
          value: selectedCreator,
          onChange: function (e) { setSelectedCreator(e.target.value); },
          className: "border p-2 rounded"
        },
        creators.map(function (c) {
          return React.createElement(
            "option",
            { key: c.id, value: c.id },
            c.user.username
          );
        })
      ),
      React.createElement("input", {
        type: "number",
        placeholder: "Enter amount",
        value: amount,
        onChange: function (e) { setAmount(e.target.value); },
        className: "border p-2 rounded"
      }),
      React.createElement(
        "button",
        {
          onClick: handleCreatePayment,
          className: "bg-blue-600 text-white px-4 py-2 rounded mt-1"
        },
        "Add Payment"
      )
    ),

    // Payments List
    React.createElement(
      "ul",
      null,
      payments.map(function (p) {
        const creatorId = p.creator ? p.creator.id : null;
        return React.createElement(
          "li",
          { key: p.id, className: "border-b py-2" },
          "💵 $", p.amount, " — ", p.status, " (Creator: ", p.creator ? p.creator.user.username : "N/A", ")",
          creatorId ? React.createElement(
            "div",
            { className: "mt-1" },
            React.createElement(
              "button",
              {
                onClick: function () { handleFetchTip(creatorId); },
                className: "bg-green-600 text-white px-2 py-1 rounded text-sm"
              },
              "Get AI Suggested Tip"
            ),
            tips[creatorId] ? React.createElement(
              "span",
              { className: "ml-2 text-green-700 font-semibold" },
              "💰 Suggested Tip: $", tips[creatorId], " USDC"
            ) : null
          ) : null
        );
      })
    )
  );
}

export default PaymentList;
