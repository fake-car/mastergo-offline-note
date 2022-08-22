import React from 'react'
import cn from 'classnames'
import { withTranslation } from 'react-i18next'
import {DownloadCloud } from 'react-feather'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { ExportItem } from '../right/items'
import { getBufferData } from 'api'
import { asyncForEach, getImageUrl } from 'utils/helper'
import './slices.scss'

class SlicesPanel extends React.Component {
  state = {
    percentage: 0,
    progressText: '',
  }
  setProgress = (percentage, progressText) => {
    this.setState({
      percentage,
      progressText
    })
  }
  handleDownloadAll = async () => {
    const { percentage } = this.state
    if (percentage!==0) return
    const { exportSettings, documentName, t } = this.props
    const zip = new JSZip()
    const length = exportSettings.length
    const folderName = `${documentName.replace(/\//g, '-')}-exports`
    const exportsFolder = zip.folder(folderName)
    this.setProgress(1, t('downloading images'))

    await asyncForEach(exportSettings, async (exportSetting, index) => {
      const imgName = exportSetting.fileName
      const imgUrl = getImageUrl(exportSetting)
      const imgData = await getBufferData(imgUrl)
      this.setProgress((index+1)*Math.floor(90/length), t('dealing with', {name: imgName}))
      exportsFolder.file(imgName, imgData, {base64: true})
    })

    this.setProgress(96, t('compressing files'))
    zip.generateAsync({type: 'blob'})
      .then(content => {
        saveAs(content, `${folderName}.zip`)
        this.setProgress(100, t('downloaded'))
        const timer = setTimeout(() => {
          this.setProgress(0, '')
          clearTimeout(timer)
        }, 800)
      })
  }


  componentDidMount() {
  }
  render () {
    const { mode, isMock, exportSettings, t, visible } = this.props
    const { percentage, progressText } = this.state
    const { protocol } = window.location
    return (
      <div className={cn('right-panel', {hide: !visible})}>
        <ul 
          className={cn('panel-exports')}
        >
            {
              !!exportSettings.length ?
              exportSettings
                .map((exportSetting, index) =>
                  <li key={index}>
                    <ExportItem
                      mode={mode}
                      isMock={isMock}
                      exportSetting={exportSetting}
                      index={index}
                      isLeft
                    />
                  </li>
                ) :
              <li className="exports-empty">{t('no exports')}</li>
            }
          </ul>
          {
            !!exportSettings.length &&
            <li
              className={cn('exports-download-all', {'is-downloading': percentage})}
              onClick={this.handleDownloadAll}
            >
              <span>{ progressText || `${t('export all')} ${exportSettings.length} ${t('piece')} ${t('slices')}` }</span> { !percentage && <DownloadCloud size={14}/> }
              <div className="download-all-progress" style={{width: `${percentage}%`}}/>
            </li>
          }
      </div>
    )
  }
}

export default withTranslation('right')(SlicesPanel)
