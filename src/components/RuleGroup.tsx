import React, { FC, useState, useEffect } from 'react'
import Rule from './Rule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import {v4 as uuid} from 'uuid'
import { RuleElement, RuleGroupProps, RuleGroupObject } from '../types'

const RuleGroup: FC<RuleGroupProps> = ({ruleGroupId, removeRuleGroup, queryObjects, setQueryObjects, fields, conditions}) => {
  const [conjunction, setConjunction] = useState(0)
  const [rules, setRules] = useState<RuleElement[]>([])
  const [ruleObject, setRuleObject] = useState<RuleGroupObject>({})

  useEffect(() => {
    const children = rules.filter(rule => rule?.field && rule?.condition && rule?.value)

    const updatedRuleGroup: RuleGroupObject = {
      id: ruleGroupId,
      children: children,
      conjunction: conjunction == 0?'AND':'OR',
      not: false
    }
    setRuleObject(updatedRuleGroup)
  }, [conjunction, rules])

  useEffect(() => {
    if(ruleObject.id) {

      const index = queryObjects.findIndex(obj => obj.id == ruleGroupId)
      if(index == -1)
      {
        setQueryObjects([...queryObjects, ruleObject])
      }else {
        setQueryObjects(queryObjects.map(obj => {
          if(obj.id != ruleGroupId) {
            return obj
          }else{
            return ruleObject
          }
        }))
      } 
    }
  },[ruleObject])

  const removeRule = (ruleId: string) => {
    setRules(rules.filter(ele => ele.id != ruleId))
  }

  const addRule = () => {
    const id = uuid()
    const newRule: RuleElement = {
        id: id,
        field: null,
        condition: null,
        value: null
    }
    console.log([...rules, newRule])

    setRules(rules => [...rules, newRule])
  }
  useEffect(() => {
    if(rules.length == 0)
        addRule()
  }, [rules])
  return (
    <div className='text-white rule-group bg-[#282B30] rounded border border-[#404348] p-3'>
        <div className='conjunction mb-3 flex w-[100px] flex cursor-pointer rounded border border-[#404348]' onClick={e => setConjunction(1 - conjunction)}>
            <div className={`text-center conjuntion-and w-1/2 p-1 bg-${conjunction == 0?'modalHeader':'[#282B30]'}`}>AND</div>
            <div className={`text-center conjuntion-or w-1/2 p-1 bg-${conjunction == 1?'modalHeader':'[#282B30]'}`}>OR</div>
        </div>
        <div className='flex gap-y-4 flex-col'>
            {rules.map((rule) => <Rule ruleId={rule.id} deleteRule={removeRule} rules={rules} setRules={setRules} fields = {fields} conditions = {conditions} />)}
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-center p-2 mt-3 rounded cursor-pointer add-rule bg-[#4F46E5] w-[100px]' onClick={e => addRule()}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Add filter</span>
          </div>
          <div className='text-center p-2 mt-3 rounded cursor-pointer remove-rule-group bg-[#6D7175]' onClick={e => removeRuleGroup(ruleGroupId)}>
            <FontAwesomeIcon icon={faTrash} />
            <span className='ms-1'>Remove group</span>
        </div>

        </div>
        
    </div>
  )
}

export default RuleGroup
