export const reducer = (currState: any, action: any) => {
  switch (action.type) {
    case "setSelcted": {
      return {
        ...currState,
        Selected: {
          name: action.selname,
          centers: [...action.payload],
          centers18A: [...action.payload18Dose1],
          centers18B: [...action.payload18Dose2],
          centers45A: [...action.payload45Dose1],
          centers45B: [...action.payload45Dose2],
        },
      };
    }
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
    case "setDarkMode": {
      return {
        ...currState,
        isDark: action.payload,
      };
    }

    default:
      return currState;
  }
};
