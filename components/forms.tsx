'use client'
import { useState } from 'react'

export function TextInput({label, value, onChange, placeholder, type='text'}: any){
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="input mt-1" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} type={type}/>
    </label>
  )
}

export function Select({label, value, onChange, options}: any) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <select className="input mt-1" value={value} onChange={(e)=>onChange(e.target.value)}>
        {options.map((o:any)=>(<option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
    </label>
  )
}
