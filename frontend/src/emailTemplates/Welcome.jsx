const Welcome = ({ firstName, url }) => {
  return (
    <html>
      <head>
        <title>Welcome to Adventura Family</title>
      </head>
      <body>
        <h1>Welcome to the Adventura Family, {firstName}!</h1>
        <p>We are excited to have you on board.</p>
        <p>Click the link below to get started:</p>
        <a href={url}>Get Started</a>
      </body>
    </html>
  );
};

export default Welcome;
