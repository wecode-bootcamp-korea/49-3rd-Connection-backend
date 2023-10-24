// const { paymentService } = require('../services');

const userId = req.userId;

app.post("/payments/complete", async (req, res) => {
  try {
    // req의 body에서 imp_uid, merchant_uid 추출
    const { imp_uid, merchant_uid } = req.body; 

    // 액세스 토큰(access token) 발급 받기
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, 
      data: {
        imp_key: "imp_apikey", // REST API 키 //창선님 키
        imp_secret: "ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f" // REST API Secret
      }
    });
    const { access_token } = getToken.data; // 인증 토큰

    // imp_uid로 포트원 서버에서 결제 정보 조회
    const getPaymentData = await axios({
      // imp_uid 전달
      url: `https://api.iamport.kr/payments/${imp_uid}`, 
      // GET method
      method: "get", 
      // 인증 토큰 Authorization header에 추가
      headers: { "Authorization": access_token } 
    });

    app.use(bodyParser.json());
    app.post("/payments/complete", async (req, res) => {
      try {
        // req의 body에서 imp_uid, merchant_uid 추출
        const { imp_uid, merchant_uid } = req.body; 

        // API KEY 세팅하기
        const iamport = new Iamport({
					apiKey: "1520702154347286",
		      apiSecret: "oPt7RwbMUBXANPrILHBto235HxRMy3RUHujGWBCqtoVKkID5i0FFPCcVfT0GzpIDbCwXKVSkzxhKeB2I",
		    });
        // imp_uid로 결제정보 할당
        const setPaymentsUid = Payments.getByImpUid(req.body);
				// 할당된 값으로 포트원에 결제 정보 요청
		    const getPayment = await setPaymentsUid.request(iamport); // 결제 정보
				/*
				비즈니스 로직
				*/
      
      } catch (e) {
        res.status(400).send(e);
      }
    
    });