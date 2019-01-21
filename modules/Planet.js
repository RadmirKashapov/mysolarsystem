import React from 'react';
import {
    View,
    asset,
} from 'react-360';

import Entity from 'Entity';

export default class Planet extends React.Component {
    constructor() {
        super();
        this.state = {
            rotation: 0
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

        this.setState({ rotation: this.state.rotation + delta / 20 });
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
        const {
            objectName,
            parentLocationX,
            parentLocationY,
            parentLocationZ,
            radiusOrbit,
            planetSize,
            rotateX,
            rotateZ,
            universeSpeed
        } = this.props;
        return (
            <View>
                <Entity
                    source={{
                        obj: asset('Earth.obj'),
                        mtl: asset(objectName + '.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            { translateX: parentLocationX*Math.cos(this.state.rotation / (640/universeSpeed)) + radiusOrbit * Math.cos(this.state.rotation / (640/universeSpeed)) },
                            { translateY: parentLocationY*Math.cos(this.state.rotation / (640/universeSpeed)) + Math.cos(this.state.rotation / (640/universeSpeed)) },
                            { translateZ: parentLocationZ*Math.sin(this.state.rotation / (640/universeSpeed)) + radiusOrbit *Math.sin(this.state.rotation / (640/universeSpeed)) },
                            { scale: planetSize },
                            { rotateY: this.state.rotation / (640/universeSpeed) },
                            { rotateX: rotateX },
                            { rotateZ: rotateZ }
                        ]
                    }}
                />
            </View>
        );
    }

};