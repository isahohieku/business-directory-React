import React, { Component } from 'react';
import { Modal } from 'react-bootstrap/';
import { FormControl } from '../form-controls/form-control';
import { Button } from '../form-controls/button';
import '../admin-dashboard/businesses/businesses.Style.scss';
import AddImage from '../../img/add-img2.jpg';

export default class CreateBusinessModal extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            business: {
                businessName: '',
                businessDescription: '',
                businessKeyword: '',
                businessEmail: '',
                businessWebsite: '',
                businessPhone: '',
                businessAddress: ''
            },
            error: {},
            businessKeywords: [],
            businessImages: []
        }

        // Refs
        this.uploadFile = React.createRef();

        this.setShow = this.setShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openImageUpload = this.openImageUpload.bind(this);
        this.handleRemoveImage = this.handleRemoveImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setShow(value) {
        this.setState({ showModal: value });
    }

    handleChange(e) {
        const { business } = this.state;
        business[e.target.name] = e.target.value;
        this.setState({ business });
    }

    handleRemoveImage(i) {
        
        const { businessImages } = this.state;

        businessImages.splice(i, 1);

        this.setState({ businessImages });
    }

    onSubmit() {
        console.log(this.state.businessImages);
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
                                        // error={errors.businessName}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business description */}
                            <div className="row mt-3">
                                <div className="col">
                                    <textarea
                                        name="businessDescription"
                                        value={businessDescription}
                                        onChange={this.handleChange}
                                        placeholder="Business Description"
                                        // error={errors.businessName}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business Keyword */}
                            <div className="row mt-3">
                                <div className="col">
                                    <FormControl
                                        label=""
                                        name="businessKeyword"
                                        type="text"
                                        value={businessKeyword}
                                        onChange={this.handleChange}
                                        placeholder="Enter Keyword"
                                        // error={errors.businessName}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

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
                                        // error={errors.businessName}
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
                                        // error={errors.businessName}
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
                                        // error={errors.businessName}
                                        required
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Business address */}
                            <div className="row mt-3">
                                <div className="col">
                                    <textarea
                                        name="businessAddress"
                                        value={businessAddress}
                                        onChange={this.handleChange}
                                        placeholder="Business Address"
                                        // error={errors.businessName}
                                        required
                                        className="form-control"
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
                                        loading={this.state.loginLoading}
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

    openImageUpload() {
        this.uploadFile.current.click();
    }

    fileToBase64(es) {
        if (es) {
            const file = es.current.files[0];
            const d = this;
            const myReader = new FileReader();

            myReader.onloadend = (e) => {
                const { businessImages } = d.state;
                businessImages.push(myReader.result)
                d.setState({ businessImages });
            };
            myReader.readAsDataURL(file);
        }
    }

    sendImage() {
        const body = new FormData();

        // body.append('file', files);
        return;
        // const url = `https://api.cloudinary.com/v1_1/${
        //     this.context.cloudName
        //     }/upload`;
        // const title = this.titleEl.value;

        // for (let file of files) {
        //     const photoId = this.photoId++;
        //     const fileName = file.name;
        //     request.post(url)
        //         .field('upload_preset', this.context.uploadPreset)
        //         .field('file', file)
        //         .field('multiple', true)
        //         .field('tags', title ? `myphotoalbum,${title}` : 'myphotoalbum')
        //         .field('context', title ? `photo=${title}` : '')
        //         .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
        //         .end((error, response) => {
        //             this.onPhotoUploaded(photoId, fileName, response);
        //         });
        // }
    }

    onPhotoSelected(file) {
        this.fileToBase64(file);
    }
}