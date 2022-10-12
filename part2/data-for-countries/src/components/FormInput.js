const FormInput = ({label, value, onChange, type}) => {
  return (
    <div>
      {label}: <input value={value} onChange={onChange} type={type || 'text'} />
    </div>
  )
}

export {FormInput}
