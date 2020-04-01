class Timer {
    constructor(callback = () => {}) {
        this.callback = callback;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(() => {
            this.time++;
            this.callback(this.time);
        }, 1000);
    }
 
    stop() {
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer = null;
    }
}

export default Timer;