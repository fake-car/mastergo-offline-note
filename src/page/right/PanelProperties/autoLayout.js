import React from 'react';
import './autoLayout.scss'
import classnames from 'classnames'
import Auto from '../../../images/auto.png'
import AutoDouble from '../../../images/auto-double.png'
import FixedDouble from '../../../images/fixed-double.png'
import Fixed from '../../../images/fixed.png'
const AutoLayout = ({ flexMode, mainAxisSizingMode, crossAxisSizingMode  }) => {
  const getStyleByMode = (vertical, mode) => {
    if (flexMode === 'HORIZONTAL') {
      // 主轴为横向
      return vertical? (crossAxisSizingMode === mode) : (mainAxisSizingMode === mode) 
    } else {
      return vertical? (mainAxisSizingMode === mode) : (crossAxisSizingMode === mode)
    }
  }

  const getIconByMode = (vertical) => {
    if (flexMode === 'HORIZONTAL') {
      // 主轴为横向
      if (vertical) {
        return crossAxisSizingMode === 'AUTO'? Auto : Fixed
      } else {
        return mainAxisSizingMode === 'AUTO'? Auto : Fixed
      }
    } else {
      if (vertical) {
        return mainAxisSizingMode === 'AUTO'? Auto : Fixed
      } else {
        return crossAxisSizingMode === 'AUTO'? Auto : Fixed
      }
    }
  }

  const getSizeByMode = (vertical) => {
    if (flexMode === 'HORIZONTAL') {
      return vertical? crossAxisSizingMode : mainAxisSizingMode
    } else {
      return vertical? mainAxisSizingMode : crossAxisSizingMode
    }
  }

  return (
    <div className='autoLayout'>
      <div className='autoLayout-preview'>
        {['top', 'bottom', 'left', 'right'].map((position, idx) => {
          const url = getIconByMode(idx < 2)
          return (
            <div 
              className={classnames(
                'autoLayout-preview-abstract',
                `autoLayout-preview-${position}`,
                )}
              key={`abstract-${idx}`}
            >
              <i 
                className={classnames({
                  [`icon-fixed`]: getStyleByMode(idx < 2, "FIXED"),
                  [`icon-auto`]: getStyleByMode(idx < 2, "AUTO")
                })}
                style={{
                  backgroundImage: `url(${url})`,
                  backgroundSize: `${url === Auto? '24px 6px' : '6px 24px'}`,
                  width: url === Auto? '24px' : '6px',
                  height: url === Auto? '6px' : '24px'
                }}
              />
            </div>
          )
        })}
        <div 
          className='autoLayout-preview-area-indictor'
          style={{
            width: getSizeByMode(false) === 'FIXED'? 44 : 32,
            height: getSizeByMode(true) === 'FIXED'? 44 : 32,
          }}
        >
          <div className='autoLayout-preview-area-indictor-bars'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </div>
        </div>
      </div>
      <div className='autoLayout-info'>
        <div className='autoLayout-info-item'>
          <i 
            style={{
              backgroundImage: `url(${getSizeByMode(false) === 'AUTO'? AutoDouble : FixedDouble})`,
              backgroundSize: '14px 14px',
            }}
          />
          {getSizeByMode(false) === 'AUTO'? '适应内容' : '固定宽度'}
        </div>
        <div className='autoLayout-info-item'>
          <i 
            style={{
              backgroundImage: `url(${getSizeByMode(true) === 'AUTO'? AutoDouble : FixedDouble})`,
              backgroundSize: '14px 14px',
            }}
          />
          {getSizeByMode(true) === 'AUTO'? '适应内容' : '固定高度'}
        </div>
      </div>
    </div>
  );
};

export default AutoLayout