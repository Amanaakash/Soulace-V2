import axios from 'axios';

const INFOBIP_BASE_URL = 'https://xk5jge.api.infobip.com'; // Replace with your Infobip URL
const INFOBIP_API_KEY = 'c49f49f2fdbf3de931251d2021f4d5c8-dead7421-4345-4df0-b348-66d3994bb643'; // Replace with your API Key

export const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post(
      `${INFOBIP_BASE_URL}/sms/2/text/advanced`, 
      {
        messages: [
          {
            destinations: [{ to: phoneNumber }],
            text: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `App ${INFOBIP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`SMS sent:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending SMS via Infobip:', error.response?.data || error.message);
    throw error;
  }
};
