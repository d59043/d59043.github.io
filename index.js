// 各マーカーが今現在読み込まれているかどうか
const isMarkerFound = {
  m_santa: false,
  m_boushi: false,
  m_huku: false,
  m_tonakai: false,
}

AFRAME.registerComponent('run', {
  init: () => {
    document.querySelectorAll('a-marker').forEach(marker => {
      marker.addEventListener('markerFound', () => {
        isMarkerFound[marker.id] = true
      })
      marker.addEventListener('markerLost', () => {
        isMarkerFound[marker.id] = false
      })
    })
  }
})
// 既に装飾を身につけているかどうか
const isDressed = {
  m_boushi: false,
  m_huku: false,
}

AFRAME.registerComponent('run', {
  init: () => {...},
  tick: () => {
    // サンタのマーカーを認識していないならreturn
    if(!isMarkerFound.m_santa) return

    // 帽子のマーカーを認識＆まだ身につけていない場合、
    // サンタ用a-marker内にある、帽子のa-eneityにgltf-model属性を付与
    if(isMarkerFound.m_boushi && !isDressed.m_boushi) {
      document.getElementById('boushi').setAttribute('gltf-model', '#a-santa_boushi')
      isDressed.m_boushi = true
      return
    }
    // 服のマーカーを認識＆まだ身につけていない場合、
    // サンタ用a-marker内にある、服のa-eneityにgltf-model属性を付与
    if(isMarkerFound.m_huku && !isDressed.m_huku) {
      document.getElementById('huku').setAttribute('gltf-model', '#a-santa_huku')
      isDressed.m_huku = true
      return
    }
  }
})
