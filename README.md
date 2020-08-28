# gold-rate-automater (fetches latest gold rate and send a whatsapp message every day)

Background: My father asked me to update him with gold rate everyday. I thought of automating this job.

Plan:
1. Get current gold rate.
2. Send whatsapp message everyday to my father.

Technical:
1. Fetch current gold rate using any publicly available gold api.
2. Setup an account on twilio to send whatsapp messages with gold rate.
3. Create a cron job to send whatsapp message everyday at 6 PM.
   -- Using serverless - Use firebase cloud function to deploy my gold rate messenger function.
   The cloud function is setup as a cron job to run everyday.
