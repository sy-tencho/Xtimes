// ==UserScript==
// @name         Xtimes
// @namespace    http://tampermonkey.net/
// @version      0.1 (beta)
// @description  Customize video playback speed.
// @author       @sy-tencho
// @match        https://keio.app.box.com/s/*
// @grant        none
// ==/UserScript==

const main = () => {
  setTimeout(() => {
    const changeSpeedBtn = document.createElement('button')
    changeSpeedBtn.innerHTML = '再生速度を変更する'
    changeSpeedBtn.style.cssText = `
      postion: abusolute;
    `
    document.body.appendChild(changeSpeedBtn)
    changeSpeedBtn.onclick = () => {
      onClickChangeSpeedBtn()
    }
  }, 5000) // ロードに結構時間かかるからとりあえず5000くらいにしておく
}

const onClickChangeSpeedBtn = () => {
  const speed = window.prompt('再生したい速度を入力してください。 1.0が標準です。', 1.0)

  if (speed > 3.0) {
    alert('上限値は3.0です。')
  } else if (speed <= 0.0) {
    alert('0.0より大きい値を設定してください。')
  } else {
    changeSpeed(speed)
  }
}

const changeSpeed = (speed) => {
  clickElementByClassName('bp-media-gear-icon')
  clickElementByClassName('bp-media-settings-item-speed')

  const selectedElements = document.getElementsByClassName('bp-media-settings-sub-item bp-media-settings-selected')

  // find使うと動かなかったからとりあえずforを使っておく
  for (let i = 0; i < selectedElements.length; i++) {
    const value = selectedElements[i].attributes[1].value
    if (value == 'speed') {
      selectedElements[i].setAttribute('data-value', speed)
      selectedElements[i].click()
    }
  }
}

const clickElementByClassName = (className) => {
  const elements = document.getElementsByClassName(className)
  for (let i = 0; i < elements.length ; i++) {
    elements[i].click()
  }
}

main()
