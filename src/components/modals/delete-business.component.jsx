import React, { Component } from 'react';
import { deleteRequest } from '../../handlers/requests';
import { Modal } from 'react-bootstrap/';
import { Button } from '../widgets/form-controls/button';
import '../admin-dashboard/businesses/businesses.style.scss';


export default class DeleteBusinessModal extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            deletionLoading: false,
            errors: {},
        }

        this.setShow = this.setShow.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    setShow(value) {
        this.setState({ showModal: value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.handleDeleteBusiness();
    }

    handleDeleteBusiness() {
        const id = this.props.id

        const url = `businesses?id=${id}`;

        let { deletionLoading } = this.state;

        deletionLoading = true;
        this.setState({ deletionLoading });
        deleteRequest(url)
            .then(_ => {
                this.props.deleted(id);
            })
            .catch(e => console.log(e));
    }

    render() {
        const {
            deletionLoading
        } = this.state;
        return (
            <React.Fragment>
                <button className="btn add-button font-weight-light text-small text-light"
                    onClick={() => this.setShow(true)}><i className="fas fa-times"></i></button>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.setShow(false)}
                    aria-labelledby="example-custom-modal-styling-title"
                    centered
                >
                    <Modal.Body>
                        <form className="container py-4">
                            <div className="row">
                                <div className="col">
                                    <h6>Delete Business</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <h5 className="text-primary2 mt-3 text-center">Are you sure you want to delete '{this.props.name}'?</h5>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col d-flex justify-content-around">
                                    <Button
                                        type="button"
                                        label="No"
                                        className="btn font-weight-light btn-primary mt-3 w-25 py-2 border-0"
                                        handleClick={() => this.setShow(false)}
                                    />

                                    <Button
                                        type="button"
                                        label="Yes"
                                        className="btn font-weight-light btn-primary mt-3 w-25 py-2 border-0"
                                        loading={deletionLoading}
                                        handleClick={this.onSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}