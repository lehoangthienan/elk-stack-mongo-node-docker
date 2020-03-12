import fs from 'fs'
import { extname, dirname, basename } from 'path'
import sharp from 'sharp'

const _resize = (file, width) => {
  return new Promise((resolve, reject) => {
    const { path } = file
    const extension = extname(path)
    const fileName = basename(path).replace(extension, '')
    const resizeFileName = `${dirname(path)}/${fileName}@${width}px${extension}`
    const buffer = fs.readFileSync(path)
    sharp(buffer)
      .resize(width)
      .min()
      .toFile(resizeFileName)
      .then(() => {
        resolve(resizeFileName)
      })
      .catch(error => reject(error))
  })
}

export default async function createThumbnails(file, ...widths) {
  try {
    const thumbnails = {}
    for (let i = 0; i < widths.length; i++) {
      const width = widths[i]
      thumbnails[width] = await _resize(file, widths[i])
    }
    return thumbnails
  } catch (error) {
    throw new Error(error)
  }
}