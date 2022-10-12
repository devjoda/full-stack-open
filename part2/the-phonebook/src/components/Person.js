import {Button} from './Button'

const Person = ({name, number, id, onClickDeleteNumber}) => {
  return (
    <div style={{display: 'flex', gap: '15px', padding: '5px 0'}}>
      {name} {number}{' '}
      <Button label='delete' onClick={() => onClickDeleteNumber(id)} />
    </div>
  )
}

export {Person}
