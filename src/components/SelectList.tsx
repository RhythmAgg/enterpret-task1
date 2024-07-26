import React from 'react'
import { FC } from 'react'
import { SelectListProps } from '../types'


const SelectList: FC<SelectListProps> = ({list, show, setShow, update, updateKey}) => {
  return (
    <div className={`z-[100] absolute translate-y-[100%] -bottom-1 left-0 right-0 select-list ${show == 0?'hidden':''} bg-[#282B30] flex flex-col border rounded border-[#404348] mt-2 p-2`}>
        {list.map((listItem:string) => {
            return (
                <div className='listitem hover:bg-[#C4C4C41A] p-2 rounded' onClick={e => {
                        update(listItem, updateKey)
                        setShow(0)}
                    }>
                    {listItem}
                </div>
            )
        })
        }
    </div>
  )
}

export default SelectList
