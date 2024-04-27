create table email_templates
(
    id      serial
        primary key,
    name    varchar(255),
    content text
);

alter table email_templates
    owner to admin;

INSERT INTO public.email_templates (id, name, content) VALUES (50, 'email_verification', '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" bgcolor="#e9ecef"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="left" bgcolor="#ffffff" style="padding:36px 24px 0;font-family:''Source Sans Pro'',Helvetica,Arial,sans-serif;border-top:3px solid #d4dadf"><h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:-1px;line-height:48px">Confirm Your Email Address</h1></td></tr></table></td></tr><tr><td align="center" bgcolor="#e9ecef"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:''Source Sans Pro'',Helvetica,Arial,sans-serif;font-size:16px"><p style="margin:0">Hi, $user_name$</p><p style="margin:0">This is your account verification email.</p></td></tr><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:''Source Sans Pro'',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px"><p style="margin:0">Tap the button below to confirm your email address.</p></td></tr><tr><td align="left" bgcolor="#ffffff"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" bgcolor="#ffffff" style="padding:12px"><table border="0" cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#1a82e2" style="border-radius:6px"><a href="$url$/account/verify-email?token=$token$" target="_blank" style="display:inline-block;padding:16px 36px;font-family:''Source Sans Pro'',Helvetica,Arial,sans-serif;font-size:16px;color:#fff;text-decoration:none;border-radius:6px">Verify Email</a></td></tr></table></td></tr></table></td></tr><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:''Source Sans Pro'',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;border-bottom:3px solid #d4dadf"><p style="margin:0">Cheers,<br>MathAR Game</p></td></tr></table></td></tr></table>');
