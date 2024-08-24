export function validateEmail(email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
}

export function validatePhoneNumber(phone) {

    const phoneRegex = /^(?:\+?\d{1,3})?[ -]?(?:\(\d{1,4}\)|\d{1,4})[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}$/;

    return phoneRegex.test(phone);
}


export function validateAddress(address) {

    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    return addressRegex.test(address);
}