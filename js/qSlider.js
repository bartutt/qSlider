class Slider {

    constructor (src, options = {}) {    
       
        /* 
        * source 
        */ 
        this.quotesContainer = document.querySelector(src);
        this.quotes = this.quotesContainer.querySelectorAll(".cite");      
        
        /* 
        * slide controllers 
        */ 
        this.leftArr = this.quotesContainer.querySelector(".left");
        this.rightArr = this.quotesContainer.querySelector(".right");
        
        /* 
        * default options 
        */  
        this.slide = options.slide || 0;
        this.changeType = options.changeType || 'counter';
        this.animation = options.animation || 'from-left';
        this.duration = options.duration || 1;
        this.amt = options.amt || 'ease-in-out';
      }
    


    /* 
    * Get the size of the longest quote
    */ 
    getElementHeight() {
        
        const heights = [];
        
        for (let q of this.quotes)
            heights.push(q.offsetHeight);
        
        const biggest = Math.max(...heights);
        
            return biggest + "px";
    }

    /* 
    * Set container height to height of longest quote to prevent moving content
    */ 
    setElementHeight(height) {
        
        this.quotesContainer.style.setProperty("height", height);

    }

    /* 
    * This function display controller arrows if this.controllers = true
    * hide arrow if slide is first/last
    */ 
    setLimitController(slideNr) {

        if (this.rightArr && this.leftArr) {

            if (slideNr < this.quotes.length - 1) {
                this.rightArr.classList.remove("hide-arrow");
            } else {
                this.rightArr.classList.add("hide-arrow");
            }

            if (slideNr > 0) {
                this.leftArr.classList.remove("hide-arrow");
            } else {
                this.leftArr.classList.add("hide-arrow");
            }
        }
    }

    /* 
    * Listen for event, change to next slide if current slide is not last
    */ 
    setRightController() {
        this.rightArr.addEventListener("click", () => {
            
            if (this.slide < this.quotes.length - 1) {
                this.slide++;
                this.showSlide(this.slide);
                this.setTimer();
            }           
        });
    }  

    /* 
    * Listen for event, change to previous slide if current slide is not first
    */ 
    setLeftController() {
        this.leftArr.addEventListener("click", () => {
           
            if (this.slide > 0) {
                this.slide--;
                this.showSlide(this.slide);
                this.setTimer();
            }           
        });
    }  

    /* 
    * set slide timer 
    */
    setTimer() {
        
        clearInterval(this.timer);

        this.timer = setInterval( () => {         
            this.setCounter();
            this.showSlide(this.slide);
            
        }, `${this.duration}000`)
    }
    
    /* 
    * Choose random slide
    * @param min
    * @param max
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
    * show slide
    * @param nr - slide nr
    */
    showSlide(slideNr) {

        this.setLimitController(slideNr);

            
        for (let i = 0; i < this.quotes.length; i++) {
            
            if (i === slideNr){
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
        
        /* 
        * get container height
        */
        const height = this.getElementHeight();
        
        /* 
        * set container height
        */
        this.setElementHeight(height);


        /* 
        * init first slide 
        */
        this.showSlide(this.slide);

        /* 
        * init timer 
        */
        this.setTimer();
        
        /* 
        * init slide controllers(arrows)
        */
        if (this.rightArr && this.leftArr) {
            
            this.setRightController();
            this.setLeftController();
        }
    }     
}



