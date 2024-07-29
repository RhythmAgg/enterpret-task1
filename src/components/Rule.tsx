import React, { FC, useState } from 'react'
import { faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SelectList from './SelectList'
import { RuleElement, RuleProps } from '../types'

const fieldList = [
    'Theme',
    'Sub-theme',
    'field3'
]

const Rule: FC<RuleProps> = ({ruleId, deleteRule, rules, setRules, fields, conditions}) => {
  const [field, setField] = useState(0)
  const [condition, setCondition] = useState(0)
  const [criteria, setCriteria] = useState(0)
  const rule = rules[rules.findIndex((rule:RuleElement) => rule.id == ruleId)]
  const updateRule = (newVal: any, updateKey: number) => {
    setRules(rules.map((rule:RuleElement)  => {
        if(rule.id == ruleId)
        {
            if(updateKey == 0)
                rule.field = newVal
            else if(updateKey == 1)
                rule.condition = newVal
            else
                rule.value = newVal
        }
        
        return rule
    }))
  }
  return (
    <div id={ruleId} className='rule flex flex-row gap-x-4'>
        <div className='text-white field flex flex-col w-[30%]'>
            <span className='m-1'>Field</span>
            <div className={`relative field-select bg-[${rule?.field?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} onClick={e => setField(1-field)}>
                {rule?.field != null
                    ?<span className='text-white'>{rule.field}</span>
                    :<span className='text-[#FFFFFF80]'>Select field</span>
                }
                <FontAwesomeIcon icon={faCaretDown} />
                <SelectList list={fields.map(fieldObj => fieldObj.field)} show = {field} setShow = {setField} update = {updateRule} updateKey={0} />
            </div>
        </div>
        <div className='text-white field flex flex-col w-[30%]'>
            <span className='m-1'>Condition</span>
            <div className={`relative condition-select bg-[${rule?.condition?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} onClick={e => setCondition(1-condition)}>
                {rule?.condition != null
                    ?<span className='text-white'>{rule.condition}</span>
                    :<span className='text-[#FFFFFF80]'>Select condition</span>
                }
                <FontAwesomeIcon icon={faCaretDown} />
                <SelectList list={conditions.map(conditionObj => conditionObj.condition)} show = {condition} setShow = {setCondition} update = {updateRule} updateKey={1}/>
            </div>
        </div>
        <div className='text-white field flex flex-col w-[30%]'>
            <span className='m-1'>Criteria</span>
            <div className={`relative criteria-select bg-[${rule?.value?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} onClick={e => setCriteria(1-criteria)}>
                {rule?.value != null
                    ?<span className='text-white'>{rule.value}</span>
                    :<span className='text-[#FFFFFF80]'>Select criteria</span>
                }
                <FontAwesomeIcon icon={faCaretDown} />
                <SelectList list={fieldList} show = {criteria} setShow = {setCriteria} update = {updateRule} updateKey={2}/>
            </div>
        </div>
        <div className='delete-rule bg-[#FFFFFF1A] border border-[#404348] rounded self-end p-2 cursor-pointer' onClick={e => {
            deleteRule(ruleId)}}>
            <FontAwesomeIcon icon={faTrash} />
        </div>
      
    </div>
  )
}

export default Rule
