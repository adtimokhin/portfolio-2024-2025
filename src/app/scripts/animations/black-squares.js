/**
 * This array contains normalized values for flickering intervals.
 *
 * The values are between 1 and 51 (only odd numbers).
 *
 * If you do not like the order in which the rectangles flicker, you can re-make this array
 * To do so, consider finding a noise b/w map image, read pixel values and normalize them in the same range of values.
 */
const flickers = [
  17, 31, 39, 9, 27, 37, 31, 25, 19, 11, 13, 15, 17, 17, 13, 7, 29, 39, 47, 11,
  27, 37, 41, 11, 15, 19, 33, 31, 23, 9, 29, 33, 33, 23, 19, 13, 27, 31, 33, 9,
  33, 39, 41, 13, 7, 7, 33, 35, 29, 11, 35, 43, 43, 29, 23, 17, 25, 23, 21, 13,
  27, 21, 15, 15, 19, 23, 25, 27, 31, 41, 19, 17, 25, 37, 29, 15, 15, 15, 17,
  39, 11, 25, 35, 13, 15, 17, 23, 27, 31, 43, 21, 21, 29, 43, 31, 7, 23, 19, 15,
  39, 3, 29, 43, 15, 13, 15, 25, 29, 33, 45, 21, 21, 31, 43, 33, 9, 25, 19, 15,
  39, 27, 29, 29, 25, 31, 35, 37, 47, 49, 45, 11, 9, 21, 19, 29, 43, 3, 17, 33,
  35, 37, 39, 39, 25, 27, 29, 45, 25, 23, 37, 21, 15, 15, 7, 13, 21, 13, 19, 27,
  45, 41, 43, 41, 25, 27, 31, 45, 15, 9, 35, 27, 21, 11, 7, 11, 15, 21, 19, 19,
  41, 45, 43, 39, 23, 35, 41, 27, 9, 11, 39, 35, 27, 15, 23, 23, 23, 29, 15, 3,
  19, 39, 37, 35, 25, 23, 23, 35, 15, 9, 21, 23, 31, 43, 31, 23, 9, 9, 19, 31,
  45, 31, 31, 29, 25, 27, 25, 29, 21, 15, 13, 21, 31, 45, 29, 23, 17, 5, 21, 39,
  37, 19, 19, 21, 23, 35, 37, 13, 27, 27, 3, 21, 29, 37, 25, 29, 37, 5, 23, 43,
  17, 41, 29, 21, 31, 41, 43, 35, 17, 17, 37, 45, 43, 37, 41, 39, 31, 13, 11,
  11, 29, 31, 25, 19, 27, 29, 31, 35, 23, 19, 35, 41, 39, 35, 37, 35, 29, 17,
  13, 13, 29, 7, 13, 17, 19, 7, 5, 31, 31, 29, 25, 29, 31, 33, 29, 29, 27, 19,
  21, 25, 25, 7, 7, 7, 11, 9, 9, 11, 25, 27, 17, 25, 21, 9, 45, 43, 33, 45, 37,
  29, 41, 27, 15, 7, 13, 11, 13, 23, 17, 15, 11, 17, 21, 29, 29, 29, 29, 37, 31,
  25, 39, 45, 25, 9, 15, 13, 17, 37, 13, 3, 7, 9, 23, 47, 15, 15, 27, 27, 23,
  21, 35, 27, 33, 35, 3, 9, 15, 31, 35, 37, 39, 37, 23, 1, 45, 45, 37, 11, 15,
  19, 31,
];

export class BlackSquareAnimObject {
  constructor(rows, cols, time, color, elementToAnim, elementId) {
    // Getting dimensions of the element
    const { width, height, top, left } = elementToAnim.getBoundingClientRect();
    this.rectNum = rows * cols;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;

    this.rows = rows;
    this.cols = cols;
    this.time = time;
    this.color = color;
    this.elementToAnim = elementToAnim;
    this.elementId = elementId;

    this.animationDurMult = 0; // animation duration in terms of frames
    this.tunedFlickers = []; // tuned to this animation flickers
    this.areOn = []; // boolean array that shows whether the rectangle is toggled to be black
    this.tunedFlickers = []; // This array contains flicker delay multiplied by the animation duration
    this.delta = 1;
    this.paused = true;

    // Create a canvas and place it over the element
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = "absolute";
    this.canvas.style.top = `${this.top + window.scrollY}px`; // Element position + the offset from the top of the page (in case need to scroll)
    this.canvas.style.left = `${this.left}px`;
    this.canvas.style.zIndex = "100";
    this.canvas.id = `canvas-${this.elementId}`;

    // creating context
    this.ctx = this.canvas.getContext("2d");
    this.prefillCanvas();

    // Add canvas onto screen
    document.body.appendChild(this.canvas);

    // Doing pre-animation calculations
    this.calculatePreAnimValues();
    this.setRectData();

    this.animate();

    setTimeout(()=>{
      this.start()
    }, 100)
  }

  prefillCanvas() {
    // Drawing a solid block until animation starts playing
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  calculatePreAnimValues() {
    this.animationDurMult = this.time / 1000;
    for (let i = 0; i < this.rectNum; i++) {
      this.tunedFlickers.push(
        Math.floor(this.animationDurMult * flickers[i % flickers.length])
      );
    }
  }

  setRectData() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.areOn.push(true); // Initially each square is "on"
      }
    }
  }

  animate() {
    function animationLoop() {
      console.log("CHECKING");
      
      if (!this.paused) {
        console.log("NOT PAUSED");
        console.log("this", this);
        
        
        this.delta = this.delta + 1;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.flickerRects();

        if (this.delta / 60 >= this.animationDurMult) {
          document.body.removeChild(this.canvas); // Deleting the canvas
          return;
        }
      }
      window.requestAnimationFrame(animationLoop.bind(this));
    }
    window.requestAnimationFrame(animationLoop.bind(this));
  }

  start() {
    console.log("STRATING");
    
    this.paused = false;
  }

  flickerRects() {
    const rectHeight = this.height / this.cols;
    const rectWidth = this.width / this.rows;

    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        // Check if to draw a rectangle in this spot

        const rectId = i * (j + 1);

        if (this.delta % this.tunedFlickers[rectId] == 0) {
          // Toggle state of the rect
          this.areOn[rectId] = false;
        }

        if (this.areOn[rectId]) {
          // Draw rect
          this.ctx.fillRect(
            j * rectWidth,
            i * rectHeight,
            rectWidth,
            rectHeight
          );
        }
      }
    }
  }
}

// /**
//  *
//  * This animation works as follows: On top of the element that is being animated a 2d canvas will be added
//  * It will be prefilled with rectangles of a given color.
//  *
//  * With certain (seemingly random) intervals these rectangles will be removed from canvas
//  * This will slowly reveal the element beneath
//  *
//  * As soon as the animation is complete, the canvas will be removed from the document.
//  *
//  * The animation will begin playing only after the ${@link play} function has been called.s
//  *
//  * @param {Number} rows - number of rows of the rectangles on canvas
//  * @param {Number} cols - number of columns of the rectangles on canvas
//  * @param {String} color - A string value of the color of the reactangles. Use any color representation you like, make sure it is supported by HTML
//  * @param {Number} time - time of the animation in milliseconds
//  * @param {HTMLElement} elementToAnim - HTML Element to add entering animation to
//  * @param {String} elementId - Id of the animated element. It is used to add unique id to canvas. It will follow the convention: "#canvas-[elementId]"
//  */
// export function animateEnter(
//   rows,
//   cols,
//   color,
//   time,
//   elementToAnim,
//   elementId
// ) {
//   // Getting dimensions of the element
//   const { width, height, top, left } = elementToAnim.getBoundingClientRect();
//   const rectNum = rows * cols;

//   // Create a canvas and place it over the element
//   const canvas = document.createElement("canvas");
//   canvas.width = width;
//   canvas.height = height;
//   canvas.style.position = "absolute";
//   canvas.style.top = `${top + window.scrollY}px`; // Element position + the offset from the top of the page (in case need to scroll)
//   canvas.style.left = `${left}px`;
//   canvas.style.zIndex = "100";
//   canvas.id = `canvas-${elementId}`;

//   // creating context
//   const ctx = canvas.getContext("2d");

//   // prepopulating the canvas
//   setRectData(cols, rows);

//   // Drawing a solid block until animation starts playing
//   ctx.strokeStyle = color;
//   ctx.fillStyle = color;
//   ctx.fillRect(0, 0, width, height);

//   // finding values for tunedFlickers
//   const animationDurMult = time / 1000;
//   for (let i = 0; i < rectNum; i++) {
//     tunedFlickers.push(
//       Math.floor(animationDurMult * flickers[i % flickers.length])
//     );
//   }

//   document.body.appendChild(canvas);
//   // Animation loop
//   let delta = 1;

//   function animationFunc() {
//     if (!paused) {
//       delta++;
//       ctx.clearRect(0, 0, width, height);

//       flickerRects(ctx, cols, rows, color, height, width, delta);
//     }

//     // Check if the animation is over
//     if (delta / 60 >= animationDurMult) {
//       document.body.removeChild(canvas); // Deleting the canvas
//       return;
//     }
//     window.requestAnimationFrame(animationFunc);
//   }
//   window.requestAnimationFrame(animationFunc);
// }

// /**
//  * Call this function to activate animation loop.
//  *
//  * After that the animation will handle the cleaning on its own.
//  */
// export function play() {
//   if (paused) paused = false;
// }

// //-------------------------- PRIVATE FUNCTIONS --------------------------//
// /**
//  *
//  * Will set data about the rectangles
//  *
//  * @param {CanvasRenderingContext2D} ctx - Canvas context
//  * @param {Number} rows -  number of rows. Must be passed as an int >0
//  * @param {Number} cols - number of cols. Must be passed as an int >0
//  * @param {String} color - any color format accepted by HTML
//  * @param {Number} height - height of the canvas in px
//  * @param {Number} width - width of the canvas in px
//  */
// function setRectData(rows, cols) {
//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       areOn.push(true); // Initially each square is "on"
//     }
//   }
// }

// /**
//  *
//  * This function will draw rectangles on canvas using the flickers[] array
//  * and delta to decide which rectangles to draw and which ones to skip.
//  *
//  * The rectangle is drawn only if the correpsonding flickering is fully
//  * divisible by the delta.
//  *
//  * @param {CanvasRenderingContext2D} ctx - Canvas context
//  * @param {Number} rows -  number of rows. Must be passed as an int >0
//  * @param {Number} cols - number of cols. Must be passed as an int >0
//  * @param {String} color - any color format accepted by HTML
//  * @param {Number} height - height of the canvas in px
//  * @param {Number} width - width of the canvas in px
//  * @param {Number} delta - positive integer that shows number of 1/60th seconds passed since animation began
//  */
// function flickerRects(ctx, rows, cols, color, height, width, delta) {
//   const rectHeight = height / cols;
//   const rectWidth = width / rows;

//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       // Check if to draw a rectangle in this spot

//       const rectId = i * (j + 1);

//       if (delta % tunedFlickers[rectId] == 0) {
//         // Toggle state of the rect
//         areOn[rectId] = false;
//       }

//       if (areOn[rectId]) {
//         // Draw rect
//         ctx.strokeStyle = color;
//         ctx.fillStyle = color;
//         ctx.fillRect(j * rectWidth, i * rectHeight, rectWidth, rectHeight);
//       }
//     }
//   }
// }
