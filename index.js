import React from 'react';
import {
  AppRegistry,
  View,
  asset,
  AmbientLight,
  PointLight,
} from 'react-360';

//  import Planet from './modules/Planet';
 import * as constants from './modules/Constants';
import Entity from 'Entity';

export default class RadmirProject extends React.Component {
  constructor() {
    super();
    this.state = {
      rotation: 0,
    };
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
  }
  /**
   * After kickoff in componentDidMount(), rotate is called every frame through
   * requestAnimationFrame. It updates the state.rotation variable used to rotate
   * the model based om on time measurement; this is important to account for
   * different VR headset framerates.
   */
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({ rotation: this.state.rotation + delta / 60 });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }
  render() {
    var x = Math.cos(this.state.rotation / (640/constants.EARTH_SPEED));
    var y = Math.cos(this.state.rotation /(640/constants.EARTH_SPEED));
    var z = Math.sin(this.state.rotation /(640/constants.EARTH_SPEED));
    //   - A model that displays a rotating object
    //   - A point light, useful for adding color to the model material which would otherwise be dark.
    //   - Text message positioned above the creature
    // A chain of transformations is applied to the model, which are executed from right to left.
    // In out case, the model was too large for the scene and oriented sideways, so we scaled it and
    // rotated it into place. This would not be necessary if your object had correct size ot begin with.
    // We are also applying a new rotation around the Y axis every frame to produce the desired animation.
    return (
      <View>
        <AmbientLight intensity={1.3} />
        <PointLight
          style={{
            color: 'white',
            transform: [
              { translate: [0, 0, 0] }
            ]
          }}
        />
        {/* <Planet
        objectName="Sun"
        parentLocationX = {constants.SUN_LX}
        parentLocationY = {constants.SUN_LY}
        parentLocationZ = {constants.SUN_LZ}
        radiusOrbit = {constants.SUN_ORBIT}
        planetSize = {constants.SUN_SIZE}
        rotateX = {constants.SUN_RZ}
        rotateZ = {constants.SUN_RZ}
        universeSpeed = {constants.SUN_SPEED}
        />
        <Planet
        objectName="Mercury"
        parentLocationX = {0}
        parentLocationY = {0}
        parentLocationZ = {0}
        radiusOrbit ={constants.MERCURY_ORBIT}
        planetSize = {constants.MERCURY_SIZE}
        rotateX = {   constants.MERCURY_RZ}
        rotateZ = {   constants.MERCURY_RZ}
      universeSpeed ={constants.MERCURY_SPEED}
        />
        <Planet
        objectName="Venus"
        parentLocationX = {0}
        parentLocationY = {0}
        parentLocationZ = {0}
        radiusOrbit ={constants.VENUS_ORBIT}
        planetSize = {constants.VENUS_SIZE}
        rotateX = {   constants.VENUS_RZ}
        rotateZ = {   constants.VENUS_RZ}
      universeSpeed ={constants.VENUS_SPEED}
        />
        <Planet
        objectName="Earth"
        parentLocationX = {0}
        parentLocationY = {0}
        parentLocationZ = {0}
        radiusOrbit = {constants.EARTH_ORBIT}
        planetSize = {constants.EARTH_SIZE}
        rotateX = {constants.EARTH_RZ}
        rotateZ = {constants.EARTH_RZ}
        universeSpeed = {constants.EARTH_SPEED}
        />
        <Planet
        objectName="Moon"
        parentLocationX = {constants.EARTH_LX}
        parentLocationY = {constants.EARTH_LY}
        parentLocationZ = {constants.EARTH_LZ}
        radiusOrbit ={constants.MOON_ORBIT}
        planetSize = {constants.MOON_SIZE}
        rotateX = {   constants.MOON_RZ}
        rotateZ = {   constants.MOON_RZ}
      universeSpeed ={constants.EARTH_SPEED}
        /> */}
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Sun.mtl')
          }}
          lit={true} //The lit property specifies if the model will be affected by lights. 

          style={{   //The model’s ability to define a style enables us to apply 
            //different transformations such as   scaling, rotating, or translating.
            transform: [
              { translate: [0, 0, 0] },
              { scale: 0.1 },
              { rotateY: this.state.rotation / 4000000 }, //-130
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
          }}
        />
        <Entity
          wireframe={false}
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Mercury.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [50.02*Math.cos(this.state.rotation / (640/constants.MERCURY_SPEED)), Math.cos(this.state.rotation / (640/ constants.MERCURY_SPEED)), 50.02*Math.sin(this.state.rotation /  (640/constants.MERCURY_SPEED))] },
              { scale: 0.006 },
              { rotateY: this.state.rotation / 400 },
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Venus.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [93.06*Math.cos(-this.state.rotation /  (640/constants.VENUS_SPEED)), Math.cos(this.state.rotation / (640/constants.VENUS_SPEED)), 93.06*Math.sin(-this.state.rotation / (640/constants.VENUS_SPEED))] },
              { scale: 0.017 },
              { rotateY:this.state.rotation /  2048},
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Earth.mtl')
          }}
          lit={true}
          style={{
            transform: [ // радиус                            скорость
              { translateX: 129*x },
              { translateY: y },
              { translateZ: 129*z },
              { scale: 0.0183 },
              { rotateY: this.state.rotation /  8 },
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
            // transform: [
            //   { translate: [129.2544, 0, 0] },
            //   { scale: 0.0183 },
            //   { rotateY: this.state.rotation},
            //   { rotateX: 20 },
            //   { rotateZ: -10 }
            // ]
          }}
        />
        <Entity
          source={{ obj: asset('Earth.obj'), mtl: asset('Moon.mtl') }}
          lit={true} 
          style={{
            transform: [
              { translateX: 129*x + 10*Math.cos(this.state.rotation/(640/8)) },
              { translateY: y + Math.cos(this.state.rotation/(640/8)) },
              { translateZ: 129*z + 10*Math.sin(this.state.rotation/(640/8)) },
              { scale: 0.004 },
            ],
            // transform: [
            //   {translate: [129.2544, 19.22, 0] },
            //   {scale: 0.004 },
            // ],
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Mars.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [193.882*Math.cos(-this.state.rotation/(640/constants.MARS_SPEED)), Math.cos(this.state.rotation/(640/constants.MARS_SPEED)), 193.882*Math.sin(-this.state.rotation/(640/constants.MARS_SPEED))] },
              { scale: 0.009 },
              { rotateY: this.state.rotation/8 },
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Jupiter.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [288.031*Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)), Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)), 288.031*Math.sin(this.state.rotation/(640/constants.JUPITER_SPEED))] },
              { scale: 0.08 },
              { rotateY: this.state.rotation/3 }, //-130
              { rotateX: 20 },
              { rotateZ: -10 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Io.mtl')
          }}
          lit={true}
          style={{
            transform: [                                                       //31.1
              { translate: [288.031*Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)) + 50*Math.cos(this.state.rotation/(640/8)), Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)) + Math.cos(this.state.rotation/(640/8)), 288.031*Math.sin(this.state.rotation/(640/constants.JUPITER_SPEED)) + 50*Math.sin(this.state.rotation/(640/8))] },
              { scale: 0.005 },
            ],
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Europa.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [288.031*Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED))-33.55*Math.cos(this.state.rotation/(640/8)),Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)) -33.55*Math.cos(this.state.rotation/(640/8)), 288.031*Math.sin(this.state.rotation/(640/constants.JUPITER_SPEED)) - 33.55*Math.sin(this.state.rotation/(640/8))] },
              { scale: 0.004 },
            ],
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Ganymede.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [288.031*Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED))+37.5*Math.cos(this.state.rotation/(640/8)), Math.cos(this.state.rotation/(640/constants.JUPITER_SPEED)) + 37.5*Math.cos(this.state.rotation/(640/8)), 288.031*Math.sin(this.state.rotation/(640/constants.JUPITER_SPEED))+37.5*Math.sin(this.state.rotation/(640/8))] },
              { scale: 0.007 },
            ],
          }}
        />
        <Entity
          source={{
            obj: asset('Saturn.obj'),
            mtl: asset('Saturn.mtl')
          }}
          lit={false}
          style={{
            transform: [
              { translate: [428.272*Math.cos(-this.state.rotation/(650/constants.SARURN_SPEED)), Math.cos(this.state.rotation/(650/constants.SARURN_SPEED)), 428.272*Math.sin(-this.state.rotation/(650/constants.SARURN_SPEED))] },
              { scale: 0.06 },
              { rotateY: -40+this.state.rotation/6 },
              { rotateX: 80 },
              { rotateZ: 0 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Uranus.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [539.775*Math.cos(this.state.rotation/(640/constants.URANUS_SPEED)), 539.775*Math.cos(this.state.rotation/(640/constants.URANUS_SPEED)), 269.88*Math.sin(this.state.rotation/(640/constants.URANUS_SPEED))] },
              { scale: 0.05 },
              { rotateY: this.state.rotation/6 },
              { rotateX: -40 },
              { rotateZ: 35 }
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Earth.obj'),
            mtl: asset('Neptune.mtl')
          }}
          lit={true}
          style={{
            transform: [
              { translate: [772.639*Math.cos(-this.state.rotation/(640/constants.NEPTUNE_SPEED)), Math.cos(this.state.rotation/(640/constants.NEPTUNE_SPEED)), 772.639*Math.sin(-this.state.rotation/(640/constants.NEPTUNE_SPEED))] },
              { scale: 0.05 },
              { rotateY: this.state.rotation/5 },
              { rotateX: -40 },
              { rotateZ: 35 }
            ]
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('RadmirProject', () => RadmirProject);
