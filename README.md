# companion-module-textmebot-whatsappapi

See [HELP.md](./companion/HELP.md) and [LICENSE](./LICENSE)

## Reference
API-Reference used can be found here: https://textmebot.com/


## ⚠️Warning⚠️ (please read and remember):

WhatsApp will block your number if you send messages to people who is not expecting to receive a message from you.
Please use this api with caution and responsibility.

Some recommendations to avoid getting your phone number blocked by WhatsApp
1) Implement a delay between messages (min. 5 seconds). The more the better.
2) Do not send messages to people that you do not know.
3) It is recommended to have the recipient of the message in your phone contact list
4) Use a dedicated phone number for the API. If WhatsApp block your number, you do not loose your personal chats, images, contacts, documents, etc.
5) A loop in your code will send 100s of message and whatsapp will block your number. Be careful!


## 🚨Disclaimer🚨 (please read and remember):

a) This API is inended for Personal Usage only. If you decide to use it for Business, it is at your own risk.
b) Ensure to have a robust contingenct plan. Like Twilio. To be used in case of API downtime.
c) You are the only one responsible for the messages and the content that you sent. Rember that messages will be sent from your phone number.
d) TextMeBot is not responsible for any ban or block performed by WhatsApp on your number. And I cant do anything to unblock it