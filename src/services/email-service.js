const sender = require('../config/emailConfig');

const TicketReposiroty = require('../repository/ticket-repository');

const repo = new TicketReposiroty();

const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        await sender.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailBody
        })
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async (timeStamp) => {
    try {
        const responce = await repo.get({ status: "PENDING" });
        return responce;
    } catch (error) {
        console.log(error);

    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const responce = await repo.update(ticketId, data);
        return responce;
    } catch (error) {
        throw error;
    }
}


const createNotification = async (data) => {
    try {
        const responce = await repo.create(data);
        return responce;
    } catch (error) {
        console.log(error);
    }
}

const subscribeEvents = async (payLoad) => {
    let service = payLoad.service;
    let data = payLoad.data;
    switch (service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            break;
        case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
        default:
            console.log('No valid event recieved');
            break;
    }
}


module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}


// SMTP  ->a@gmail.com
// receiver  ->d@e.com
// from : support@not.com
