import React, { FC, useState, useEffect } from 'react';
import CloseButton from './CloseButton';
import RuleGroup from './RuleGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid} from 'uuid'
import { ModalProps, RuleElement, RuleGroupElement, RuleGroupObject } from '../types';


const Modal: FC<ModalProps> = ({ show, onClose }) => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroupElement[]>([])
  const [queryObjects, setQueryObjects] = useState<RuleGroupObject[]>([])
  const [queryString, setQueryString] = useState('')
  const [fields, setFields] = useState<any[]>([])
  const [conditions, setConditions] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      try{
        await fetch('/data.json')
          .then((data: any) => data.json())
          .then((data: any) => {
            setFields(data?.fields)
            setConditions(data?.conditions)
          })
      }catch(err) {
        console.error(err)
      }
    }
    getData()
  }, [])

  const ruleGroupToString = (ruleGroup: RuleGroupObject):string => {
    let ruleGroupString = ''
    const conj = ruleGroup?.conjunction == 'AND'?"&&":"||"
    const rules: string[] = []
    ruleGroup?.children?.forEach((child: any) => {
      const conditionSymbol = conditions[conditions.findIndex((obj: any) => obj.condition == child?.condition)]?.symbol
      rules.push(` "(${child?.field}) ${conditionSymbol} \\"${child?.value}\\"" `)
    })
    ruleGroupString = rules.join(conj)
    return ruleGroupString.slice(1, -1)
  }

  useEffect(() => {
    let query = ''
    queryObjects.forEach(obj => {
      const str = ruleGroupToString(obj)
      if(str.length > 0) {
        if(obj.not)
          query += '!('+ruleGroupToString(obj)+') &&'
        else
          query += '('+ruleGroupToString(obj)+') &&'
      }
    })
    setQueryString(query.slice(0, -3))

  }, [queryObjects])

  useEffect(() => {
    console.log(queryObjects)
  }, [queryObjects])

  const removeRuleGroup = (ruleGroupId: string) => {
    setRuleGroups(ruleGroups.filter(ele => ele.id != ruleGroupId))
    setQueryObjects(queryObjects.filter(ele => ele.id != ruleGroupId))
  }

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
        <div className='bg-modalHeader modal-header flex p-6 flex-col gap-y-1 rounded-t-lg'>
            <div className='modal-header-title flex justify-between items-center'>
                {
                  queryString.length == 0
                  ?<span className="text-white text-xl">Create Tag and Query</span>
                  :<span className="text-white text-xl">Build your query</span>
                }
                
                <div onClick={e => onClose()} style={{cursor: 'pointer'}}>
                  <CloseButton />
                </div>
            </div>
            <div className='modal-header-query text-left'>
                {
                  queryString.length == 0
                  ?<span style={{color: '#A5B4FC'}}>The query you build will be saved in your active view</span>
                  :
                  (
                    <div className='bg-[#4338CA] p-2 overflow-x-scroll text-white border border-[#FFFFFF00] rounded'>
                      <span className='font-bold me-1'>Query:</span>
                      <span>{queryString}</span>

                    </div>
                  )
                  
                }
            </div>
        </div>
        <div className='modal-body pt-12 p-5 h-[70vh] max-h-[70vh] overflow-y-scroll scroll-smooth flex flex-col'>
          <div className='flex flex-col gap-y-8'>
            {ruleGroups.map(ruleGroup => <RuleGroup 
              ruleGroupId={ruleGroup.id} 
              removeRuleGroup={removeRuleGroup} 
              queryObjects={queryObjects} 
              setQueryObjects={setQueryObjects}
              fields = {fields}
              conditions = {conditions}
            />)}
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