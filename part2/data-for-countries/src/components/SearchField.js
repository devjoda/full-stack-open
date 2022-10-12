import {FormInput} from './FormInput'

const SearchField = ({label, value, onChange}) => {
  return (
    <FormInput label={label} value={value} onChange={onChange} type='search' />
  )
}

export {SearchField}
