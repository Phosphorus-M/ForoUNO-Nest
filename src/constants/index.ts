import "dotenv/config";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

interface ConstantsInterface {
	JWT_ACCESS_SECRET: string;
	JWT_REFRESH_SECRET: string;
	JWT_ACCESS_EXPIRATION: string;
	JWT_REFRESH_EXPIRATION: string;
	UPLOAD_DIRECTORY: string;
	foro_host: string;
	mailData: SMTPTransport.Options;
	MAIL_HTML: (user: string,hashDirection: string) => string;
}

const constants: ConstantsInterface = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "erhjebrgjhetbgethj",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "rkjjrebgjhbgj4hgb",
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "5 minutes",
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "7 days",
	UPLOAD_DIRECTORY: process.env.UPLOAD_DIRECTORY || "uploads/",
	foro_host: "http://localhost:8081",
	mailData: {
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: "OAuth2",
			user: process.env.USER_MAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: process.env.ACCESS_TOKEN
		},
	},
	MAIL_HTML: (user, hashDirection) => `<div bgcolor="#00B1E1" style="padding: 0px; margin: 0px; width: 100%; background: url(&quot;https://ci5.googleusercontent.com/proxy/YWqgCFe8mKlAjqXcayoWs4802kaP6-EKTRnBeoZ83dnF2IFJOB1H4Zxk082yRcD5v4g=s0-d-e1-ft#https://i.imgur.com/hFv4s2U.png&quot;) 50% 0% / auto 100% repeat-x rgb(0, 177, 225); font-family: Helvetica, Arial, san-serif; max-width: 100%;"><span style="color: transparent; display: none; opacity: 0; height: 0px; width: 0px; font-size: 0px;">Welcome home.</span>
    
    <table bgcolor="#00B1E1" style="background: url(&quot;https://ci6.googleusercontent.com/proxy/012TQW0-T6pM8LDOaiK8XmnVisV2NnoRjqAbIwKBcKc6DvOia2i4leQgWsCQlS9bBZg=s0-d-e1-ft#https://i.imgur.com/5PXgiNF.png&quot;) 50% 0% / auto 100% repeat-x rgb(0, 121, 191); font-family: Helvetica, Arial, san-serif; margin: 0px; max-width: 100%; padding: 0px; width: 100%;">
        <tbody>
            <tr>
                <td>
                    <center>
                        <table style="margin: 0px auto; max-width: 100%; width: 600px;">
                            <tbody>
                                <tr>
                                    <td>
                                        
                                        <br><table bgcolor="white" border="0" cellpadding="0" cellspacing="0" style="background: white; border-radius: 8px; border: 0px; margin: 10px auto; width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td>
													<img src="https://i.imgur.com/qHmNeyA.png" border="0" style="height:auto;font-family:sans-serif;font-size:15px;line-height:15px;color:#555555;display: block; margin: auto" class="CToWUd">
<br>
</td></tr><tr>
<td style="padding:auto 20px;font-family:sans-serif;font-size:15px;line-height:20px;color:#555555;margin: auto 15px">
<br>                                    <h1 style="text-align:center;margin:0 0 10px 0;font-family:sans-serif;padding-top:15px;font-size:25px;line-height:30px;color:#333333;font-weight:normal">¡Bienvenid@ a <span class="il">ForoUNO</span>, ${user}!</h1>
<br>                                    <p style="text-align:center;margin:0;font-size:16px">Tu cuenta está casi lista, solo falta confirmarla.<br> Para eso tenés que hacer clic en el botón de abajo:</p>
<br>                                </td>


</tr>
<tr>
                                <td style="padding:0 20px">
<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:auto">
<tbody><tr>
                                            <td style="border-radius:4px;background:#1bbe15">
<a href="${constants.foro_host}/confirm/${hashDirection}" style="background:#1bbe15;border:1px solid #1bbe15;font-family:sans-serif;font-size:19px;font-weight:bold;line-height:15px;text-decoration:none;padding:13px 17px;color:#ffffff;display:block;border-radius:4px;margin: auto" target="_blank" data-saferedirecturl="${constants.foro_host}/confirm/${hashDirection}">Activar cuenta</a>
</td></tr>
</tbody></table>
</td>
</tr>


<tr>

<td style="padding:0 20px;font-family:sans-serif;font-size:15px;line-height:20px;color:#555555">

<br>                                    <h2 style="margin:0 0 10px 0;font-family:sans-serif;font-size:18px;line-height:22px;color:#333333;font-weight:bold;padding-top:29px">¿Por qué debo activar mi cuenta?</h2>
<p style="margin:0">
Tu cuenta debe ser activada para confirmar que esta dirección de correo electrónico te pertenece. Este procedimiento forma parte de nuestra política de seguridad. Así evitamos que se registren robots automatizados en el sitio y publiquen contenido no deseado.</p>
<br>
<h2 style="margin:10px 0 10px 0;font-family:sans-serif;font-size:18px;line-height:22px;color:#333333;font-weight:bold">¿Este proceso se realiza una sola vez?</h2>
<p style="margin:0">
Así es. Una vez que tu cuenta está activada vas a poder navegar sin límites en <span class="il">ForoUNO</span>.</p>

<br>                                    <h2 style="margin:10px 0 10px 0;font-family:sans-serif;font-size:18px;line-height:22px;color:#333333;font-weight:bold">¿Tengo que contestar este correo?</h2>
<p style="margin:0">No. Este correo se envía por única vez durante el registro de una nueva cuenta y no debe ser contestado.</p>

<br><br><br>                                           <p style="text-align:center;font-size:18px">¡Gracias por participar de la comunidad en línea de la Universidad Nacional del Oeste!</p>
<br>                                        <p style="margin:0;text-align:center;font-size:12px">© <span class="il">ForoUNO</span> 2022</p>
<br>                                </td>


</tr>






<tr style="vertical-align: top;">
		
<td><br>  </td></tr>
                                                    
                                                
                                            </tbody>
                                        </table>
                                        
                                        <table cellpadding="0" cellspacing="0" border="0" style="background: rgb(35, 84, 132); border-radius: 8px; margin-top: 20px; max-width: 100%; width: 600px;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table align="left" cellpadding="0" cellspacing="0" border="0" style="border-radius: 6px; max-width: 100%; overflow: hidden; width: 270px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <a href="#m_6371230860809677139_"><img width="270" height="216" alt="" src="https://i.imgur.com/iWoVSqM.png"></a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table cellpadding="30" cellspacing="0" border="0" align="right" style="max-width: 100%; width: 320px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="color: rgb(255, 255, 255); font-size: 18px; line-height: 24px;">
                                                                        <p style="margin: 0px 0px 8px; color: rgb(255, 255, 255); font-size: 18px; line-height: 24px; text-decoration: none;"><strong>¡Próximamente en celulares!</strong></p>
                                                                        <p style="margin: 0px 0px 12px; color: rgb(255, 255, 255); font-size: 18px; line-height: 24px; text-decoration: none;">Ten el material en iOS, Android, Desktop y más. </p>
                                                                        <table border="0" cellpadding="14" cellspacing="0" style="background: rgb(79, 118, 156); border-radius: 6px; color: rgb(255, 255, 255); display: inline-block; font-size: 18px; font-weight: bold; line-height: 24px; margin: 0px auto; text-align: center;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" style="vertical-align: middle;">
                                                                                        <a style="text-decoration: none;" href="#m_6371230860809677139_">
                                                                                            <font color="white">Ver noticias del foro</font>
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="12" style="border: 0px; font-size: 14px; line-height: 20px; max-width: 100%; width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <center>
                                                            <font color="white"><em>¿Quieres saber más?<br> </em>Siempre estamos escuchando sugerencias y respondemos las dudas</font><br>
                                                            <a style="color: white;" href="link" target="_blank">
                                                                <font color="white">Contactanos</font>
                                                            </a>
                                                            <a>
                                                                <font color="#FFFFFF">-</font>
                                                            </a>
                                                            <a href="link" target="_blank">
                                                                <font color="#FFFFFF">Ir al foro</font>
                                                            </a>
                                                            <br>
                                                            <font color="white" style="font-size: 12px;"><em>Copyright © 2018 {2} - Todos los derechos reservados<br> </em></font>
                                                        </center>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </center>
                </td>
            </tr>
        </tbody>
    </table>
</div>`
};

export default constants;
