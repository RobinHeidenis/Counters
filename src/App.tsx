import { useAtom } from "jotai";
import { counterAtom } from "./atom.ts";
import { useState } from "react";

function App() {
  const [counters, setCounters] = useAtom(counterAtom);
  const [newName, setNewName] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  return (
    <div
      className={
        "h-screen w-screen bg-slate-900 text-white items-center flex flex-col"
      }
    >
      <h1 className={"text-4xl text-white text-center p-4"}>Counters</h1>

      <div className={"mt-5 flex flex-col"}>
        {counters.map((counter) => (
          <div
            className={
              "flex gap-x-5 bg-slate-800 rounded-lg px-4 py-2 shadow-xl flex-col w-96 mt-5"
            }
          >
            <h3 className={"text-white text-base font-medium tracking-tight"}>
              {counter.name}
            </h3>
            <div className={"flex justify-between"}>
              <p className={"text-white mt-2 text-xl"}>{counter.amount}</p>

              <div className={"flex gap-2"}>
                {isDeleteMode ? (
                  <button
                    className={"bg-red-700 px-3 text-4xl rounded-full"}
                    onClick={() => {
                      setCounters(counters.filter((c) => c !== counter));
                    }}
                  >
                    -
                  </button>
                ) : (
                  <>
                    <button
                      className={"bg-slate-700 px-3 text-4xl rounded-full"}
                      onClick={() => {
                        setCounters(
                          counters.map((c) =>
                            c === counter && c.amount - 1 >= 0
                              ? { ...c, amount: c.amount - 1 }
                              : c,
                          ),
                        );
                      }}
                    >
                      -
                    </button>
                    <button
                      className={"bg-slate-700 px-3 text-4xl rounded-full"}
                      onClick={() => {
                        setCounters(
                          counters.map((c) =>
                            c === counter ? { ...c, amount: c.amount + 1 } : c,
                          ),
                        );
                      }}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isDeleteMode && (
        <div
          className={
            "mt-5 flex flex-col gap-x-4 bg-slate-800 w-96 rounded-lg px-4 py-3 shadow-xl"
          }
        >
          <h3
            className={"text-white text-base font-medium tracking-tight pl-1"}
          >
            New counter
          </h3>
          <div className={"flex justify-between"}>
            <input
              className={"bg-slate-700 rounded-md p-1 mt-1 px-2"}
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder={"Name"}
            />
            <button
              className={
                "bg-slate-700 px-3 text-4xl rounded-full h-fit self-end"
              }
              onClick={() => {
                if (newName) {
                  setCounters([...counters, { name: newName, amount: 0 }]);
                  setNewName("");
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        className={"bg-red-600 px-4 py-2 rounded-full mt-10"}
        onClick={() => setIsDeleteMode(!isDeleteMode)}
      >
        {isDeleteMode ? "Done" : "Delete counters"}
      </button>
    </div>
  );
}

export default App;
