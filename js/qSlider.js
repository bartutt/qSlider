class Slider {

    constructor (src, options = {}) {    
       
        /* source */ 
        this.quotes = document.querySelectorAll(src);

        /* slide controllers */ 
        this.leftArr = document.querySelector(".left");
        this.rightArr = document.querySelector(".right");
        
        /* default options */  
        this.slide = options.slide || 0;
        this.changeType = options.changeType || 'counter';
        this.animation = options.animation || 'from-left'
        this.duration = options.duration || 1
        this.amt = options.amt || 'ease-in-out';
      }


    setRightController() {
        this.rightArr.addEventListener("click", () => {
            
            if (this.slide < this.quotes.length - 1) {
                this.slide++;
                this.show(this.slide);
                this.setTimer();
            }
            
        });

    }  

    setLeftController() {
        this.leftArr.addEventListener("click", () => {
           
            if (this.slide > 0) {
                this.slide--;
                this.show(this.slide);
                this.setTimer();
            }
                   
            
        });
    }  

    /* set slide timer */
    setTimer() {
        
        clearInterval(this.timer);

        this.timer = setInterval( () => {         
            this.setCounter();
            this.show(this.slide);
            
        }, `${this.duration}000`)
    }
    
    /* 
    * 
    */
    setRandomSlide(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    /* 
    * 
    */
    setCounter() {
        if (this.slide === this.quotes.length - 1)
            return this.slide = 0;
        else 
            return this.slide++;
        
    }

    /* 
    * show slide given in parameter
    * @param nr
    */
    show(nr) {
            
            for (let i = 0; i <= this.quotes.length - 1; i++) {

                if (i === nr){
                    this.quotes[i].style.display = "inline-block";
                    this.quotes[i].style.setProperty("animation-duration", `${this.duration}s`);
                    this.quotes[i].style.setProperty("animation-timing-function", this.amt);
                    this.quotes[i].classList.add(this.animation);
                } else {
                    this.quotes[i].style.display = "none";
                }               
            }
              
    }
    /* 
    * initialize slideshow
    */
    init() {

        /* init first slide */
        this.show(this.slide);

        /* init timer */
        this.setTimer();

        /* init slide controllers */
        this.setRightController();
        this.setLeftController();
       
    }
       
}



