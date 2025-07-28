"use strict"

import Canvas from "./canvas.js";
// import Sprite from "./sprite";
import Button from "./button.js";
import Input from "./input.js";
import Dialog from "./dialog.js";

var canvas=new Canvas("gameCanvas",935,935)

<<<<<<< HEAD
import("./zty/zty.js")
=======
import("./zyy/zyy.js")
>>>>>>> main
    .then(module=>{
        module.default.init(canvas);
    });

