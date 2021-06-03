import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
  createContext,
  useContext,
  useRef,
} from "react";
import "./App.css";
import gitdark from "./git.svg";
import gitlight from "./git-light.svg";
import turnon from "./turnon.svg";
import turnoff from "./turnoff.svg";
import clsx from "clsx";
import { allDistricts, initialState } from "./temputils";
import { reducer } from "./reducer";
import Slots from "./Slots";
let timerId: number;
import { motion, AnimatePresence } from "framer-motion";
import { ReactSVG } from "react-svg";

const getActiveComp = (state: any) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Slots
        state={{
          ...state[state.activeWard],
          centers:
            state.activeFilter == "all"
              ? state[state.activeWard].centers
              : state.activeFilter == "18A"
              ? state[state.activeWard].centers18A
              : state.activeFilter == "18B"
              ? state[state.activeWard].centers18B
              : state.activeFilter == "45A"
              ? state[state.activeWard].centers45A
              : state[state.activeWard].centers45B,
          ckey:
            state.activeFilter == "all"
              ? "All"
              : state.activeFilter == "18A"
              ? "18A"
              : state.activeFilter == "18B"
              ? "18B"
              : state.activeFilter == "45A"
              ? "45A"
              : "45B",
        }}
        isLoading={state.isLoading}
        key={`${state.activeWard}_${state.activeFilter}`}
      />
    </AnimatePresence>
  );
};

export const AppContext = createContext<any>({});

function App() {
  const [states, dispatch] = useReducer(reducer, initialState);

  const LoadData = useCallback(() => {
    dispatch({ type: "setLoading", payload: true });
    const loadinfo = [
      {
        district_id: 267,
        dispatchType: "setglb",
      },
      {
        district_id: 294,
        dispatchType: "setbbmp",
      },
      {
        district_id: 571,
        dispatchType: "setchennai",
      },
      {
        district_id: 581,
        dispatchType: "sethyderabad",
      },
      {
        district_id: 363,
        dispatchType: "setPune",
      },
      {
        district_id: 395,
        dispatchType: "setMumbai",
      },
      {
        district_id: 392,
        dispatchType: "setThane",
      },
    ];

    let prom: any = loadinfo.map((dist) => {
      return new Promise((res) => {
        fetch(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${
            dist.district_id
          }&date=${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`
        )
          .then((resp) => resp.json())
          .then((resp) => {
            const temp = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (parseInt(ses.available_capacity) > 0) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            const temp18Dose1 = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (
                  parseInt(ses.min_age_limit) < 40 &&
                  parseInt(ses.available_capacity_dose1) > 0
                ) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            const temp18Dose2 = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (
                  parseInt(ses.min_age_limit) < 40 &&
                  parseInt(ses.available_capacity_dose2) > 0
                ) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            const temp45Dose1 = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (
                  parseInt(ses.min_age_limit) > 40 &&
                  parseInt(ses.available_capacity_dose1) > 0
                ) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            const temp45Dose2 = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (
                  parseInt(ses.min_age_limit) > 40 &&
                  parseInt(ses.available_capacity_dose2) > 0
                ) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            dispatch({
              type: dist.dispatchType,
              payload: temp,
              payload18Dose1: temp18Dose1,
              payload18Dose2: temp18Dose2,
              payload45Dose1: temp45Dose1,
              payload45Dose2: temp45Dose2,
            });
            dispatch({
              type: "setfilter",
              payload: "all",
            });
            res("success");
          });
      });
    });
    Promise.all(prom).then(() => {
      setTimeout(() => {
        dispatch({ type: "setLoading", payload: false });
      }, 500);
    });
  }, []);

  useEffect(() => {
    LoadData();
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 200
      ) {
        dispatch({ type: "setToTop", payload: true });
      } else {
        dispatch({ type: "setToTop", payload: false });
      }
    };
    window.addEventListener("scroll", scrollFunction);
  }, []);

  const [districtInput, setdistrictInput] = useState("");
  const [districtInputDebounce, setdistrictInputDebounce] = useState("");

  const handleDistrictChange = (e: any) => {
    setdistrictInput(e.target.value);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      console.log(e.target.value);
      setdistrictInputDebounce(e.target.value);
    }, 500);
  };

  const handleCityClick = useCallback((district_id, selname) => {
    setdistrictInput(selname);
    dispatch({ type: "setLoading", payload: true });
    fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        const temp = resp.centers.filter((center: any) => {
          let retVal = false;
          for (const ses of center.sessions) {
            if (parseInt(ses.available_capacity) > 0) {
              retVal = true;
              break;
            }
          }
          return retVal;
        });
        const temp18Dose1 = resp.centers.filter((center: any) => {
          let retVal = false;
          for (const ses of center.sessions) {
            if (
              parseInt(ses.min_age_limit) < 40 &&
              parseInt(ses.available_capacity_dose1) > 0
            ) {
              retVal = true;
              break;
            }
          }
          return retVal;
        });
        const temp18Dose2 = resp.centers.filter((center: any) => {
          let retVal = false;
          for (const ses of center.sessions) {
            if (
              parseInt(ses.min_age_limit) < 40 &&
              parseInt(ses.available_capacity_dose2) > 0
            ) {
              retVal = true;
              break;
            }
          }
          return retVal;
        });
        const temp45Dose1 = resp.centers.filter((center: any) => {
          let retVal = false;
          for (const ses of center.sessions) {
            if (
              parseInt(ses.min_age_limit) > 40 &&
              parseInt(ses.available_capacity_dose1) > 0
            ) {
              retVal = true;
              break;
            }
          }
          return retVal;
        });
        const temp45Dose2 = resp.centers.filter((center: any) => {
          let retVal = false;
          for (const ses of center.sessions) {
            if (
              parseInt(ses.min_age_limit) > 40 &&
              parseInt(ses.available_capacity_dose2) > 0
            ) {
              retVal = true;
              break;
            }
          }
          return retVal;
        });
        dispatch({
          type: "setSelcted",
          selname,
          payload: temp,
          payload18Dose1: temp18Dose1,
          payload18Dose2: temp18Dose2,
          payload45Dose1: temp45Dose1,
          payload45Dose2: temp45Dose2,
        });
        dispatch({
          type: "setfilter",
          payload: "all",
        });
        setdistrictInputDebounce("");
        dispatch({ type: "setactiveward", payload: "Selected" });
        dispatch({ type: "setLoading", payload: false });
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        states,
        dispatch,
      }}
    >
      <div className="App mx-auto">
        <header
          // className="bg-gray-900 sticky z-50 top-0 w-full font-bold text-gray-400 text-xl h-16 flex justify-start items-center border-gray-400 border-b"
          className={clsx({
            ["sticky z-50 top-0 w-full font-bold  text-xl h-16 flex justify-start items-center border-b transition"]:
              true,
            ["bg-gray-100 text-gray-900 border-gray-900"]: !states.isDark,
            ["bg-gray-900 text-gray-100 border-gray-100"]: states.isDark,
          })}
        >
          <div
            // className="medwrap bg-gray-900 md:max-w-5xl w-full mx-auto text-left px-4"
            className={clsx({
              ["medwrap md:max-w-5xl w-full mx-auto text-left px-4 transition"]:
                true,
              ["bg-gray-100"]: !states.isDark,
              ["bg-gray-900"]: states.isDark,
            })}
          >
            <div className="toproot flex items-center">
              <h6 className="mr-4">{`Vaccination slots`}</h6>
              <AnimatePresence>
                {states.isToTop && (
                  <motion.span
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: "tween" }}
                    exit={{ opacity: 0 }}
                  >
                    (
                    {states.activeWard != "Selected"
                      ? states.activeWard
                      : states.Selected.name}
                    )
                  </motion.span>
                )}
              </AnimatePresence>
              {/* <button onClick={() => init()}>Init</button> */}
              <div className="icos ml-auto flex items-center gap-4">
                <AnimatePresence exitBeforeEnter>
                  <motion.button
                    onClick={() =>
                      dispatch({
                        type: "setDarkMode",
                        payload: !states.isDark,
                      })
                    }
                    key={states.isDark}
                    className="focus:outline-none"
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 5 }}
                    transition={{
                      duration: 0.5,
                      type: "tween",
                    }}
                    exit={{ opacity: 0, y: 5 }}
                  >
                    <ReactSVG src={states.isDark ? turnon : turnoff} />
                  </motion.button>
                </AnimatePresence>
                <a
                  href="https://github.com/nikhilakjoshi/vaccineslots"
                  target="_blank"
                >
                  {states.isDark ? (
                    <ReactSVG src={gitdark} />
                  ) : (
                    <ReactSVG src={gitlight} />
                  )}
                </a>
              </div>
            </div>
          </div>
        </header>
        <div
          className={clsx({
            // ["transition"]: true,
            ["bg-gray-300"]: !states.isDark,
            ["bg-gray-700"]: states.isDark,
          })}
        >
          <div className="medwrap md:max-w-5xl mx-auto text-left">
            <div
              className={clsx({
                ["transition tabroot items-center flex flex-wrap gap-6 px-4 pt-4 pb-2"]:
                  true,
              })}
            >
              {[
                "BBMP",
                "Gulbarga",
                "Chennai",
                "Hyderabad",
                "Pune",
                "Mumbai",
                "Thane",
              ].map((d) => (
                <button
                  key={d}
                  className={clsx({
                    ["text-gray-100 hover:text-gray-500"]: states.isDark,
                    ["text-gray-900 hover:text-gray-500"]: !states.isDark,
                    ["underline"]: states.activeWard == d,
                    ["focus:outline-none transition text-sm"]: true,
                  })}
                  onClick={() => {
                    setdistrictInput("");
                    setdistrictInputDebounce("");
                    dispatch({ type: "setactiveward", payload: d });
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <div
              className={clsx({
                ["items-center flex gap-4 m-4 transition"]: true,
              })}
            >
              <div className="relative z-0 w-full">
                <input
                  spellCheck={false}
                  value={districtInput}
                  onChange={handleDistrictChange}
                  placeholder="Select district/ city..."
                  className={clsx({
                    ["z-0 px-2 py-1 text-sm focus:outline-none w-full rounded"]:
                      true,
                    ["bg-gray-900 text-gray-300 placeholder-gray-600"]:
                      states.isDark,
                    ["bg-gray-100 text-gray-700 placeholder-gray-400"]:
                      !states.isDark,
                  })}
                />
                {districtInput !== "" ? (
                  <div
                    onClick={() => {
                      setdistrictInput("");
                      setdistrictInputDebounce("");
                      dispatch({ type: "setactiveward", payload: "BBMP" });
                    }}
                    className={clsx({
                      ["clear absolute right-2 top-0 cursor-pointer pl-6 transition"]:
                        true,
                      ["text-gray-400"]: states.isDark,
                      ["text-gray-600"]: !states.isDark,
                    })}
                  >
                    x
                  </div>
                ) : null}
                <AnimatePresence>
                  {districtInputDebounce !== "" && (
                    <DropDownDistricts
                      filterText={districtInputDebounce}
                      handleCityClick={handleCityClick}
                      close={() => setdistrictInputDebounce("")}
                    />
                  )}
                </AnimatePresence>
              </div>
              <button
                className={clsx({
                  ["focus:outline-none text-sm ml-auto transition"]: true,
                  ["hover:text-gray-100 text-gray-400"]: states.isDark,
                  ["hover:text-gray-900 text-gray-600"]: !states.isDark,
                })}
                onClick={() => LoadData()}
              >
                Refresh
              </button>
            </div>
            <div
              className={clsx({
                ["radiogroup flex flex-wrap px-4 gap-4 items-center transition"]:
                  true,
                ["text-gray-400"]: states.isDark,
                ["text-gray-600"]: !states.isDark,
              })}
            >
              {[
                {
                  label: "All",
                  id: "all",
                },
                {
                  label: "18+ (1st Dose)",
                  id: "18A",
                },
                {
                  label: "18+ (2nd Dose)",
                  id: "18B",
                },
                {
                  label: "45+ (1st Dose)",
                  id: "45A",
                },
                {
                  label: "45+ (2nd Dose)",
                  id: "45B",
                },
              ].map((rad: any) => (
                <div key={rad.id} className="task">
                  <input
                    type="radio"
                    id={rad.id}
                    value={rad.id}
                    name="filter"
                    checked={states.activeFilter == rad.id}
                    onChange={() =>
                      dispatch({ type: "setfilter", payload: rad.id })
                    }
                  />
                  <label htmlFor={rad.id}>
                    <span className="custom-checkbox"></span>
                    <span className="text-sm">{rad.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {getActiveComp(states)}
        </div>
        {states.isToTop && (
          <button
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
            className={clsx({
              ["totop  fixed text-xs p-0 bottom-10 right-2 cursor-pointer shadow-xl focus:outline-none px-4 py-1"]:
                true,
              ["text-gray-50 bg-gray-500"]: states.isDark,
              ["text-gray-900 bg-gray-50"]: !states.isDark,
            })}
          >
            Back to Top
          </button>
        )}
      </div>
    </AppContext.Provider>
  );
}

const filallDistrictsFunc = (filterText: string) => {
  return allDistricts.filter((dist) => {
    let retVal = false;
    if (filterText !== "") {
      dist.district_name.toLowerCase().search(filterText.toLowerCase()) > -1
        ? (retVal = true)
        : (retVal = false);
    } else {
      retVal = true;
    }
    return retVal;
  });
};

const DropDownDistricts: React.FC<any> = ({
  filterText,
  handleCityClick,
  close,
}) => {
  const filallDistricts = useMemo(
    () => filallDistrictsFunc(filterText),
    [filterText]
  );

  const { states } = useContext<any>(AppContext);

  const ref = useRef<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{
        y: 5,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: 5,
        opacity: 0,
      }}
      className={clsx({
        ["root absolute max-h-96 w-5/6 overflow-y-auto z-20 top-8 py-1 rounded"]:
          true,
        ["bg-gray-400"]: states.isDark,
        ["bg-gray-600"]: !states.isDark,
      })}
    >
      {filallDistricts.length > 0 ? (
        filallDistricts.map((district) => (
          <div
            key={district.district_id}
            onClick={() =>
              handleCityClick(district.district_id, district.district_name)
            }
            className={clsx({
              ["distroot my-1 px-1 cursor-pointer transition"]: true,
              ["text-gray-700 hover:bg-gray-500"]: states.isDark,
              ["text-gray-300 hover:bg-gray-500"]: !states.isDark,
            })}
          >
            {district.district_name}
          </div>
        ))
      ) : (
        <div className="distroot text-gray-500 italic my-1 px-1 text-sm">
          No districts/ cities with provided input
        </div>
      )}
    </motion.div>
  );
};

export default App;
