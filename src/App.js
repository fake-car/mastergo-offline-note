import React from 'react'
import Main from 'page/Main'
import Header from 'page/header'
import 'assets/base.scss'
import './app.scss'

// 2 modes: local and online
class App extends React.Component {
  constructor(props) {
    super(props)
    // const { isModule, fileData, exportSettings, pagedFrames, settings } = props
    const { FILE_DATA, PAGED_FRAMES, SETTINGS } = window
    const mode = !!FILE_DATA ? 'local' : 'online'
    const isMock = !props.isModule;
    let data = FILE_DATA || props.fileData || {};
    let pagedFrames = PAGED_FRAMES || props.pagedFrames || {};
    let settings = SETTINGS || props.settings || {};
    this.state = {
      mode,
      isMock,
      data,
      pagedFrames,
      components: data.components || [],
      styles: data.styles || {},
      exportSettings: data.exportSettings || props.exportSettings || [],
      includeComponents: (mode!=='local' && isMock) ? true : !!settings.includeComponents,
      names: {},
    }
    // 初始化全局 context
    props.initGlobalSettings(settings)
  }
  getNames = (frameName, pageName) => {
    const { data } = this.state
    this.setState({
      names: {
        documentName: data.name,
        pageName: pageName || data.document.children[0].name,
        frameName: frameName || data.document.children[0].children[0].name,
        isComponent: !pageName
      }
    })
  }
  handleBack = () => {
    const { onHeaderBack } = this.props
    if (onHeaderBack) {
      onHeaderBack()
    } else {
      this.setState({
        names: {}
      })
    }
  }
  render () {
    const { links } = this.props
    const {
      mode, isMock, includeComponents, data, components, styles,
      exportSettings, pagedFrames, names
    } = this.state
    return (
      <div className="app-container">
        <Header
          mode={mode}
          onBack={this.handleBack}
          links={links||{}}
          {...names}
        />
        <Main
          mode={mode}
          isMock={isMock}
          includeComponents={includeComponents}
          data={data}
          components={components}
          styles={styles}
          exportSettings={exportSettings}
          pagedFrames={pagedFrames}
          onNamesChange={this.getNames}
          {...names}
        />
      </div>
    )
  }
}

export default App
