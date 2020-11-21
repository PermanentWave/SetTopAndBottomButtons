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

## このプログラムについて
ブラウザ上にページ最上部とページ最下部へ移動するボタンを追加します。  
AdGuardのuserscriptとしての運用が主な用途です。  
AdGuard Pro (for Windows/Android)上にて拡張機能としてデバッグしています。  
Greasemonkey、Tampermonkey、AdGuardで使用可能です。
PCでも使用できますが、HomeキーやEndキーで代用できます。

## アップデート URL
https://raw.githubusercontent.com/PermanentWave/SetTopAndBottomButtons/master/SetTopAndBottomButtons.user.js

## ライセンス
MIT License

## 更新履歴
<details><summary>変更履歴の表示</summary>  
  
Ver 1.00  
リリース  

Ver 1.01  
最下部より数ピクセル上に移動することがあったため、1%多めに移動するようにした  
高さを取得する要素を一部変更  

Ver 1.02  
スクロールの増加量を1%から5%へ変更  

Ver 1.03  
試験的変更 (最下部～最下部10pxの間は矢印が出ないように修正)  

Ver 1.04  
Ver 1.03の変更をロールバック

Ver 1.05  
関数の最適化  
(不要な関数の削除、ほとんどのブラウザのサポート)

Ver 1.06  
処理の最適化  
(押したボタンは常に非表示になる処理に変更)  

Ver 1.07  
バグ修正  
(最下部が検出できない場合があったバグを修正)

Ver 1.08  
自動でボタンを非表示にする機能を追加  
一部動作変更  
(ライセンスのURL変更)  

Ver 1.09  
クラスの概念を導入  
varの宣言をletもしくはconstに書き換えた  
全ての関数が何らかの値かtrueを返すようにした  
その他最適化  

Ver 1.10  
処理の最適化

Ver 1.11  
不要な演算の削除  

Ver 1.11.1  
読み込んだElementを定数とした  
説明の追記等  

Ver 1.11.2  
説明の変更  

Ver 1.12  
ファイル名の変更  
アップデートURLの変更  
関数の順番を変更  

Ver 1.13  
ボタンのアイコン変更  

Ver 2.0  
処理の刷新  

Ver 2.0.1  
処理の順番の変更  

Ver 2.0.2  
一部関数名の変更  

</details>  

Ver 2.1.0  
左利きモードの追加  
表示位置のY座標を変更する定数を導入した  