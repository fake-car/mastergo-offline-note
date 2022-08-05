import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { withGlobalContextProvider } from 'contexts/GlobalContext'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { FILE_DATA, SETTINGS, PAGED_FRAMES } from './mock/test'

const ContextedApp = withGlobalContextProvider(App)

if (process.env.NODE_ENV === 'development') {
  // 本地环境运行测试文件
  window.FILE_DATA = FILE_DATA
  window.SETTINGS = SETTINGS
  window.PAGED_FRAMES = PAGED_FRAMES
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ContextedApp />
  </I18nextProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
