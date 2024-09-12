import { useState, useEffect } from "react";
import "./index.css";

function App() {
    const [score1, setScore1] = useState("");
    const [score2, setScore2] = useState("");
    const [score3, setScore3] = useState("");
    const [fieldOrder, setFieldOrder] = useState([
        "score1",
        "score2",
        "score3",
    ]);
    const [error, setError] = useState("");
    const [submittedCount, setSubmittedCount] = useState(0);

    useEffect(() => {
        setFieldOrder(
            ["score1", "score2", "score3"].sort(() => Math.random() - 0.5),
        );
    }, []);

    const handleScoreChange = (
        scoreSetter: React.Dispatch<React.SetStateAction<string>>,
    ) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            scoreSetter(e.target.value);
            if (submittedCount === 1) {
                const errorMessages = [
                    "Oops, did you follow the reversed instructions correctly?",
                    "Hmm, something seems off. Check your entries!",
                    "Did you enter everything in the right order? Try again!",
                ];
                setError(
                    errorMessages[
                        Math.floor(Math.random() * errorMessages.length)
                    ],
                );
            }
        };
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmittedCount((prevCount) => prevCount + 1);

        if (submittedCount === 1) {
            if (score1 === "" || score2 === "" || score3 === "") {
                alert(
                    "Please make sure all scores are filled in the correct order according to the unpredictable guidelines.",
                );
            } else {
                alert(
                    "Submission received. Ensure all scores were entered following the shuffled instructions.",
                );
            }
        } else if (submittedCount === 2) {
            setScore1("");
            setScore2("");
            setScore3("");
        }
    };

    if (submittedCount >= 2) {
        return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-900">
                <h1 className="text-3xl font-bold text-white mb-6 animate-bounce">
                    Thanks for the Challenge!
                </h1>
                <p className="w-1/3 text-xl text-gray-300 mb-6">
                    Big shoutout to Pete Tech for crafting such a quirky and
                    delightful challenge for IFPI! 🎉 I've had a blast
                    navigating through the chaos, and I'm excited to tackle more
                    of these brain-bending puzzles. Here's hoping that one day
                    I'll join the Pete Tech squad and create even more mayhem
                    together. 🚀
                </p>
                <a
                    href="https://github.com/Luis-Moura?tab=repositories"
                    className="text-blue-500 hover:underline text-2xl"
                >
                    Check out my GitHub!
                </a>
            </div>
        );
    }

    return (
        <div
            className={`w-full min-h-screen flex justify-center items-center ${
                submittedCount === 1
                    ? "bg-red-900 animate-pulse"
                    : "bg-gray-900 animate-fadeIn"
            }`}
        >
            <form
                onSubmit={handleSubmit}
                className={`p-8 rounded-lg shadow-md w-96 border ${
                    submittedCount === 1
                        ? "border-yellow-600 bg-gray-800 spin"
                        : "border-red-600 bg-gray-700"
                } transition-transform duration-500 transform ${
                    submittedCount === 1 ? "rotate-3" : "rotate-0"
                }`}
            >
                <h1
                    className={`text-2xl font-bold text-center mb-6 ${
                        submittedCount === 1
                            ? "text-yellow-300"
                            : "text-red-300"
                    } animate-pulse`}
                >
                    Incomprehensible Scores
                </h1>

                {fieldOrder.map((field) => (
                    <div className="mb-4" key={field}>
                        <label
                            className={`block mb-2 ${
                                submittedCount === 1
                                    ? "text-yellow-300"
                                    : "text-gray-300"
                            }`}
                            htmlFor={field}
                        >
                            {field === "score1" && "Score 1 (Enter this last)"}
                            {field === "score2" &&
                                "Score 2 (Enter before Score 3)"}
                            {field === "score3" &&
                                "Score 3 (Enter before Score 1)"}
                        </label>
                        <input
                            type="number"
                            id={field}
                            value={
                                field === "score1"
                                    ? score1
                                    : field === "score2"
                                    ? score2
                                    : score3
                            }
                            onChange={handleScoreChange(
                                field === "score1"
                                    ? setScore1
                                    : field === "score2"
                                    ? setScore2
                                    : setScore3,
                            )}
                            className={`w-full px-4 py-2 border border-gray-500 rounded-md ${
                                submittedCount === 1
                                    ? "bg-gray-900 text-yellow-300"
                                    : "bg-gray-800 text-gray-300"
                            } transition-transform duration-500 transform ${
                                submittedCount === 1 ? "scale-110" : "scale-100"
                            }`}
                            required
                            placeholder={`Enter value for ${field}`}
                        />
                    </div>
                ))}

                {error && (
                    <p
                        className={`text-center mb-4 ${
                            submittedCount === 1
                                ? "text-yellow-400"
                                : "text-red-400"
                        } animate-pulse`}
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className={`w-full py-2 rounded-md ${
                        submittedCount === 1
                            ? "bg-gray-600 text-yellow-300 hover:bg-gray-500"
                            : "bg-purple-900 text-white hover:bg-purple-600"
                    } transition-transform duration-500 transform ${
                        submittedCount === 1 ? "scale-110" : "scale-100"
                    }`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default App;
