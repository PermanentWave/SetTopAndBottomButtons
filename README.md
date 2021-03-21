## What's this?
Set buttons to jump to top and bottom on the Web page.  
The main purpose of this is to serve as a userscript for AdGuard.  
This script is debuged with AdGuard Pro (for Windows/Android) as Extension.  
This userscript can be used with Greasemonkey, Tampermonkey and AdGuard.  
This userscript can be used on a PC, but you can use the Home key and End key instead.  

## Update URL  
https://raw.githubusercontent.com/PermanentWave/SetTopAndBottomButtons/master/SetTopAndBottomButtons.user.js  

## License  
MIT License  

## Settings  
You can change this code saved your device.  
* LAYER_INDEX (Default: 1001)  
  Set priority if you use other script.  
* Y_POSITION_OFFSET (Default: 0)  
  Set position of buttons. Position of buttons is raised if you set positive value, and downed if you set negative value.  
* IDLE_TIMEOUT (Default: 2000)  
  Set the milisecond of hiding buttons.  
* AUTO_HIDE_MODE (Default: true)  
  Set true or false. true: Buttons are hided after IDLE_TIMEOUT. false: Buttons are showed.  
* LEFTY_MODE (Default: false)  
  Set true or false. true: Set buttons on the left. false: Set buttons on the right.  

## History
<details><summary>Show all History</summary>  

Ver 1.00  
First Release  

Ver 1.01  
Bottom Scroll can't work collectly, so add scroll amount +1% (x1.01)  
Change Element of getting Height.  

Ver 1.02  
Change scroll amount 1% (x1.01) -> 5% (x1.05)  

Ver 1.03  
Test Change  

Ver 1.04  
Undo Change  

Ver 1.05  
Optimization function  
(Remove no-used function, all browser support)  

Ver 1.06  
Optimization script  
(Remove button when button is clicked)  

Ver 1.07  
BugFix  
(Get correct bottom position)  

Ver 1.08  
Add "Auto Hide" function  
Change method  
(Change to refer license URL)  

Ver 1.09  
Introduce function as class  
Change define (var -> let, const)  
All function return value or true  
Optimization  

Ver 1.10  
Optimize  

Ver 1.11  
Optimize  

Ver1.11.1  
Change let -> const element  
Add description  

Ver1.11.2  
Change description  

Ver1.12  
Change filename  
Change Update URL  
Change order of function  

Ver1.13  
Change button images  

Ver2.0.0  
Optimize  

Ver2.0.1  
Optimize  

Ver2.0.2  
Optimize  

</details>  

Ver2.1.0  
Add Lefty mode  
Add Offset Y-Position  