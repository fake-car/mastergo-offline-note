import React, { useState } from 'react'
import { Download, ExternalLink, Loader } from 'react-feather'
import cn from 'classnames'
import { saveAs } from 'file-saver'
import { getBlobData } from 'api'
import { getImageUrl } from 'utils/helper'
import './export-item.scss'
import extraLink from '../../../images/external-link.png'

const ExportItem = ({exportSetting, mode, isMock, isLeft}) => {
  const [ isDownloading, setDownloading ] = useState(false)
  const fileName = exportSetting.fileName
  const name = exportSetting.name
  const imageUrl = getImageUrl(exportSetting, mode, isMock)
  const scale = exportSetting.constraint.value
  const format = exportSetting.format
  const { protocol } = window.location
  const isHttpServer = /^http/.test(protocol)

  const handleSave = (e, imageurl) => {
    if (isLeft) {
      e.preventDefault()
      window.open(imageUrl)
    //   setDownloading(true)
    //   if (isHttpServer) {
    //     getBlobData(imageUrl)
    //     .then(blob => {
    //       saveAs(blob, fileName)
    //       setDownloading(false)
    //     })
    //   } else {
    //     let a = document.createElement('a')
    //     a.href = imageUrl
    //     a.download = fileName
    //     a.dispatchEvent(new MouseEvent('click'))
    //   }
    }
  }
  

  return <a
      href={imageUrl}
      // target="_blank"
      // rel="noopener noreferrer"
      className={cn('export-item', {'export-item-downloading': isDownloading})}
      onClick={e => handleSave(e, imageUrl)}
      download={fileName}
    >
      <div style={{backgroundImage: `url(${imageUrl})`}}/>
      <div className='export-item-desc'>
        <span className='export-item-desc-title'>{ name }</span>
        <span className='export-item-desc-sum'>{format}, {scale}x</span>
      </div>
      {
        isDownloading ?
        <Loader size={14} className="motion-loading"/> :
        (!isLeft ? <Download size={14}/> : <img src={extraLink} width={14} height={14} alt="" />)
      }
    </a>
}

export default ExportItem
