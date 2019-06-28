Just experiment with canvas 2d contex and particles, powered by React. ([Demo Link](https://rostegg.github.io/react-fireflies/))

## Run dev
Project consists of two parts: 
* `src` - contain main module
* `example` - react-create-app for demo

1. Clone repository `git clone https://github.com/rostegg/react-fireflies.git`
2. `cd react-fireflies && npm install && npm start`  
3. Now main project is ready for development.
4. For demo, open new terminal and `cd example && npm install && npm start`
5. Open http://localhost:3000/

## Deploy to github.io
Before deploy change `repository` in `package.json`
1. `npm run-script build`
2. `npm run-script predeploy`
3. `npm run-script deploy`

## How to use?

```
import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import Fireflies from 'react-fireflies'

ReactDOM.render(<Fireflies />, document.getElementById('root'))

```
### Props
| Name                 | Value            | Default             | Description                                  |
| ---------------------|:----------------:| -------------------:|---------------------------------------------:|
| width                | PropTypes.number | window.innerWidth   | Canvas width                                 |
| height               | PropTypes.number | window.innerHeight  | Canvas height                                |
| updateInterval       | PropTypes.number | 15                  | Interval for update canvas (in ms)           |
| settings             | PropTypes.object | [More](#settings)   | [More](#settings)                            |
| displayParamsChanger | PropTypes.bool   | true                | Enable/disable panel for manipulate settings |
| displayFpsStats      | PropTypes.bool   | true                | Enable/disable panel for display FPS         |

### Settings
Settings allow to manipulate fireflies particles on canvas.  

| Name           | Value            | Default   | Description                                     |
| ---------------|:----------------:| ---------:|------------------------------------------------:|
| color          | Hex string       | "#FF9B00" | Fireflies color                                 |
| size           | Number           | 4.7       | Firefly size                                    |
| speed          | Number           | 0.1       | Firefly move speed                              |
| blur           | Number           | 0         | Blur effect for canvas (affect FPS)             |
| count          | Integer number   | 300       | Fireflies count                                 |
| fadeSpeedRate  | Boolean          | 0.01      | Flashing intensity                              |
| differentSize  | Boolean          | true      | Different size for all fireflies                |
| isGradient     | Boolean          | true      | Graditent effect to draw a firefly (affect FPS) |
| randomFadeTime | Boolean          | true      | Each firefly flashing at random time            |
