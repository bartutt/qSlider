class Slider {

    constructor (src, options = {}) {    
       
        /* source */ 
        this.quotes = document.querySelectorAll(src);
        
        /* default options */  
        this.slide = options.slide || 0;
        this.changeType = options.changeType || 'counter';
        this.animation = options.animation || 'from-left'
        this.duration = options.duration || 1
        this.amt = options.amt || 'ease-in-out';
      }

    /* set time interval for display slide */
    interval() {
        setInterval( () => {

            this.counter();
            this.show(this.slide);
            
        }, `${this.duration}000`)
    }
    
    /* 
    * 
    */
    randomSlide(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    }

    /* 
    * 
    */
    counter() {
        if (this.slide === this.quotes.length - 1)
            return this.slide = 0;
        else 
            return this.slide++;
        
    }

    /* 
    * show slide gived in parameter
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

        this.show(this.slide);
        this.interval();
       
    }
       
}



