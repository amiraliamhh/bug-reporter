import React, { useState, useEffect } from 'react'

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
        setSelectedCategory(event.taget.value)
    }

    return (
        <div style={styles} >
        {
            categories.length
            ? <select 
            name="categories"
            onChange={handleDropDownChange}
            >
            {
                categories.map((cat, index) => {
                    return <option value={cat} key={index} >{ cat }</option>
                })
            }
            </select>
            : <p>شما هنوز هیچ دسته بندی‌ای ایجاد نکرده‌اید. <a href="/">ایجاد دسته بندی جدید</a></p>
        }
        </div>
    )
}

export default DropDown
