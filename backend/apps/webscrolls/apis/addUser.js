const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/webscrolls/apis/lib/constants`); 

const person = require(`${CONSTANTS.APPROOTDIR}/webscrolls/apis/lib/person.js`);

exports.doService = async jsonReq => { 
    // Validate API request and check mandatory payload required 
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS; 
    try {
        LOG.info("JSON was: " + JSON.stringify(jsonReq));
        const message = await addUser(jsonReq); 
        if (!message) return API_CONSTANTS.API_RESPONSE_FALSE; 
        return { result: true, results: { message } }; 
    } catch (error) { 
        console.error(error); 
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR; 
    } 
} 

const addUser = async (jsonReq) => { 
    LOG.info("JSON wass: " + JSON.stringify(jsonReq));
    try {  
        if(jsonReq) return await person.addUser(jsonReq);
    } catch (error) { 
        throw error; 
    } 
    
} 
const validateRequest = jsonReq => (jsonReq);