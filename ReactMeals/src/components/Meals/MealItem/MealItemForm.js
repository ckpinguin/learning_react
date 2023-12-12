import classes from './MealItemForm.module.css'
import Input from '../../UI/Input/Input'
import { useRef, useState } from 'react'


const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true)

    // The alternative to a forwardRef would be 2-way-binding (with component-state)
    const amountInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value
        // convert to a number value
        const enteredAmountNumber = +enteredAmount

        if (enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNumber)
    }
    // To use „ref“ (react-element for primitives) on a custom component, we
    // need to use React.forwardRef((props, ref) => {}) in that custom component definition
    // to make it able to use refs
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input label='Amount' ref={amountInputRef} input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>

    )
}

export default MealItemForm