import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SignupLabValidators {
    // Validate form if all necessary fields are valid
    static validateForm(form: AbstractControl): ValidationErrors | null {
        // Lab Info
        const countryFilterCtrl = form.get('countryFilterCtrl');
        const selectedCountryCtrl = form.get('selectedCountryCtrl');
        const governmentIdCtrl = form.get('governmentIdCtrl');
        const emailCtrl = form.get('emailCtrl');

        // Contact Info
        const phoneCountryCodeCtrl = form.get('phoneCountryCodeCtrl');
        const phoneNumberCtrl = form.get('phoneNumberCtrl');
        const confirmPhoneNumberCtrl = form.get('confirmPhoneNumberCtrl');
        const combinedPhoneNumberCtrl = form.get('combinedPhoneNumberCtrl');
        const streetCtrl = form.get('streetCtrl');

        return !(countryFilterCtrl && countryFilterCtrl.valid
            && selectedCountryCtrl && selectedCountryCtrl.valid
            && governmentIdCtrl && governmentIdCtrl.valid
            && emailCtrl && emailCtrl.valid
            && phoneCountryCodeCtrl && phoneCountryCodeCtrl.valid
            && phoneNumberCtrl && phoneNumberCtrl.valid
            && confirmPhoneNumberCtrl && confirmPhoneNumberCtrl.valid
            && combinedPhoneNumberCtrl && combinedPhoneNumberCtrl.valid
            && streetCtrl && streetCtrl.valid)
            ? { invalidForm: true }
            : null;
    }

    static confirmPhoneNumber(group: AbstractControl): ValidationErrors | null {
        const phoneNumberCtrl = group.get('newPhoneNumberCtrl')?.value as string;
        const confirmPhoneNumberCtrl = group.get('confirmPhoneNumberCtrl')?.value as string;

        console.log('phone ' + phoneNumberCtrl);
        console.log('confirm ' + confirmPhoneNumberCtrl);

        return phoneNumberCtrl !== confirmPhoneNumberCtrl ? { invalidNumbersMatch: true } : null
    }
}