import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'

import ReactQuill from 'react-quill'

import DropDown from './DropDown'

const App = ({ pageX, pageY }) => {
    const ref = useRef(0)
    const [ text, setText ] = useState('')

    const styles = {
        marginTop: `${pageY}px`,
        marginLeft: `${pageX}px`,
        width: '30rem',
        minHeight: '100px',
        boxShadow: '0px 3px 6px rgba(0,0,0,.5)',
        borderRadius: '3px',
        padding: '10px'
    }

    const handleOutsideClick = (event) => {
        const clickIsInside = ref.current && ref.current.contains && ref.current.contains(event.target);
        if (!clickIsInside) {
            ReactDOM.unmountComponentAtNode(document.getElementById('root'))
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick)

        return () => { window.removeEventListener('click', handleOutsideClick) }
    })

    return (
        <div style={styles} ref={ref} >
            <DropDown />

            <ReactQuill
            value={text}
            onChange={setText}
            />

            <Button style={{ margin: '10px' }} >ثبت</Button>
        </div>
    )
}

export default App
