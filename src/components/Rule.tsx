import React, { FC, useState } from 'react'
import { faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SelectList from './SelectList'
import { RuleElement, RuleProps } from '../types'

const fieldBooleanList = [
    'true',
    'false'
]

const Rule: FC<RuleProps> = ({ruleId, deleteRule, rules, setRules, fields, conditions}) => {
  const [field, setField] = useState(0)
  const [condition, setCondition] = useState(0)
  const [criteria, setCriteria] = useState(0)
  const [fieldIndex, setFieldIndex] = useState(-1)
  const rule = rules[rules.findIndex((rule:RuleElement) => rule.id == ruleId)]
  const updateRule = (newVal: any, updateKey: number) => {
    let fieldInd = -1;
    setRules(rules.map((rule:RuleElement)  => {
        if(rule.id == ruleId)
        {
            if(updateKey == 0) {
                rule.field = newVal
                fieldInd = fields.findIndex(obj => obj.field == newVal)
                rule.value = null
                rule.condition = null
            }
            else if(updateKey == 1)
                rule.condition = newVal
            else
                rule.value = newVal
        }
        
        return rule
    }))
    if(updateKey == 0)
        setFieldIndex(fieldInd)
  }
  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setRules(rules.map((rule: RuleElement) => {
        if(rule.id != ruleId)
            return rule
        else{
            console.log(e.currentTarget.value)
            rule.value = e.currentTarget.value
            return rule
        }
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
            <span className='m-1'>Value</span>
            {
                rule?.field == null || fields[fieldIndex].value == 'string'
                ?<input type='string' className={`criteria-select placeholder-[#FFFFFF80] focus-within:border-blue-400 bg-[${rule?.value?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} placeholder='Field Value' value = {rule?.value == null?'':rule?.value} onChange={e => changeValue(e)} />
                :fields[fieldIndex].value == 'number'
                ?<input type = 'number' className={`criteria-select placeholder-[#FFFFFF80] focus-within:border-blue-400 bg-[${rule?.value?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} placeholder='Field Value' value = {rule?.value == null?'':rule?.value} onChange={e => changeValue(e)} />
                :fields[fieldIndex].value == 'boolean'
                ?<div className={`relative criteria-select bg-[${rule?.value?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} onClick={e => setCriteria(1-criteria)}>
                    {rule?.value != null
                        ?<span className='text-white'>{rule.value}</span>
                        :<span className='text-[#FFFFFF80]'>Select true/false</span>
                    }
                    <FontAwesomeIcon icon={faCaretDown} />
                    <SelectList list={fieldBooleanList} show = {criteria} setShow = {setCriteria} update = {updateRule} updateKey={2}/>
                </div>
                :<div className={`relative criteria-select bg-[${rule?.value?'#FFFFFF0D':'#FFFFFF1A'}] border border-[#404348] rounded p-2 flex flex-row justify-between cursor-pointer items-center`} onClick={e => setCriteria(1-criteria)}>
                {rule?.value != null
                    ?<span className='text-white'>{rule.value}</span>
                    :<span className='text-[#FFFFFF80]'>Select value</span>
                }
                <FontAwesomeIcon icon={faCaretDown} />
                <SelectList list={fields[fieldIndex]?.list} show = {criteria} setShow = {setCriteria} update = {updateRule} updateKey={2}/>
            </div>
            }
        </div>
        <div className='delete-rule bg-[#FFFFFF1A] border border-[#404348] rounded self-end p-2 cursor-pointer' onClick={e => {
            deleteRule(ruleId)}}>
            <FontAwesomeIcon icon={faTrash} />
        </div>
      
    </div>
  )
}

export default Rule
