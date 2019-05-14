import 'react-dat-gui/build/react-dat-gui.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DatGui, { DatColor, DatNumber, DatBoolean } from 'react-dat-gui';

class ParamsController extends Component {
  static propTypes = {
    data: PropTypes.object,
    onParamChanged: PropTypes.func
  }

  render() {
    const data = this.props.data;
    return (
      <DatGui data={data} onUpdate={this.props.onParamChanged}>
        <DatColor path='color' label='Color' />
        <DatNumber path='count' label="Count" min={0} max={5000} step={50}/>
        <DatNumber path='blur' label="Blur" min={0} max={3} step={0.1}/>
        <DatNumber path='size' label="Size" min={0.1} max={10} step={0.1}/>
        <DatNumber path='speed' label="Speed" min={0} max={6} step={0.1}/>
        <DatNumber path='fadeSpeedRate' label="Fade speed rate" min={0} max={0.4} step={0.01}/>
        <DatBoolean path="randomFadeTime" label="Random fade time" />
        <DatBoolean path="differentSize" label="Different size" />
        <DatBoolean path="isGradient" label="Gradient style" />
      </DatGui>
    )
  }
}

export default ParamsController;