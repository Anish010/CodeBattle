import { useState } from 'react';

const useMultipleState = (initialState) => {
  // Create an object to store all state values
  const [state, setState] = useState(initialState);

  // Create a function to update a specific state value
  const setMultipleStates = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return [state, setMultipleStates];
};

export default useMultipleState;
