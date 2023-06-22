export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

export const stateControl = storeState();

// This is a function factory. 
export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

// export const changeStateLimited = (prop) => {
//   return (value) => {
//     return (state) => ({
//       ...state,
//       [prop] : if (state <= 3) {
//         (state[prop] || 0) + value}
//     });
//   };
// };



export const changeStateLimited = (prop) => {
  return (value) => {
    return (state) => {
      if (state[prop] >=3) {
        return state;
      }
      return {
        ...state,
        [prop] : (state[prop] || 0) + value
      };
    };
  };
};

// We create four functions using our function factory. 
export const speed = changeState("speed")(1);
export const superSpeed = changeState("speed")(5);

export const jump = changeState("jump")(1);
export const superJump = changeState("jump")(5);

export const strength = changeState("strength")(1);
export const superStrength = changeState("strength")(5);

export const getItem = changeStateLimited("inventory")(1);

if (typeof window !== 'undefined'){
  window.onload = function() {
    document.getElementById('super-speed').onclick = function() {
      const newState = stateControl(superSpeed);
      document.getElementById('speed-value').innerText = `Speed: ${newState.speed}`;
    };
    
    document.getElementById('speed').onclick = function() {
      const newState = stateControl(speed);
      document.getElementById('speed-value').innerText = `Speed: ${newState.speed}`;
    };

    document.getElementById('jump').onclick = function() {
      const newState2 = stateControl(jump);
      document.getElementById('jump-value').innerText = `Jump: ${newState2.jump}`;
    };
    document.getElementById('super-jump').onclick = function() {
      const newState2 = stateControl(superJump);
      document.getElementById('jump-value').innerText = `Jump: ${newState2.jump}`;
    };

    document.getElementById('strength').onclick = function() {
      const newState3 = stateControl(strength);
      document.getElementById('strength-value').innerText = `Strength: ${newState3.strength}`;
    };
    document.getElementById('super-strength').onclick = function() {
      const newState3 = stateControl(superStrength);
      document.getElementById('strength-value').innerText = `Strength: ${newState3.strength}`;
    };
    document.getElementById('getItem').onclick = function() {
      const newState3 = stateControl(getItem);
      document.getElementById('item-value').innerText = `Inventory: ${newState3.inventory}`;
    };
    // document.getElementById('show-state').onclick = function() {
    //   const currentState = stateControl();
    //   document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
    // };
  };
}