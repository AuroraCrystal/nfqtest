import React from 'react';
// import imgStyle from '../style/images.scss';
import AddModal from './AddModal';
import Button from 'react-bootstrap/Button';

import '../style/itemTable.scss';

class SearchResults extends React.Component {
    state = {
        toggleModal: new Array(this.props.searchResults).fill(false),
    }

    createTable = (data) => {
        let arrangedTable = [];
        let count = 0;
        for (let i = 0; i < (Math.round(data.length / 2) + (data.length % 2)); i += 1) {
            // const uniqueId = i;
            let tableRow = [];
            for (let j = 0; j < 2; j += 1) {
                if(data[count]) {
                    tableRow.push({
                        ...data[count],
                    })
                    count += 1;
                }
            }
            arrangedTable.push(tableRow)
        }
        return arrangedTable;
    }

    showModal = (id) => {
        const modArr = this.state.toggleModal;
        modArr[id] = true;
        this.setState({
            toggleModal: modArr,
        })
    }

    hideModal = (id) => {
        const modArr = this.state.toggleModal;
        modArr[id] = false;
        this.setState({
            toggleModal: modArr,
        })
    }

    render() {
        const resList = this.createTable(this.props.searchResults).map(item => {
            return (
                <tr>
                    {
                        item.map(o => {
                            return (
                                <td key={ o.id } className="table-cells">
                                    <div><img alt="nasa-item" src={ o.preview } width="300" height="300"></img></div>
                                    <div><span><b>Title: { o.title }</b></span></div>
                                    <div><textarea rows="5" cols="50" value={ o.description } disabled></textarea></div>
                                    <div><Button variant="primary" onClick={() => {this.showModal(o.id)}}>Add New Item</Button></div>
                                    <AddModal item={o} list={this.props.itemList} open={this.state.toggleModal[o.id]} handleClose={this.hideModal} toggleNo={o.id} purpose="add" changeState={this.props.changeState}></AddModal>
                                </td>
                            )
                        })
                    }
                </tr>
            )
        })
        return (
            <div className="item-container">
                <table className="item-table">
                    <tbody>
                        { resList }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SearchResults;