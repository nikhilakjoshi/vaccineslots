import React, { useEffect, useCallback, useReducer } from "react";
import "./App.css";

const initialState = {
  Gulbarga: {
    name: "Gulbarga",
    centers: [],
  },
  BBMP: {
    name: "BBMP",
    centers: [],
  },
  activeWard: "BBMP",
  isLoading: true,
};
const reducer = (currState: any, action: any) => {
  switch (action.type) {
    case "setglb": {
      return {
        ...currState,
        Gulbarga: { name: "Gulbarga", centers: [...action.payload] },
      };
    }
    case "setbbmp": {
      return {
        ...currState,
        BBMP: { name: "BBMP", centers: [...action.payload] },
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

    default:
      return currState;
  }
};

const Slots: React.FC<any> = ({ state, isLoading }) => {
  return isLoading ? (
    <div className="loader">Loading Data. Please wait</div>
  ) : (
    <main className="bg-gray-700 text-left p-4 overflow-y-auto">
      <div className="text-3xl font-bold text-gray-400 border-b-2 pb-1 mb-3 border-gray-600">
        {state.name}
      </div>
      <div className="centers">
        {state && state.centers && state.centers.length > 0 ? (
          state.centers.map((center: any, index: any) => (
            <div key={index} className="my-8">
              <div className="font-bold text-xl text-gray-300 underline">
                {center.name}
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
                    <div className="date underline text-gray-100 mb-2">
                      Date: {session.date}
                    </div>
                    <div className="age ml-4">Age: {session.min_age_limit}</div>
                    <div className="dose1 ml-8">
                      Dose 1: {session.available_capacity_dose1}
                    </div>
                    <div className="dose2 ml-8">
                      Dose 2: {session.available_capacity_dose2}
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <div className="noslots text-gray-400 italic">
            No slots available for 18 +
          </div>
        )}
      </div>
    </main>
  );
};

const getActiveComp = (state: any) => {
  switch (state.activeWard) {
    case "BBMP":
      return <Slots state={state.BBMP} isLoading={state.isLoading} />;

    case "Gulbarga":
      return <Slots state={state.Gulbarga} isLoading={state.isLoading} />;
  }
};

function App() {
  const [states, dispatch] = useReducer(reducer, initialState);

  const LoadData = useCallback(() => {
    dispatch({ type: "setLoading", payload: true });

    let prom: any = [];

    prom.push(
      new Promise((res) => {
        fetch(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=267&date=${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`
        )
          .then((resp) => resp.json())
          .then((resp) => {
            const temp = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (parseInt(ses.min_age_limit) < 45) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            dispatch({ type: "setglb", payload: temp });
            res("success");
          });
      })
    );

    prom.push(
      new Promise((res) => {
        fetch(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=294&date=${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`
        )
          .then((resp) => resp.json())
          .then((resp) => {
            const temp = resp.centers.filter((center: any) => {
              let retVal = false;
              for (const ses of center.sessions) {
                if (parseInt(ses.min_age_limit) < 45) {
                  retVal = true;
                  break;
                }
              }
              return retVal;
            });
            dispatch({ type: "setbbmp", payload: temp });
            res("success");
          });
      })
    );

    Promise.all(prom).then(() => {
      dispatch({ type: "setLoading", payload: false });
    });
  }, []);

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div className="App">
      <header className="bg-gray-900 font-bold text-gray-400 text-xl h-16 flex justify-center items-center border-gray-400 border-b">
        GLB and BBMP Vaccination slots
      </header>
      <div className="wrap">
        <div className="tabroot bg-gray-700 items-center flex gap-4 p-4">
          {["BBMP", "Gulbarga"].map((d) => (
            <button
              key={d}
              className="focus:outline-none hover:text-gray-100 text-gray-400"
              onClick={() => dispatch({ type: "setactiveward", payload: d })}
            >
              {d}
            </button>
          ))}
          <button
            className="focus:outline-none hover:text-gray-100 text-gray-400 ml-auto text-sm"
            onClick={() => LoadData()}
          >
            Refresh
          </button>
        </div>
        {getActiveComp(states)}
      </div>
    </div>
  );
}

export default App;