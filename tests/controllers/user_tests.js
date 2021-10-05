import { user_controller } from '../../controllers';
// test continued
import { MailSlurp } from "mailslurp-client"
const api = new MailSlurp({ apiKey: "test" })

async function generateNewEmailAddress() {
  return await api.createInbox()
}

describe("test user sign up", () => {
  it("can sign up as new user", async () => {
    // we will write this function next
    const inbox = await generateNewEmailAddress();
    await page.type('input[name="password"]', password);
    await page.type('input[name="email"]', inbox.email);
    await page.$eval('input[name="submit"]', (btn) => btn.click());
  });
});