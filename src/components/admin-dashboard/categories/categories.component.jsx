import React, { Component } from 'react';
import { FormControl } from '../../widgets/form-controls/form-control';
import { Button } from '../../widgets/form-controls/button';
import { Modal } from 'react-bootstrap';
import CategoriesCard from '../../widgets/categories.widget';
import Loader from '../../widgets/loader.widget';
import { getRequest, postRequest } from '../../../handlers/requests';

export default class Categories extends Component {

    constructor() {
        super();

        this.state = {
            showModal: false,
            creationLoading: false,
            loading: false,
            categories: [],
            categoryName: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const url = 'categories';
        this.setState({ loading: true });

        getRequest(url)
            .then(res => {
                let { categories } = this.state;
                categories = res.data.data
                this.setState({ loading: false });
                this.setState({ categories });
            })
            .catch(e => console.log(e));
    }

    setShow(value) {
        let showModal = value;
        this.setState({ showModal });
    }

    handleChange(e) {
        let { categoryName } = this.state;
        categoryName = e.target.value;
        this.setState({ categoryName });
    }

    onSubmit(e) {
        e.preventDefault();
        let { categoryName, error } = this.state;

        let err = {};

        if (!categoryName) {
            err.categoryName = 'Business name is required';
        }

        error = err;

        this.setState({ error });

        if (!Object.getOwnPropertyNames(err).length) {
            this.setState({ submitted: true });
        } else {
            return;
        }

        const data = {
            name: categoryName
        }

        const url = 'categories';
        this.setState({ creationLoading: true });
        postRequest(url, data)
            .then(res => {
                const { categories } = this.state;
                categories.push(res.data.data);
                this.setState({ categories });
                this.setShow(false);
                this.setState({ creationLoading: false });
            })
            .catch(e => console.log(e));
    }

    renderLoader() {
        return (
            this.state.loading ? <Loader /> : ''
        );
    }

    render() {
        let {
            categoryName,
            error
        } = this.state;
        return (
            <React.Fragment>
                <div className="container" style={{ minHeight: '100vh' }}>
                    <div className="row">
                        <div className="col pt-5 d-flex justify-content-between">
                            <h4 className="text-light">All Categories</h4>
                            <button className="btn add-button font-weight-light text-small text-light"
                                onClick={() => this.setShow(true)}><i className="fas fa-plus"></i></button>
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
                                                <h6>Create Category</h6>
                                            </div>
                                        </div>
                                        {/* Category name */}
                                        <div className="row mt-3">
                                            <div className="col">
                                                <FormControl
                                                    label=""
                                                    name="categoryName"
                                                    type="text"
                                                    value={categoryName}
                                                    onChange={this.handleChange}
                                                    placeholder="Category name"
                                                    // error={error}
                                                    required
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit button */}
                                        <div className="row mt-3">
                                            <div className="col">
                                                <Button
                                                    type="submit"
                                                    label="Create Category"
                                                    className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                                    loading={this.state.creationLoading}
                                                    handleClick={this.onSubmit}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {this.renderAllCategories()}
                        {this.renderLoader()}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleDeleted(id) {

        const { categories } = this.state;
        const categoryIndex = categories.findIndex(item => item.id === id);

        categories.splice(categoryIndex, 1);

        this.setState({ categories });

    }

    renderAllCategories() {
        return (
            this.state.categories.length ?
                (
                    this.state.categories.map(item => (
                        <div className="col-4" key={item.id}>
                            <CategoriesCard data={item} handleDelete={(id) => this.handleDeleted(id)} />
                        </div>
                    ))
                ) : ''
        );
    }
}