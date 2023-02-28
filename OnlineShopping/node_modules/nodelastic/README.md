**This is a NodeJS library to allow you to quickly and easily use the Elastic Email Web API V2.**

# Installation #
```sh
$ npm install nodelastic
```

# Prerequisites #
* [An Elastic Email account](https://elasticemail.com/account/)

# Functions #
```js
/**
 * Set default configuration that can be used to set common params.
 * @param {Object}         options     Object can be constructed from send parameters
 * Example : 
 *   var options { from : "from@domain.com", fromName : "Sender" }
 *   client.setConfig( options )
 */
function setConfig( options ) { ... }

/**
 * Returns a Promise of http response from Elastic Email
 * @param {Object}         params      Parameters that will override default configuration set in setConfig
 * @param {Array.<Object>} attachments Optional parameter. Please refer to the table below for more details.
 */
function send( params, attachments ) { ... }
```

`params` object passed into send function or `options` object passed into setConfig should have the following format 

| Key | Data Type | Required | Description |
| ------ | ------ | ---- | ------------|
| **subject** | String | true | Email subject |
| **msgTo** | [String] | true | List of email recipients (visible to all other recipients of the message as TO MIME header) |
| **from** | String | true | From email address |
| **fromName** | String | true | Display name for from email address |
| **bodyHtml** | String | true | Html email body |
| **bodyText** | String | true | Text email body |
| **replyTo** | String | false | Email address to reply to |
| **replyToName** | String | false | Display name of the reply to address |
| **msgCC** | [String] | false | List of email recipients (visible to all other recipients of the message as CC MIME header) |
| **msgBcc** | [String] | false | List of email recipients (each email is treated seperately) |
| **channel** | String | false | An ID field (max 191 chars) that can be used for reporting [will default to HTTP API or SMTP API] |
| **charset** | String | false | Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more… |
| **charsetBodyHtml** | String | false | Sets charset for body html MIME part (overrides default value from charset parameter) |
| **charsetBodyText** | String | false | Sets charset for body text MIME part (overrides default value from charset parameter) |
| **template** | String | false | The ID of an email template you have created in your account |
| **merge** | {String,String} | false | Request parameters prefixed by merge_ like merge_firstname, merge_lastname. If sending to a template you can send merge_ fields to merge data with the template. Template fields are entered with {firstname}, {lastname} etc. Example: merge_firstname=John |
| **timeOffSetMinutes** | String | false | Number of minutes in the future this email should be sent up to a maximum of 1 year (524160 minutes) |
| **poolName** | String | false | Name of your custom IP Pool to be used in the sending process |
| **headers** | {String,String} | false | Optional Custom Headers. Request parameters prefixed by headers_ like headers_customheader1, headers_customheader2. Note: a space is required after the colon before the custom header value. headers_xmailer=xmailer: header-value1 |
| **isTransactional** | Boolean | false | True, if email is transactional (non-bulk, non-marketing, non-commercial). Otherwise, false |

`attachment` object passed into the attachments array should have the following format 

| Key | Data Type | Type | Default Value |
| ------ | ------ | ---- | ------------- |
| **data** | String or Buffer | required | |
| **filename** | String | required | |
| **contentType** | String | `optional` | text/plain |


# Example #
```js
var ElasticMail = require('nodelastic');
var client = new ElasticMail('your_api_key_here');
var attachments = [ 
  // CSV
  { data: 'id,name\n1,name_1',
    filename: 'attachment1.csv' },
  // PDF
  { data: fs.readFileSync('filepath_here'),
    filename: 'attachment2.pdf',
    contentType: 'application/pdf' } 
];

client.send({
  from : 'from@domain.com',
  fromName : 'Sender',
  subject : 'Subject',
  msgTo: [ 'to@domain.com' ],
  msgCC: [ 'cc_1@domain.com', 'cc_2@domain.com' ],
  bodyHtml: '<h1>Hello World</h1>',
  textHtml: 'Hello World'
}, attachments).then(console.log);

// will print 
// {"success":true,"data":{"transactionid":"190d1b03-8b01-41a1-8003-17181c1719b0","messageid":"ilXf1Nm38mxuxemecfdbvw2"}}

// You can also set default options, for example having the same from and the name of the sender
// the function below is the same as the client.send above
client.setConfig({
  from : 'from@domain.com',
  fromName : 'Sender'
});
client.send({
  subject : 'Subject',
  msgTo: [ 'to@domain.com' ],
  msgCC: [ 'cc_1@domain.com', 'cc_2@domain.com' ],
  bodyHtml: '<h1>Hello World</h1>',
  textHtml: 'Hello World'
}, attachments).then(console.log);
```


![logo](https://elasticemail.com/files/ee_200x200.png)