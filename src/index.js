import { useState } from 'react'
import html2canvas from 'html2canvas'

/**
 * @module Main_Hook
 * Hook return
 * @typedef {Array} HookReturn
 * @property {string} HookReturn[0] - image string
 * @property {string} HookReturn[1] - take screen shot string
 * @property {object} HookReturn[2] - errors
 */

/**
 * hook for creating screenshot from html node
 * @returns {HookReturn}
 */
const useScreenshot = () => {
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)

  /**
   * convert html node to image
   * @param {HTMLElement} node
   */
  const takeScreenShot = node => {
    if (!node) {
      throw new Error('You should provide correct html node.')
    }

    return html2canvas(node)
      .then(canvas => {
        const croppedCanvas = document.createElement('canvas')
        const croppedCanvasContext = croppedCanvas.getContext('2d')
        // init data
        const cropPositionTop = 0
        const cropPositionLeft = 0
        const cropWidth = canvas.width
        const cropHeight = canvas.height

        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight

        croppedCanvasContext.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop
        )

        const image = croppedCanvas.toDataURL()
        console.log('image')
        setImage(image)
        return image
      })
      .catch(setError)
  }

  return [
    image,
    takeScreenShot,
    {
      error
    }
  ]
}

/**
 * creates name of file
 * @param {string} extension
 * @param  {string[]} parts of file name
 */
const createFileName = (extension = '', ...names) =>
  extension ? `${names.join('')}.${extension}` : ''

export { useScreenshot, createFileName }
