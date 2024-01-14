const isMarkerFounded = {
  m_santa: false,
  m_boushi: false,
  m_huku: false,
  m_tonakai: false,
}

const isDressed = {
  m_boushi: false,
  m_huku: false,
}

let isComplete = false

AFRAME.registerComponent('run', {
  init: () => {
    this.santa = document.getElementById('m_santa')
    this.tonakai = document.getElementById('m_tonakai')

    this.p_santa = new THREE.Vector3()
    this.p_tonakai = new THREE.Vector3()

    const geometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 10)
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0))
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad( 90 )))
    const material = new THREE.MeshLambertMaterial({color: 0xFF0000})
    this.cylinder = new THREE.Mesh(geometry, material)
    this.cylinderGroup = document.getElementById('leash').object3D
    this.cylinderGroup.add(this.cylinder)

    document.querySelectorAll('a-marker').forEach(marker => {
      marker.addEventListener('markerFound', () => {
        isMarkerFounded[marker.id] = true
      })
      marker.addEventListener('markerLost', () => {
        isMarkerFounded[marker.id] = false
      })
    })
  },

  tick: () => {
    if(!isMarkerFounded.m_santa) return

    if(isMarkerFounded.m_boushi && !isDressed.m_boushi) {
      document.getElementById('boushi').setAttribute('gltf-model', '#a-santa_boushi')
      isDressed.m_boushi = true
      return
    }
    if(isMarkerFounded.m_huku && !isDressed.m_huku) {
      document.getElementById('huku').setAttribute('gltf-model', '#a-santa_huku')
      isDressed.m_huku = true
      return
    }
    if(isMarkerFounded.m_tonakai) {
      this.tonakai.object3D.getWorldPosition(this.p_tonakai)
      this.santa.object3D.getWorldPosition(this.p_santa)
      p_santa.z = p_santa.z + 0.6
      p_santa.x = p_santa.x + 0.1

      const distance = this.p_tonakai.distanceTo(this.p_santa)
      this.cylinderGroup.lookAt(this.p_santa)
      this.cylinder.scale.set(1, 1, distance)
    }
    if(isDressed.m_boushi && isDressed.m_huku && !isComplete) {
      document.getElementById('message').setAttribute('opacity', '1')
      isComplete = true
      return
    }
  }
})
