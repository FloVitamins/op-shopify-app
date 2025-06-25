import {
  reactExtension,
  Banner,
  BlockStack,
  TextField,
  Checkbox,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
  useAttributes,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";
import { parsePhoneNumber } from "libphonenumber-js";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();
  const [phoneError, setPhoneError] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");

  const attributes = useAttributes();
  // useEffect(() => {
  //   applyAttributeChange({
  //     type: "updateAttribute",
  //     key: "testKey",
  //     value: "testValue",
  //   });
  // }, []);
  console.log("Cart attributes:", attributes);
  // 2. Check instructions for feature availability, see https://shopify/ui-extensions-react/checkout for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="checkout-ui" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // Check if testKey attribute has correct value
  const testKeyAttribute = attributes?.find(
    (attr) => attr.key === "_sms_checkout_test",
  );
  if (!testKeyAttribute || testKeyAttribute.value !== "_sms_checkout_test") {
    return null;
  }

  // 3. Render a UI
  return (
    <BlockStack>
      <TextField
        label="Phone Number"
        onChange={onPhoneNumberChange}
        error={phoneError}
        value={formattedPhone}
      />
      <Checkbox onChange={onConsentChange}>
        {translate("iConsentToMarketing")}
      </Checkbox>
    </BlockStack>
  );

  async function onPhoneNumberChange(value) {
    try {
      // Try to parse the phone number
      const parsed = parsePhoneNumber(value, "US");

      if (parsed?.isValid()) {
        // Format for display (national format)
        setFormattedPhone(parsed.formatNational());
        setPhoneError("");

        // Store E.164 format in cart
        await applyAttributeChange({
          key: "customerPhoneNumber",
          type: "updateAttribute",
          value: parsed.format("E.164"),
        });
      } else {
        setFormattedPhone(value);
        setPhoneError("Please enter a valid phone number");
      }
    } catch (error) {
      setFormattedPhone(value);
      setPhoneError("Please enter a valid phone number");
    }
  }

  async function onConsentChange(isChecked) {
    await applyAttributeChange({
      key: "marketingConsent",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
  }
}
