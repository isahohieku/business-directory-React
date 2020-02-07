import dotenv from 'dotenv';
import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { getRequest, postRequest } from '../../handlers/requests';
import { emailValidator, websiteValidator } from '../../handlers/helpers';
import { Modal } from 'react-bootstrap/';
import { FormControl } from '../widgets/form-controls/form-control';
import { Button } from '../widgets/form-controls/button';
import RenderLists from './search-result';
import '../admin-dashboard/businesses/businesses.Style.scss';
import AddImage from '../../img/add-img2.jpg';
dotenv.config();


export default class CreateBusinessModal extends Component {

    widget = window.cloudinary.createUploadWidget({
        cloudName: 'isahohieku',
        uploadPreset: 'lmmb3jax'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            const { businessImages } = this.state;

            businessImages.push(result.info.secure_url);
            this.setState({ businessImages });
        }
    }
    )

    constructor() {
        super()
        this.state = {
            showModal: false,
            creationLoading: false,
            business: {
                businessName: '',
                businessDescription: '',
                businessEmail: '',
                businessWebsite: '',
                businessPhone: '',
                businessAddress: ''
            },
            errors: {},
            businessKeywords: [],
            businessImages: [],
            searchResult: [],
            searchLoading: false,
            businessKeyword: ''
        }

        // Refs
        this.uploadFile = React.createRef();

        this.setShow = this.setShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
        this.openImageUpload = this.openImageUpload.bind(this);
        this.handleRemoveImage = this.handleRemoveImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.handleKeywordsChange = _.debounce((businessKeyword) => {
            this.setState({ businessKeyword });
            this.makeSearch()
        }, 500);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
        if (e.target.name !== 'businessKeyword' && !$(e.target).closest('#search-result').length && this.state.searchResult.length) {
            let { searchResult } = this.state;
            searchResult = [];
            this.setState({ searchResult });
        }
    }

    setShow(value) {
        this.setState({ showModal: value });
    }

    handleChange(e) {
        const { business } = this.state;
        business[e.target.name] = e.target.value;
        this.setState({ business });
    }

    handleKeywordsChange(e) {
        let { businessKeyword } = this.state;
        businessKeyword = e.target.value;
        this.setState({ businessKeyword });
    }

    handleRemoveImage(i) {
        const { businessImages } = this.state;

        businessImages.splice(i, 1);

        this.setState({ businessImages });
    }

    onSubmit(e) {
        e.preventDefault();
        let { business, businessImages, businessKeywords, errors } = this.state;
        const data = { ...business, businessImages, businessKeywords };

        let err = {};

        if (!data.businessName) {
            err.businessName = 'Business name is required';
        }

        if (!data.businessDescription) {
            err.businessDescription = 'Business description is required';
        }

        if (!data.businessEmail || !emailValidator(data.businessEmail)) {
            err.businessEmail = 'Valid business email is required';
        }

        if (!data.businessWebsite || !websiteValidator(data.businessWebsite)) {
            err.businessWebsite = 'Valid business website is required';
        }

        if (!data.businessPhone) {
            err.businessPhone = 'Business Phone number is required';
        }

        if (!data.businessAddress) {
            err.businessAddress = 'Business Address is required';
        }

        errors = err;

        this.setState({ errors });

        if (!Object.getOwnPropertyNames(err).length) {
            this.setState({ submitted: true });
        } else {
            return;
        }

        const url = 'http://localhost:4000/api/businesses';
        this.setState({ creationLoading: true });
        postRequest(url, data)
            .then(res => {
                this.setState({ creationLoading: false });
            })
            .catch(e => console.log(e));
    }

    makeSearch() {
        // const url = `https://business-directory-backend.herokuapp.com/api/businesses/search?term=${this.state.businessKeyword}`;
        const url = `http://localhost:4000/api/categories/search?term=${this.state.businessKeyword}`;

        this.setState({ searchLoading: true });
        this.setState({ searchResult: [] })
        getRequest(url)
            .then(res => {
                this.setState({ searchResult: res.data.data });
                this.setState({ searchLoading: false });
            })
            .catch(e => this.setState({ searchLoading: false }));
    }

    render() {
        const {
            business: {
                businessName,
                businessDescription,
                businessKeyword,
                businessEmail,
                businessWebsite,
                businessPhone,
                businessAddress
            },
            errors
        } = this.state;
        return (
            <React.Fragment>
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
                                    <h6>Create Business</h6>
                                </div>
                            </div>
                            {/* Business name */}
                            <div className="row mt-3">
                                <div className="col">
                                    <FormControl
                                        label=""
                                        name="businessName"
                                        type="text"
                                        value={businessName}
                                        onChange={this.handleChange}
                                        placeholder="Business name"
                                        error={errors.businessName}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business description */}
                            <div className="row mt-3">
                                <div className="col">
                                    {errors.businessDescription && <p className="text-danger text-right text-small mb-0">{errors.businessDescription}</p>}
                                    <textarea
                                        name="businessDescription"
                                        value={businessDescription}
                                        onChange={this.handleChange}
                                        placeholder="Business Description"
                                        maxLength="200"
                                        className="form-control"
                                        style={errors.businessDescription && { border: 'solid red 1px' }}
                                    />
                                </div>
                            </div>

                            {/* Business Keyword */}
                            <div className="row mt-3">
                                <div className="col position-relative">
                                    <FormControl
                                        label=""
                                        name="businessKeyword"
                                        type="text"
                                        value={businessKeyword}
                                        onChange={e => this.handleKeywordsChange(e.target.value)}
                                        placeholder="Enter Keyword"
                                        // error={errors.business}
                                        required
                                        className="form-control"
                                    />

                                    {this.renderLists()}
                                </div>
                            </div>

                            {/* categories */}
                            {this.renderCategories()}

                            {/* Business Email */}
                            <div className="row mt-3">
                                <div className="col">
                                    <FormControl
                                        label=""
                                        name="businessEmail"
                                        type="email"
                                        value={businessEmail}
                                        onChange={this.handleChange}
                                        placeholder="Business Email"
                                        error={errors.businessEmail}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business Website */}
                            <div className="row mt-3">
                                <div className="col">
                                    <FormControl
                                        label=""
                                        name="businessWebsite"
                                        type="text"
                                        value={businessWebsite}
                                        onChange={this.handleChange}
                                        placeholder="Business Website"
                                        error={errors.businessWebsite}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business Phone */}
                            <div className="row mt-3">
                                <div className="col">
                                    <FormControl
                                        label=""
                                        name="businessPhone"
                                        type="tel"
                                        value={businessPhone}
                                        onChange={this.handleChange}
                                        placeholder="Business Phone"
                                        error={errors.businessPhone}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business address */}
                            <div className="row mt-3">
                                <div className="col">
                                    {errors.businessAddress && <p className="text-danger text-right text-small mb-0">{errors.businessAddress}</p>}
                                    <textarea
                                        name="businessAddress"
                                        value={businessAddress}
                                        onChange={this.handleChange}
                                        placeholder="Business Address"
                                        className="form-control"
                                        maxLength="200"
                                        style={errors.businessAddress && { border: 'solid red 1px' }}
                                    />
                                </div>
                            </div>

                            {/* Business Images */}
                            <div className="row mt-3">
                                {this.renderIfImagesAdded()}
                                {this.renderIfNoImages()}

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple="multiple"
                                    hidden
                                    ref={this.uploadFile}
                                    onChange={
                                        () => this.onPhotoSelected(this.uploadFile)
                                    }
                                />
                            </div>

                            {/* Business submit button */}
                            <div className="row mt-3">
                                <div className="col">
                                    <Button
                                        type="submit"
                                        label="Create Business"
                                        className="btn font-weight-light btn-primary mt-3 py-2 w-100 border-0"
                                        loading={this.state.creationLoading}
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

    renderIfNoImages() {
        return (
            this.state.businessImages.length && (this.state.businessImages.length > 3)
                ? '' : <div className="col-3"><img src={AddImage} onClick={this.openImageUpload} className="w-100" alt="Add Images" /></div>
        );
    }

    addImageToBackground(image) {
        return {
            backgroundImage: `url(${image})`,
        };
    }

    renderIfImagesAdded() {
        return (
            this.state.businessImages.length
                ? (this.state.businessImages.map((image, i) =>
                    <div className="col-3 position-relative" key={image}>
                        <div className="image-height image-holder" style={this.addImageToBackground(image)}>
                            {/* <img src={image} className="w-100" alt="Add Images" /> */}
                        </div>
                        <span className="position-absolute remove_button bg-dark text-light mousePointer"
                            onClick={() => this.handleRemoveImage(i)}><i className="fas fa-times"></i></span>
                    </div>)
                ) : ''
        );
    }

    renderLists() {
        return (
            this.state.searchResult.length ?
                <div className="position-absolute w-90 border bg-white border-secondary" id="search-result" style={{ zIndex: 1 }}>
                    <RenderLists list={this.state.searchResult} selected={(e) => this.selectedCategory(e)} loading={this.state.searchLoading} />
                </div> : ''
        );
    }

    renderCategories() {
        return (
            this.state.businessKeywords.length ?
                <div className="row mt-2">
                    <div className="col">
                        {this.state.businessKeywords.map(item => (<span key={item.id} className="badge badge-pill badge-light mx-2">{item.name}</span>))}
                    </div>
                </div> : ''
        );
    }

    selectedCategory(e) {
        let { businessKeywords, businessKeyword, searchResult } = this.state;

        businessKeywords = businessKeywords.filter(item => item.id !== e.id);
        businessKeywords.push(e);
        searchResult = [];
        businessKeyword = '';
        this.setState({ businessKeywords, searchResult, businessKeyword });

    }

    openImageUpload() {
        this.widget.open();
    }
}