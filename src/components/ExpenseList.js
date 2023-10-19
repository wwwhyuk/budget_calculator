import React from 'react'
import './ExpenseList.css'
import { ExpenseItem } from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
export const ExpenseList = ({
  clearItems,
  handleDelete,
  expenses,
  handleEdit,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  )
}
