import express from "express";
// import dotenv from "dotenv";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready ");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Programmer Joke",
      content:
        "Why do programmers prefer dark mode? Because light attracts bugs.",
    },
    {
      id: 2,
      title: "Math Humor",
      content: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 3,
      title: "Coffee Joke",
      content:
        "Why do coffee beans never get into arguments? Because they know how to espresso themselves.",
    },
    {
      id: 4,
      title: "Computer Joke",
      content:
        "Why did the computer go to the doctor? Because it caught a virus.",
    },
    {
      id: 5,
      title: "Student Life",
      content:
        "I told my teacher I was sick. She said, You missed the test. I said, Yes, I was sick of studying",
    },
    {
      id: 6,
      title: "AI Joke",
      content:
        "Why did the AI break up with its partner? Too many unresolved loops.",
    },
    {
      id: 7,
      title: "Gym Joke",
      content:
        "I told my trainer I wanted abs. He said, First, stop eating like you already have them.",
    },
  ];
  res.send(jokes);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
