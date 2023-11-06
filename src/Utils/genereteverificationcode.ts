

export const generateVerivicationcode = () => {

    try {

        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        return verificationCode

    } catch (error) {
        return error.message
    }

}