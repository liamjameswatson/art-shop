 class Email {
   constructor(user, url) {
     this.to = user.email;
     this.firstName = user.name.split(" ")[0];
     this.url = url;
     this.from = `The art shop team <${process.env.EMAIL_FROM}>`;
   }

   createTransport() {
     if (process.env.NODE_ENV === "production") {
        SEND REAL EMAIL
       return 1;
     } else {
       const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         auth: {
           user: process.env.EMAIL_USERNAME,
           pass: process.env.EMAIL_PASSWORD,
         },
       });
       return transporter
     }
   }

   send(template, subject) {
        // 1) Create a function to render JSX to HTML
       const renderToHtml = (jsxTemplate) => {
         const html = ReactDOMServer.renderToStaticMarkup(jsxTemplate); // Render JSX to HTML
         return `<!DOCTYPE html>${html}`;
       };

       let jsxTemplate;
       
       if (template === 'welcome') {
           jsxTemplate = <Welcome firstName={this.firstName} url={this.url} />;  Use WelcomeEmail JSX template
        } else if (template === 'passwordReset') {
            jsxTemplate = <PasswordResetEmail url={this.url} />;  Use PasswordResetEmail JSX template
        }
        
        const html = renderToHtml(jsxTemplate);
        
        // 2) Define email options
       const mailOptions = {
     from: this.from,
     to: this.to,
     subject,
     html,
     text: htmlToText(html),
   };

   send(template, subject) {
      1. Render HTML based on a template

      2.  Define the email options

     const mailOptions = {
       from: "The art shop team",
      to: options.email,  argument passed to function
       subject: options.subject,
       text: options.message,
        html:
   };

   3. Send the email
   await transporter.sendMail(mailOptions);
 };
 }

 sendWelcome() {
   this.send(`Welcome`, `Welcome the the Art Shop...`)
 }
 }

 const sendEmail = async (options) => {

   3) Send the email
   await transporter.sendMail(mailOptions);
 };

 export default sendEmail;
