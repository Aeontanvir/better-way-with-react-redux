import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please insert description and amount!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <input type="text" placeholder="Description" autoFocus
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Amount</td>
                                <td>:</td>
                                <td>
                                    <input type="number" placeholder="Amount"
                                        value={this.state.amount}
                                        onChange={this.onAmountChange}

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Create Date</td>
                                <td>:</td>
                                <td>
                                    <SingleDatePicker
                                        date={this.state.createdAt}
                                        onDateChange={this.onDateChange}
                                        focused={this.state.calendarFocused}
                                        onFocusChange={this.onFocusChange}
                                        numberOfMonths={1}
                                        isOutsideRange={() => false}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Note</td>
                                <td>:</td>
                                <td>
                                    <textarea
                                        value={this.state.note}
                                        onChange={this.onNoteChange}
                                        placeholder="Add a note for your expense (optional)">
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'right' }}>
                                    <button>Save</button>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </form>
            </div >
        );
    };
}

export default ExpenseForm;
