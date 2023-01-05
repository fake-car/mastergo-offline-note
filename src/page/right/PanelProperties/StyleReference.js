import React from 'react'
import { ArrowRight } from 'react-feather'
import { getStyleById } from 'utils/style'
import StyleItem from '../items/StyleItem'
import './style-reference.scss'

const StyleReference = ({styleItems, styles, nodeStyles, type, onShowStyleDetail}) => {
  const styleReference = getStyleById(styles, nodeStyles, type)
  const styleType = type==='stroke' ? 'FILL' : type.toUpperCase()
  function handleReferenceClick () {
    //TODO: 等文字样式有fontname放开
    if (styleReference.remote || type === 'text') {
      return
    }
    onShowStyleDetail && onShowStyleDetail(styleType, nodeStyles[type])
  }

  return styleReference &&
    <span
      className="title-reference"
      onClick={handleReferenceClick}
    >
      <StyleItem
        styles={styleItems}
        styleName={styleReference.name}
        styleType={styleType.toUpperCase()}
        isHoverable={!styleReference.remote && type !== 'text'}
      />
      {
        !styleReference.remote && type !== 'text' &&
        <ArrowRight size={14}/>
      }
    </span>
}

export default StyleReference
