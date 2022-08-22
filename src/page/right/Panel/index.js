import React, { Fragment } from 'react'
import cn from 'classnames'
import { withTranslation } from 'react-i18next'
import { Droplet } from 'react-feather'
import { StyleItem } from '../items'
import { isAllImageFill } from 'utils/helper'
import { STYLE_TYPES } from 'utils/const'
import './style.scss'

class RightPanel extends React.Component {
  state = {
    tabIndex: 0,
  }
  changeTab = index => {
    const { tabIndex } = this.state
    if (tabIndex!==index) {
      this.setState({tabIndex: index})
    }
  }
  componentDidMount() {
    // const { styles } = this.props
  }
  render () {
    const {styles, propsPanelState, onShowDetail, t } = this.props
    const { tabIndex } = this.state
    return (
      <div className="right-panel">
        <div
          className={cn('panel-mask', `mask-${propsPanelState}`)}
        />
        {/* <ul className="panel-tabs">
          <li className={cn({'selected': tabIndex===0})} onClick={() => this.changeTab(0)}><Droplet size={14}/>{t('tab style')}</li>
        </ul>
        <ul className={cn('panel-list', {'hide': tabIndex!==0})}>
          {
            Object.keys(styles).map(key =>
              key!=='GRID' && styles[key] &&
              <Fragment key={key}>
                <li className="list-title">{ t(STYLE_TYPES[key]) }</li>
                <div className='panel-list-wrap'>
                  {
                    styles[key] &&
                    styles[key]
                      .filter(style => key==='FILL' ? !isAllImageFill(style.items) : true)
                      .map((style, index) => {
                        return (
                          <li key={index}>
                          <StyleItem
                            styles={style.items}
                            styleName={style.name}
                            styleType={style.styleType}
                            isSelectable
                            onClick={() => onShowDetail(style)}
                          />
                        </li>
                        )
                      }
                      )
                  }
                </div>
              </Fragment>
            )
          }
        </ul> */}
      </div>
    )
  }
}

export default withTranslation('right')(RightPanel)
