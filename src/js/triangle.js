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
      [prop] : (state[prop] || 0) + value,
      ["level"] : (state["level"] || 0) + value
    });
  };
};

export const changeState2 = (prop1, prop2) => {
  return (value1, value2) => {
    return (state) => ({
      ...state,
      [prop1] : (state[prop1] || 0) + value1,
      [prop2] : (state[prop2] || 0) + value2
    });
  };
};

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

export const changeStateNegative = (prop) => {
  return (value) => {
    return (state) => {
      if (state[prop] <=0) {
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
export const dropItem = changeStateNegative("inventory")(-1);

export const getShoes = changeState2("speed", "inventory")(2,1);
export const dropShoes = changeState2("speed", "inventory")(-2,-1);

if (typeof window !== 'undefined'){
  window.onload = function() {
    document.getElementById('super-speed').onclick = function() {
      const newState = stateControl(superSpeed);
      document.getElementById('speed-value').innerText = `${newState.speed}`;
      document.getElementById('level').innerText = `${newState.level}`;
    };
    
    document.getElementById('speed').onclick = function() {
      const newState = stateControl(speed);
      document.getElementById('speed-value').innerText = `${newState.speed}`;
      document.getElementById('level').innerText = `${newState.level}`;
    };

    document.getElementById('jump').onclick = function() {
      const newState2 = stateControl(jump);
      document.getElementById('jump-value').innerText = `${newState2.jump}`;
      document.getElementById('level').innerText = `${newState2.level}`;
    };
    document.getElementById('super-jump').onclick = function() {
      const newState2 = stateControl(superJump);
      document.getElementById('jump-value').innerText = `${newState2.jump}`;
      document.getElementById('level').innerText = `${newState2.level}`;
    };
    document.getElementById('strength').onclick = function() {
      const newState3 = stateControl(strength);
      document.getElementById('strength-value').innerText = `${newState3.strength}`;
      document.getElementById('level').innerText = `${newState3.level}`;
    };
    document.getElementById('super-strength').onclick = function() {
      const newState3 = stateControl(superStrength);
      document.getElementById('strength-value').innerText = `${newState3.strength}`;
      document.getElementById('level').innerText = `${newState3.level}`;
    };
    document.getElementById('getItem').onclick = function() {
      const newState3 = stateControl(getItem);
      document.getElementById('item-value').innerText = `${newState3.inventory}`;
    };
    document.getElementById('dropItem').onclick = function() {
      const newState3 = stateControl(dropItem);
      document.getElementById('item-value').innerText = `${newState3.inventory}`;
    };

    document.getElementById('getShoes').onclick = function() {
      const newState3 = stateControl(getShoes);
      document.getElementById('item-value').innerText = `${newState3.inventory}`;
      document.getElementById('speed-value').innerText = `${newState3.speed}`;
    };
    document.getElementById('dropShoes').onclick = function() {
      const newState3 = stateControl(dropShoes);
      document.getElementById('item-value').innerText = `${newState3.inventory}`;
      document.getElementById('speed-value').innerText = `${newState3.speed}`;
    };
    // document.getElementById('show-state').onclick = function() {
    //   const currentState = stateControl();
    //   document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
    // };
  };
}