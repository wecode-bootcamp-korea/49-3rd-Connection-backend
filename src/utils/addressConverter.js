const axios = require('axios');

const kakaoApiKey = '91c2c328f38ccaf4ad93136f203c5b04';

async function getGeoCode(userAddress) {
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/address.json',
      {
        params: { query: userAddress },
        headers: {
          Authorization: `KakaoAK ${kakaoApiKey}`,
        },
      }
    );

    const result = response.data.documents[0];
    const latitude = result.y;
    const longitude = result.x;

    return { latitude, longitude };
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}

module.exports = { getGeoCode };
