import * as Cesium from 'cesium'

window.onload = () => {
  // eslint-disable-next-line no-new
  new Cesium.Viewer(document.querySelector('#app')!)
}
