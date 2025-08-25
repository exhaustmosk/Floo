// // Hook button click + Enter key
// document.getElementById("submitBtn").addEventListener("click", sendText);
// document.getElementById("userInput").addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     sendText();
//   }
// });

// async function sendText() {
//   const input = document.getElementById("userInput").value;
//   const responseEl = document.getElementById("response");
//   const blobEl = document.getElementById("blob");

//   if (!input.trim()) {
//     responseEl.textContent = "Please say something to Floo!";
//     return;
//   }

//   responseEl.textContent = "Thinking...";

//   try {
//     const res = await fetch("http://localhost:3000/analyze", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text: input }),
//     });

//     const data = await res.json();
//     console.log("Hugging Face Response:", data);

//     // Hugging Face returns -> data.result[0] = array of {label, score}
//     const predictions = data.result[0];
//     const bestPrediction = predictions.reduce((a, b) =>
//       a.score > b.score ? a : b
//     );

//     const label = bestPrediction.label; // "POS", "NEG", "NEU"
//     const score = bestPrediction.score;

//     if (label === "POS" && score > 0.7) {
//       blobEl.textContent = "😊";
//       responseEl.textContent = "Floo is happy!";
//     } else if (label === "NEG" && score > 0.7) {
//       blobEl.textContent = "😡";
//       responseEl.textContent = "Floo is angry!";
//     } else {
//       blobEl.textContent = "🤔";
//       responseEl.textContent = "Floo is confused...";
//     }
//   } catch (err) {
//     console.error(err);
//     responseEl.textContent = "Error talking to server.";
//   }
// }
