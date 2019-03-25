import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AddModal from './AddModal';

import _findIndex from 'lodash/findIndex';

import '../style/itemTable.scss';

class VideoComponent extends React.Component {
    state = {
      toggleModal: new Array(this.props.searchResults).fill(false),
    }

    goToMedia = (item) => {
        const url = item.link;

        axios({
            method: 'GET',
            url,
          }).then((response) => {
                let mediaLink = "";
                const resArr = response.data.collection.items;
                for (let i = 0; i < resArr.length; i += 1) {
                    if (resArr[i].href.includes("~orig")) {
                        // console.log(resArr[i].href);
                        mediaLink = resArr[i].href;
                        break;
                    }
                }
                window.location.href = mediaLink;
          }).catch(() => {
            return;
          });
    }

    save = (data) => {
      localStorage.setItem("nasa", JSON.stringify(data));
    }

    deleteData = (id, data) => {
      let dataIndex = _findIndex(data, {"id" : id});
      data.splice(dataIndex, 1);
      this.save(data);
      this.forceUpdate();
    }

    favorite = (id, data, e) => {
        let dataIndex = _findIndex(data, { "id": id });
        data[dataIndex].favorite = !data[dataIndex].favorite;
        this.save(data);
        this.forceUpdate();
    }

    createTable = (data) => {
        let arrangedTable = [];
        let count = 0;
        for (let i = 0; i < (Math.round(data.length / 3) + (data.length % 3)); i += 1) {
            // const uniqueId = i;
            let tableRow = [];
            for (let j = 0; j < 3; j += 1) {
              if (data[count]) {
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
      const table = this.createTable(this.props.data);
        const resList = table.length ? table.map(item => {
            return (
                <tr>
                    {
                        item.map(o => {
                            return (
                                <td key={ o.id } className="table-cells">
                                    <div><img alt="nasa-item" src={ o.preview } width="300" height="300" onClick={() => {this.goToMedia(o);}}></img></div>
                                    <div><span><b>Title: { o.title }</b></span></div>
                                    {/* <div><textarea rows="5" cols="50" value={ o.description } disabled></textarea></div> */}
                                    <div><span className="description">{ o.description }</span></div>
                                    <div>
                                        <Button variant="primary" onClick={() => {this.showModal(o.id)}}>Edit Item</Button>
                                        <Button variant="primary" onClick={() => {this.deleteData(o.id, this.props.data)}}>Delete</Button>
                                        <Button variant="info" style={{display: (o.favorite === false) ? "inline-block" : "none"}} onClick={() => {this.favorite(o.id, this.props.data)}}><span className="glyphicon"></span>♡</Button>
                                        <Button variant="info" style={{display: (o.favorite === true) ? "inline-block" : "none"}} onClick={() => {this.favorite(o.id, this.props.data)}}><span className="glyphicon"></span>♥</Button>
                                    </div>
                                    <AddModal item={o} list={this.props.data} open={this.state.toggleModal[o.id]} handleClose={this.hideModal} toggleNo={o.id} purpose="edit"></AddModal>
                                </td>
                            )
                        })
                    }
                </tr>
            )
        }) : (
            <div>
                There is currently no items in the collection. Head to the Search Bar and start adding some!
            </div>
        )
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

  export default VideoComponent;