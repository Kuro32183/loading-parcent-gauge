import React, { useEffect } from 'react'

const Loading = () => {
  useEffect(() => {
    const images = document.getElementsByTagName('img') // ページ内のimgタグを取得
    const loadingArea = document.getElementById('bl_loading') // ローディング画面全体
    const percentNumber = document.getElementById('bl_loadingPercentNumber') // ●%の●部分
    const loadingGauge = document.getElementById('bl_loadingGaugeMeter') // リアルタイムで読み込まれるゲージ部分
    let imgCounting = 0
    let baseCounting = 0
    const gaugeWidth = 100 // ゲージの全体幅
    let current

    // 画像の読み込み
    for (let i = 0; i < images.length; i++) {
      const img = new Image() // 新たなimg要素を作成
      // 画像読み込み完了したとき
      img.onload = function () {
        imgCounting += 1
      }
      // 画像読み込み失敗したとき
      img.onerror = function () {
        imgCounting += 1
      }
      img.src = images[i].src // ソースのパスを設定
    }

    // setIntervalを使って一定時間ごとに処理を繰り返す
    const nowLoading = setInterval(function () {
      // baseCountingがimgCountingより大きくならない条件の場合に処理を実行させる。2回目以降にページを読み込んだ時に画像の読み込み履歴が残っている関係で、ローディング画面の表示が速く終わってしまうため、その対策として条件をつけている。
      if (baseCounting <= imgCounting) {
        // リアルタイムで読み込んでいるパーセントを取得
        current = Math.floor((baseCounting / images.length) * 100)
        // ●%の●部分に数字を置き換える
        percentNumber.innerHTML = current
        // リアルタイムで読み込まれるゲージ部分を反映させる
        loadingGauge.style.width = Math.floor((gaugeWidth / 100) * current) + '%'
        baseCounting += 1

        // 全て読み込んだ時
        if (baseCounting === images.length) {
          setTimeout(function () {
            // ローディング画面全体の非表示
            loadingArea.style.display = 'none'
            // ローディングの終了
            clearInterval(nowLoading)
          }, 300)
        }
      }
    }, 50)
  })
  return (
    <div id='bl_loading'>
      <div id='bl_loadingPercentWrap'>
        <span id='bl_loadingPercentNumber'></span>%
      </div>
      <div id='bl_loadingGaugeWrap'>
        <span id='bl_loadingGaugeMeter'></span>
      </div>
    </div>
  )
}

export default Loading
