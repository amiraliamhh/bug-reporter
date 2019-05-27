import React, { useEffect, useState } from 'react'

import { Input } from 'antd'

const AddOptions = () => {
    const [ categories, setCategories ] = useState([])

    const styles = {
        width: '100%',
    }

    const itemStyles = {
        width: '100%',
        borderTop: '1px solid #212121',
        borderBottom: '1px solid #212121',
    }

    useEffect(() => {
        if (chrome && chrome.storage) {
            chrome.storage.sync.get('categories', ({ categories }) => {
                setCategories(categories)
            })
        }
    })

    return (
        <div style={styles} >
            <h1>Existing Options:</h1>
            {
                categories.map((cat, index) => {

                    return (
                        <div style={itemStyles} key={index} >
                            <p>{ cat }</p>
                            <p style={{ color: 'red', cursor: 'pointer' }} >Delete</p>
                        </div>
                    )
                })
            }
            <h1>Add new Options:</h1>
            <Input />
        </div>
    )
}

export default AddOptions
