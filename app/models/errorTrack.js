var nodemailer = require('nodemailer');
    q=require('q');

module.exports = {
    
    sendEmail:function(body) {
        var defer=q.defer();
        var receiver=body.email;
        var content=body.content;
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com', //example:smtp.qq.com
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: '598497916@qq.com',//邮箱帐号 example:1234@qq.com
                pass: 'kriakfuffatkbddi' //授权码或密码
            }   
        });
        let mailOptions = {
            from: '"katieh" <598497916@qq.com>', // sender address,要和上面配置的邮箱地址一致，example: "katieh" <1234@qq.com>
            to: receiver, // list of receivers，example:xxxx@eheatlh.com
            subject: 'new notification',
            text: content, // plain text body
            attachments: [{path: '/Users/colinc/stash/testM/output/result.jpg'}]
        };
        transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return defer.reject(error);
                }
                var succuessInfo='Message %s sent: %s'+info.messageId+info.response;
                console.log(succuessInfo);
                return defer.resolve(succuessInfo); 
        });
        return defer.promise;  
    }
}
