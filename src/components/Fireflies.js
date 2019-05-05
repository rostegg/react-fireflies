import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FPSStats from "react-fps-stats";
import ParamsController from './ParamsController'

class Firefly {

    constructor(canvasParams, settings){
        this.seed = Math.random() + .4; 

        this.context = canvasParams.canvasContext;
        this.width = canvasParams.width;
        this.height = canvasParams.height;
        
        this.x = Math.random()*this.width;
        this.y = Math.random()*this.height;
        
        this.speed = settings.speed;  
        this.size = settings.differentSize ? settings.size*this.seed : settings.size;
        this.color = settings.color;
        this.isGradient = settings.isGradient;
        this.fadeSpeedRate= settings.fadeSpeedRate;
        this.randomFadeTime = settings.randomFadeTime;
        this.fadeSpeed = 0;
        this.dx = (Math.random()*2) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random()*2) * (Math.random() < .5 ? -1 : 1);
    }

    move() {
        this.x += this.speed*Math.sin(this.dx);
		this.y += this.speed*Math.sin(this.dy);
		if (this.x > this.width || this.x < 0) this.dx *= -1;
		if (this.y > this.height || this.y < 0) this.dy *= -1;
    }

    buildGradientStyle(radius) {
        let style = this.context.createRadialGradient(this.x,this.y,0,this.x,this.y, radius*radius);
        const rgbColor = this.hexToRGB(this.color);
        style.addColorStop(0.0, `rgba(${rgbColor},1)`);
        style.addColorStop(0.1, `rgba(${rgbColor},0.3)`);
        style.addColorStop(1.0, `rgba(${rgbColor},0)`);
        return style;
    }

    show() {
        const radius = this.size * Math.abs(Math.cos(this.fadeSpeed));
        this.context.beginPath();
        this.context.arc(this.x,this.y,radius,0,2*Math.PI);
        this.context.closePath();
        
        this.fadeSpeed += this.fadeSpeedRate * (this.randomFadeTime ? this.seed : 1);
        this.context.fillStyle = this.isGradient ? this.buildGradientStyle(radius) : this.color;
        this.context.fill();
    }

    updateCanvasSize(width, height) {
        this.width = width;
        this.height = height;
        this.update();
    }

    updateSettings(settings) {
        this.speed = settings.speed;  
        this.size = settings.differentSize ? settings.size*this.seed : settings.size;
        this.color = settings.color;
        this.isGradient = settings.isGradient;
        this.fadeSpeedRate= settings.fadeSpeedRate;
        if (!settings.randomFadeTime)
            this.fadeSpeed = 0;
        this.randomFadeTime = settings.randomFadeTime;
        this.update();
    }

    update() {
        this.move();
        this.show();
    }

    hexToRGB(hex) {
        hex = parseInt(hex.replace('#',''), 16); 
        return [ (hex >> 16) & 255, (hex >> 8) & 255, hex & 255 ].join(',');
    }
}

const DEFAULT_SETTINGS = { 
    color: "#FF9B00",
    size: 4.7,
    speed: 0.1,
    blur: 0,
    count: 300,
    fadeSpeedRate: 0.01,
    differentSize: true,
    isGradient: true,
    randomFadeTime: true
}

class Fireflies extends Component{

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        updateInterval: PropTypes.number,
        settings: PropTypes.object,
        displayParamsChanger: PropTypes.bool,
        displayFpsStats: PropTypes.bool
    }

    static defaultProps = {
        ...Component.defaultProps,
        width: window.innerWidth,
        height: window.innerHeight,
        updateInterval: 15,
        displayParamsChanger: true,
        displayFpsStats: true
    }

    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            canvasContext: null,
            firefliesArray: [],
            settings: {...DEFAULT_SETTINGS, ...this.props.settings },
            width: this.props.width,
            height: this.props.height
        }
    }

    componentDidMount() {
        const canvas = document.getElementById('fireflies-canvas'),
            context = canvas.getContext("2d"),
            width = this.state.width,
            height = this.state.height;

        context.fillStyle = "rgba(30,30,30,1)";
        context.fillRect(0, 0, width, height);
        this.setState({
            canvas: canvas,
            canvasContext: context
        });
        
        const canvasParams = { canvasContext: context, width: width, height: height },
            settings = this.state.settings,
            fireflies = this.state.firefliesArray;

        for(let j = 0; j < settings.count; j++)
            fireflies.push(new Firefly(canvasParams, settings));
        
        this.setState({firefliesArray: fireflies});
        
        this.timerId = setInterval(() => this.draw(), this.props.updateInterval);

        window.addEventListener("resize", this.resizeWindow);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateFireflies = () => {
        const fireflies = this.state.firefliesArray;

        fireflies.forEach((firefly)=> {
            firefly.update();
        });
    } 

    draw = () => {
        const canvasContext = this.state.canvasContext,
            width = this.state.width,
            height = this.state.height;
        
        canvasContext.clearRect(0, 0, width, height);
        
        this.updateFireflies();
    }

    resizeWindow = () => {
        const width = window.innerWidth,
            height = window.innerHeight,
            fireflies = this.state.firefliesArray;
        
        fireflies.forEach((firefly) => { firefly.updateCanvasSize(width,height) });

        this.setState({
            width: width,
            height: height
        });
    }

    addFireflies = (arr,count) => {
        const canvasParams = { canvasContext: this.state.canvasContext, width: this.state.width, height: this.state.height },
            settings = this.state.settings;
        for(let j = 0; j < count; j++)
            arr.push(new Firefly(canvasParams, settings));
    }

    removeFireflies = (arr,count) => {
        arr.splice(arr.length - count);
    }

    paramChangedHandler = (data) => {
        const diff  = this.state.settings.count - data.count;
        const fireflies = this.state.firefliesArray;

        if (diff < 0)
            this.addFireflies(fireflies,Math.abs(diff));
    
        if (diff > 0)
            this.removeFireflies(fireflies,diff);
        
        fireflies.forEach(element => {
            element.updateSettings(data);
        });

        this.setState({ 
            firefliesArray: fireflies, 
            settings: data
        });
    }

    render() {
        const displayParamsChanger = this.props.displayParamsChanger,
            displayFpsStats = this.props.displayFpsStats;

        return (
            <>
                <canvas id="fireflies-canvas" width={this.state.width} height={this.state.height} style = {{ WebkitFilter: `blur(${this.state.settings.blur}px)` }}></canvas>
                { displayParamsChanger &&
                    <ParamsController data={this.state.settings} onParamChanged={this.paramChangedHandler} ></ParamsController> }
                { displayFpsStats &&
                    <FPSStats /> }    

            </>
        );
    }
}

export default Fireflies;