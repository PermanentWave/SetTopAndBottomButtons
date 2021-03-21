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

## 設定  
自身のスマートフォンにスクリプトを保存し、以下のコードを書き換えることで動作を変更できます。  
* LAYER_INDEX (デフォルト値: 1001)  
  他の画面設置系スクリプトとの優先度を指定する。  
* Y_POSITION_OFFSET (デフォルト値: 0)  
  ボタンの位置を指定する。+の値を入れるとボタンの位置が上に移動する。また-の値をボタンの位置が下に移動する。  
* IDLE_TIMEOUT (デフォルト値: 2000)  
  ボタンが非表示になるまでの時間(ms)を指定する。  
* AUTO_HIDE_MODE (デフォルト値: true)  
  trueの場合はIDLE_TIMEOUTの時間に応じてボタンが非表示になる。falseの場合はボタンを常に表示する。  
* LEFTY_MODE (デフォルト値: false)  
  trueの場合はボタンが画面左に設置される。falseの場合は画面右に設置される。  

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