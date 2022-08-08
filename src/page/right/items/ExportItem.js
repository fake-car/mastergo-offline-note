import React, { useState, useMemo } from 'react'
import { Download, ExternalLink, Loader } from 'react-feather'
import cn from 'classnames'
import { saveAs } from 'file-saver'
import { getBlobData } from 'api'
import { getImageUrl } from 'utils/helper'
import './export-item.scss'

const ExportItem = ({exportSetting}) => {
  const [ isDownloading, setDownloading ] = useState(false)
  const [showMenu, changeMenuStatus] = useState(false)
  const name = exportSetting.fileName
  const imageUrl = getImageUrl(exportSetting)
  const { protocol } = window.location
  const isHttpServer = /^http/.test(protocol)

  const handleSave = (e, name) => {
    if (isHttpServer) {
      e.preventDefault()
      setDownloading(true)
      getBlobData(imageUrl)
        .then(blob => {
          saveAs(blob, name)
          setDownloading(false)
        })
    }
  }

  const menu = useMemo(() => {
    return (
      <div 
        className='export-item-menu'
        onClick={(e) => handleSave(e, name)}
      >
        下载这张切图
      </div>
    )
  }, [])

  const onMouseClick = () => {
    changeMenuStatus(false)
    document.removeEventListener('click', onMouseClick)
  }

  // 右键
  const rightClick = (event) => {
    event.preventDefault()
    changeMenuStatus(true)
    document.addEventListener('click', onMouseClick)
  }

  return <a
      href={imageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('export-item', {'export-item-downloading': isDownloading})}
      onContextMenu={rightClick}
    >
      <div style={{backgroundImage: `url(${imageUrl})`}}/>
      <span>{ name }</span>
      {
        isDownloading ?
        <Loader size={14} className="motion-loading"/> :
        (isHttpServer ? <Download size={14}/> : <ExternalLink size={14}/>)
      }
      {showMenu && menu}
    </a>
}

export default ExportItem
