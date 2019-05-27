import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import 'react-quill/dist/quill.snow.css'
import 'antd/dist/antd.css'

window.addEventListener('click', (event) => {
    if (event.ctrlKey) {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))

        const props = {
            pageX: event.pageX,
            pageY: event.pageY,
        }

        ReactDOM.render(<App {...props} />, document.getElementById('root'))
    }
})
