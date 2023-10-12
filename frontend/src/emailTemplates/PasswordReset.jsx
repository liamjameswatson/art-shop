import React from "react";

const PasswordReset = ({ firstName, url }) => {
  return (
    <html>
      <head>
        <title>Reset Password</title>
      </head>
      <body>
        <h1>Reset your password, {firstName}!</h1>
        <p>We are excited to have you on board.</p>
        <p>Click the link below to get started:</p>
        <a href={url}>Get Started</a>
      </body>
    </html>
  );
};

export default PasswordReset;
