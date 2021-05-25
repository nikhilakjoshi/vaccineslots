import React, { useEffect, useCallback, useReducer } from "react";
import "./App.css";
import ruppee from "./ruppee.svg";
import git from "./git.svg";
import clsx from "clsx";

const initialState = {
  Gulbarga: {
    name: "Gulbarga",
    centers: [],
  },
  BBMP: {
    name: "BBMP",
    centers: [],
  },
  Chennai: {
    name: "Chennai",
    centers: [],
  },
  Pune: {
    name: "Pune",
    centers: [],
  },
  Mumbai: {
    name: "Mumbai",
    centers: [],
  },
  Thane: {
    name: "Thane",
    centers: [],
  },
  activeWard: "BBMP",
  isLoading: true,
  activeFilter: "all",
  isToTop: false,
};
const reducer = (currState: any, action: any) => {
  switch (action.type) {
    case "setglb": {
      return {
        ...currState,
        Gulbarga: {
          name: "Gulbarga",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setbbmp": {
      return {
        ...currState,
        BBMP: {
          name: "BBMP",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setchennai": {
      return {
        ...currState,
        Chennai: {
          name: "Chennai",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "sethyderabad": {
      return {
        ...currState,
        Hyderabad: {
          name: "Hyderabad",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setPune": {
      return {
        ...currState,
        Pune: {
          name: "Pune",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setMumbai": {
      return {
        ...currState,
        Mumbai: {
          name: "Mumbai",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setThane": {
      return {
        ...currState,
        Thane: {
          name: "Thane",
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
    case "setactiveward": {
      return {
        ...currState,
        activeWard: action.payload,
      };
    }
    case "setLoading": {
      return {
        ...currState,
        isLoading: action.payload,
      };
    }
    case "setfilter": {
      return {
        ...currState,
        activeFilter: action.payload,
      };
    }
    case "setToTop": {
      return {
        ...currState,
        isToTop: action.payload,
      };
    }

    default:
      return currState;
  }
};

const Slots: React.FC<any> = ({ state, isLoading }) => {
  return isLoading ? (
    <div className="loader text-gray-300">Loading Data. Please wait</div>
  ) : (
    <div className="medwrap md:max-w-5xl mx-auto text-left">
      <main className="bg-gray-700 text-left px-4 my-4 overflow-y-auto">
        <div className="text-3xl font-bold bg-gray-700 text-gray-400 border-b-2 pb-1 mb-3 border-gray-600">
          {state.name}
        </div>
        <div className="centers">
          {state && state.centers && state.centers.length > 0 ? (
            state.centers.map((center: any, index: any) => (
              <div key={index} className="my-8">
                <div className="font-bold flex items-center justify-between text-xl text-gray-300 underline">
                  {center.name}
                  {center.fee_type == "Paid" ? (
                    <img className="h-6" src={ruppee} />
                  ) : null}
                </div>
                <div className="mb-4 text-sm text-gray-400 address">
                  {center.address}
                </div>
                {center.sessions &&
                  center.sessions.map((session: any, ind: any) => (
                    <div
                      key={ind}
                      className="slotwrap bg-gray-900 text-gray-50 p-4 drop-shadow-sm"
                    >
                      <div className="flex mb-2 items-center">
                        <div className="date underline text-gray-100">
                          Date: {session.date}
                        </div>
                        <div className="vaccine ml-auto text-sm tracking-widest bg-gray-300 text-green-900 flex items-center px-1 rounded font-bold">
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
                              session.available_capacity_dose1 > 0,
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
                              session.available_capacity_dose2 > 0,
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
            <div className="noslots text-gray-400 italic">
              No slots available for selected filter
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const getActiveComp = (state: any) => {
  switch (state.activeWard) {
    default:
      return (
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
          }}
          isLoading={state.isLoading}
        />
      );
  }
};

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

  return (
    <div className="App mx-auto">
      <header className="bg-gray-900 sticky top-0 w-full font-bold text-gray-400 text-xl h-16 flex justify-start items-center border-gray-400 border-b">
        <div className="medwrap bg-gray-900 md:max-w-5xl w-full mx-auto text-left px-4">
          <div className="toproot flex justify-between items-center">
            <h6>Vaccination slots</h6>
            <div className="icos">
              <a
                href="https://github.com/nikhilakjoshi/vaccineslots"
                target="_blank"
              >
                <img src={git} alt="git" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="wrap bg-gray-700">
        <div className="medwrap md:max-w-5xl mx-auto text-left overflow-y-auto">
          <div className="tabroot bg-gray-700 items-center flex flex-wrap gap-6 px-4 pt-4 pb-2">
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
                  ["focus:outline-none hover:text-gray-100 text-gray-300 text-sm"]:
                    true,
                  ["underline"]: states.activeWard == d,
                })}
                onClick={() => dispatch({ type: "setactiveward", payload: d })}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="tabroot bg-gray-700 items-center flex gap-4 px-4 pb-4">
            <button
              className="focus:outline-none hover:text-gray-100 text-gray-400 text-sm ml-auto"
              onClick={() => LoadData()}
            >
              Refresh
            </button>
          </div>
          <div className="radiogroup flex flex-wrap px-4 gap-4 text-gray-400 items-center">
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
          className="totop text-gray-50 fixed text-xs p-0 bottom-2 right-2 cursor-pointer shadow-xl focus:outline-none bg-gray-500 px-4 py-1"
        >
          Back to Top
        </button>
      )}
    </div>
  );
}

export default App;
