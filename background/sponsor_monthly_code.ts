import axios from "axios";

const sponsor_monthly_code = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const day = today.split("-")[2];
    if (day === "01") {
      console.log("Run");
      const { data } = await axios.put("https://www.glow-leds.com/api/promos/create_sponsor_codes");
    } else {
      console.log("Don't Run");
    }
  } catch (error) {
    console.log({ error });
  }
};

sponsor_monthly_code();
