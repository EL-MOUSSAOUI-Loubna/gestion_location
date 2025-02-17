export const saveState = (state) => {
    try {
        console.log("Saving state to localStorage:", state);

      const strState = JSON.stringify(state);    //convert json object to json text
      localStorage.setItem("reduxState", strState);
    } catch (err) {
      console.error("Error saving state to localStorage", err);
    }
  };

  
  export const loadState = () => {
    try {
      const strState = localStorage.getItem("reduxState");
      return strState ? JSON.parse(strState) : undefined;     //reconvert json string to json object
    } catch (err) {
      console.error("Error loading state from localStorage", err);
      return undefined;
    }
  };