import { useState } from "react";

export class formValidator {
    constructor(formElement, setButtonActivity) {
        this._formElement = formElement;
        this._inputFields = Array.from(
            formElement.querySelectorAll("input"));
        this._setButtonActivity = setButtonActivity;
    }

    _findInvalidInput() {
        return this._inputFields.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement, errorMessage) {
    }

    _hideInputError(inputElement) {
    }

    enableValidation() {
        this.toggleButtonState();
    }

    toggleButtonState() {
        if (this._findInvalidInput()) {
            this._setButtonActivity(false);
        } else {
            this._setButtonActivity(true);
        }
    }
}