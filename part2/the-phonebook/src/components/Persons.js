import {Person} from './Person'

const Persons = ({persons, filter, onClickDeleteNumber}) => {
  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  )
  return (
    <>
      {filteredPersons.map(fp => (
        <Person
          key={fp.name}
          name={fp.name}
          number={fp.number}
          id={fp.id}
          onClickDeleteNumber={onClickDeleteNumber}
        />
      ))}
    </>
  )
}

export {Persons}
