import React, { useContext } from "react";
import ruppee from "./ruppee.svg";
import clsx from "clsx";
import { AppContext } from "./App";
import { AnimatePresence, motion } from "framer-motion";

const Slots: React.FC<any> = ({ state, isLoading }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.15, type: "tween" }}
      exit={{ opacity: 0 }}
      key={`${state.ckey}_${state.name}`}
    >
      {isLoading ? (
        <AnimatePresence>
          <Loading />
        </AnimatePresence>
      ) : (
        <Main state={state} />
      )}
    </motion.div>
  );
};

const Main: React.FC<any> = ({ state }) => {
  const { states } = useContext(AppContext);
  return (
    <motion.div
      className="medwrap md:max-w-5xl mx-auto text-left min-h-5/6"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      exit={{ opacity: 0 }}
    >
      <main
        className={clsx({
          ["text-left px-4 my-4 overflow-y-auto"]: true,
          ["bg-gray-700"]: states.isDark,
          ["bg-gray-300"]: !states.isDark,
        })}
      >
        <div
          className={clsx({
            ["text-3xl font-bold border-b-2 pb-1 mb-3"]: true,
            ["border-gray-600 bg-gray-700 text-gray-400"]: states.isDark,
            ["border-gray-400 bg-gray-300 text-gray-600"]: !states.isDark,
          })}
        >
          {state.name}
        </div>
        <div className="centers">
          {state && state.centers && state.centers.length > 0 ? (
            state.centers.map((center: any, index: any) => (
              <div key={index} className="my-8">
                <div
                  className={clsx({
                    ["font-bold flex items-center justify-between text-xl underline"]:
                      true,
                    ["text-gray-300"]: states.isDark,
                    ["text-gray-700"]: !states.isDark,
                  })}
                >
                  {center.name}
                  {center.fee_type == "Paid" ? (
                    <img className="h-6" src={ruppee} />
                  ) : null}
                </div>
                <div
                  className={clsx({
                    ["mb-4 text-sm text-gray-400 address"]: true,
                    ["text-gray-400"]: states.isDark,
                    ["text-gray-600"]: !states.isDark,
                  })}
                >
                  {center.address}
                </div>
                {center.sessions &&
                  center.sessions.map((session: any, ind: any) => (
                    <div
                      key={ind}
                      className={clsx({
                        ["slotwra p-4"]: true,
                        ["bg-gray-900 text-gray-50 shadow-lgd"]: states.isDark,
                        ["bg-gray-100 text-gray-900 shadow-lg"]: !states.isDark,
                      })}
                    >
                      <div className="flex mb-2 items-center">
                        <div
                          className={clsx({
                            ["date underline"]: true,
                            ["text-gray-100"]: states.isDark,
                            ["text-gray-900"]: !states.isDark,
                          })}
                        >
                          Date: {session.date}
                        </div>
                        <div
                          className={clsx({
                            ["vaccine ml-auto text-sm tracking-wider flex items-center px-1 rounded font-bold"]:
                              true,
                            ["bg-gray-300 text-green-900"]: states.isDark,
                            ["bg-gray-700 text-green-100"]: !states.isDark,
                          })}
                        >
                          {session.vaccine}
                        </div>
                      </div>
                      <div className="age ml-4">
                        Age: {session.min_age_limit}
                      </div>
                      <div className="dose1 ml-8">
                        Dose 1:{" "}
                        <span
                          className={clsx({
                            ["text-green-400"]:
                              session.available_capacity_dose1 > 0 &&
                              states.isDark,
                            ["text-green-600"]:
                              session.available_capacity_dose1 > 0 &&
                              !states.isDark,
                          })}
                        >
                          {session.available_capacity_dose1}
                        </span>
                      </div>
                      <div className="dose1 ml-8">
                        Dose 2:{" "}
                        <span
                          className={clsx({
                            ["text-green-400"]:
                              session.available_capacity_dose2 > 0 &&
                              states.isDark,
                            ["text-green-600"]:
                              session.available_capacity_dose2 > 0 &&
                              !states.isDark,
                          })}
                        >
                          {session.available_capacity_dose2}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div
              className={clsx({
                ["noslots italic flex items-center justify-center"]: true,
                ["text-gray-400"]: states.isDark,
                ["text-gray-600"]: !states.isDark,
              })}
            >
              No slots available for selected filter
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

const Loading = () => {
  const { states } = useContext(AppContext);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      exit={{ opacity: 0 }}
      className={clsx({
        ["transition min-h-5/6 flex items-center justify-center"]: true,
        ["text-gray-300"]: states.isDark,
        ["text-gray-700"]: !states.isDark,
      })}
    >
      Loading Data. Please wait
    </motion.div>
  );
};

export default Slots;
