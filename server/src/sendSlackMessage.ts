//Import request module
var request = require('request');

async function sendSlackMessage(message, slack_id) {
    var url = "https://slack.com/api/chat.postMessage";
    var auth_token = process.env.OAUTH_TOKEN; //Your Bot's auth token
    var headers = {
    "Authorization": "Bearer " + auth_token,
    "Content-Type" : "application/json"
    }
    var body = {
        channel: slack_id, // Slack user or channel, where you want to send the message
        text: message
    }
    request.post({
    "url": url,
    "headers": headers,
    "body": JSON.stringify(body)
    }, (err, response, body) => {
    if (err) {
        console.log(err);
    }
    console.log("response: ", JSON.stringify(response));
    console.log("body: ",body);
    });
}

export default sendSlackMessage;