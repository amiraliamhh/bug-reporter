import React, { useState, useEffect } from 'react'

import { Button, Radio } from 'antd'

const DropDown = ({ }) => {
    const [ categories, setCategories ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState(categories.length ? categories[0] : '')

    const styles = {
        display: 'flex',
        width: '100%',
        direction: 'rtl',
        paddingRight: '5px'
    }

    useEffect(() => {
        if (chrome && chrome.storage) {
            chrome.storage.sync.get('categories', ({ categories }) => {
                setCategories(categories)
            })
        }
    })

    const handleDropDownChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    return (
        <div style={styles} >
        {
            categories.length
            ? <Radio.Group value={selectedCategory} onChange={handleDropDownChange} >
            {
                categories.map((cat, index) => {

                    return (
                        <Radio value={cat} key={index} >{ cat }</Radio>
                    )
                })
            }
            </Radio.Group>
            : <p>شما هنوز هیچ دسته بندی‌ای ایجاد نکرده‌اید. <Button type="primary" >ایجاد دسته بندی جدید</Button></p>
        }
        </div>
    )
}

export default DropDown
