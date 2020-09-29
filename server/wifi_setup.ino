// AP mode password
const char WiFiAPPSK[] = "";

const char *ssid;
const char *password;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate
//const char* fingerprint = "35 85 74 EF 67 35 A7 CE 40 69 50 F3 C0 F6 80 CF 80 3B 2E 19";
//const char* fingerprint = "5f b7 ee 06 33 e2 59 db ad 0c 4c 9a e6 d3 8f 1a 61 c7 dc 25";
const char *fingerprint = "5f f1 60 31 09 04 3e f2 90 d2 b0 8a 50 38 04 e8 37 9f bc 76";

void wifi_setup()
{
  if (apMode)
  {
    WiFi.mode(WIFI_AP);

    // Do a little work to get a unique-ish name. Append the
    // last two bytes of the MAC (HEX'd) to "Thing-":
    uint8_t mac[WL_MAC_ADDR_LENGTH];
    WiFi.softAPmacAddress(mac);
    String macID = String(mac[WL_MAC_ADDR_LENGTH - 2], HEX) +
                   String(mac[WL_MAC_ADDR_LENGTH - 1], HEX);
    macID.toUpperCase();
    //    String AP_NameString = "Thousand Petal Lotus " + macID;
    //    String AP_NameString = "Bed " + macID;
    //    String AP_NameString = "First Floor " + macID;
    String AP_NameString = String(MY_NAME) + " " + macID;

    char AP_NameChar[AP_NameString.length() + 1];
    memset(AP_NameChar, 0, AP_NameString.length() + 1);

    for (int i = 0; i < AP_NameString.length(); i++)
      AP_NameChar[i] = AP_NameString.charAt(i);

    WiFi.softAP(AP_NameChar, WiFiAPPSK);

    Serial.printf("Connect to Wi-Fi access point: %s\n", AP_NameChar);
    // Serial.println("and open http://192.168.4.1 in your browser");
  }
  else
  {
    Serial.begin(115200);
    WiFiManager wifiManager;
    Serial.println("Connecting.....");
    wifiManager.autoConnect("GlowControl");
    Serial.println("Connected");
    ssid = WiFi.SSID().c_str();
    password = WiFi.psk().c_str();
    WiFi.mode(WIFI_STA);
    Serial.printf("Connecting to %s\n", ssid);
    if (String(WiFi.SSID()) != String(ssid))
    {
      WiFi.begin(ssid, password);
    }
  }
}
