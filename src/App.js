import React, {Suspense} from 'react';
import {Canvas} from "@react-three/fiber";

import Three from "./Three/Three";

import './App.scss';

function App() {
  return (
    <div className='App'>
      <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
