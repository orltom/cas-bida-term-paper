import React, {Component} from 'react';
import StarIcon from '@material-ui/icons/Star'
import './styles.css';

class Tickets extends Component {

    state = {
        tickets: [],
        winner: null
    }

    constructor(props) {
        super(props);
        let won = props.winner
        this.state = {
            tickets: props.tickets,
            winner: props.winner
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tickets: nextProps.tickets,
            winner: nextProps.winner
        });
    }

    render() {
        const {tickets, winner} = this.state;
        return (
            <table className="blockchain-meta-data table table-striped table-dark table-hover">
                <tbody>
                {tickets.map(function (ticket, index) {
                    return (
                        <tr key={index} className={index == winner ? 'row-winner' : ''}>
                            <td>{index}</td>
                            <td>{ticket}</td>
                            <td>
                                {index == winner ? <StarIcon className="text-warning"/> : ''}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}

export default Tickets;