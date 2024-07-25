import React, { FC, useState, useEffect } from 'react';
import CloseButton from './CloseButton';
import RuleGroup from './RuleGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid} from 'uuid'
import { ModalProps, RuleGroupElement } from './types';


const Modal: FC<ModalProps> = ({ show, onClose }) => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroupElement[]>([])

  const addNewGroup = () => {
    const id = uuid()
    const newElemet: RuleGroupElement = {
      id: id,
      conjunction: 'AND',
      not: false
    }
    setRuleGroups([...ruleGroups, newElemet])
  }
  useEffect(() => {
    if(ruleGroups.length == 0)
        addNewGroup()
  }, [ruleGroups])

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50" >
      <div className="bg-modalBG rounded-lg shadow-lg max-w-[60vw] w-full" >
        <div className='bg-modalHeader modal-header flex p-3 flex-col gap-y-1 rounded-t-lg'>
            <div className='modal-header-title flex justify-between items-center'>
                <span className="text-white text-xl">Create Tag and Query</span>
                <div onClick={e => onClose()} style={{cursor: 'pointer'}}>
                  <CloseButton />
                </div>
            </div>
            <div className='modal-header-query text-left'>
                <span style={{color: '#A5B4FC'}}>The query you build will be saved in your active view</span>
            </div>
        </div>
        <div className='modal-body pt-12 p-5 h-[70vh] max-h-[70vh] overflow-y-scroll scroll-smooth flex flex-col'>
          <div className='flex flex-col gap-y-8'>
            {ruleGroups.map(ruleGroup => <RuleGroup />)}
          </div>
          <div className='text-center text-white p-2 mt-6 rounded cursor-pointer add-rule bg-[#4F46E5] w-[180px]' onClick={e => addNewGroup()}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add new group filter</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;