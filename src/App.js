import { useState } from 'react'
import './App.css'
import { Alert } from './components/Alert'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
export const App = () => {
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState(0)

  //budget 초기화 부분
  const [expenses, setExpenses] = useState([])

  const clearItems = () => {
    setExpenses([])
  }

  const [alert, setAlert] = useState({ show: false })

  const [id, setId] = useState('')

  const [edit, setEdit] = useState(false)

  //e : 이벤트 객체
  const handleCharge = e => {
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    setAmount(e.target.valueAsNumber)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map(budget => {
          return budget.id === id
            ? { ...budget, charge: charge, amount: amount }
            : budget
        })

        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' })
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge: charge,
          amount: amount,
        }

        //불변성을 위해 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        handleAlert({ type: 'success', text: '예산이 추가되었습니다.' })
      }
      setCharge('')
      setAmount(0)
    } else {
      console.log('error')
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으며, amount는 0이 될 수 없습니다.',
      })
    }
  }

  const handleDelete = id => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    //state를 업데이트해주는 함수
    setExpenses(newExpenses)
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type: type, text: text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)
  }

  const handleEdit = id => {
    const expense = expenses.find(budget => budget.id === id)
    const { charge, amount } = expense
    setId(id)
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
  }

  return (
    <main className="main-container">
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <h1>예산 계산기</h1>

      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/**expense form */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        {/**expense list */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}
      >
        <p style={{ fontSize: '2rem' }}>
          총 지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount)
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  )
}
