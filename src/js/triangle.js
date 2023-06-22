export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

export const stateControl = storeState();
// export const newPlant = storeState();

// This is a function factory. 
export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

// We create four functions using our function factory. 
export const feed = changeState("soil")(1);
export const superFood = changeState("soil")(5);

export const water = changeState("water")(1);
export const superWater = changeState("water")(5);

export const giveLight = changeState("light")(1);
export const superLight = changeState("light")(5);

if (typeof window !== 'undefined'){
  window.onload = function() {
    document.getElementById('feed').onclick = function() {
      const newState = stateControl(superFood);
      document.getElementById('soil-value').innerText = `Soil: ${newState.soil}`;
    };

    document.getElementById('water').onclick = function() {
      const newState2 = stateControl(superWater);
      document.getElementById('water-value').innerText = `Water: ${newState2.water}`;
    };

    document.getElementById('give-sunlight').onclick = function() {
      const newState3 = stateControl(superLight);
      document.getElementById('light-value').innerText = `Light: ${newState3.light}`;
    };
  };
}