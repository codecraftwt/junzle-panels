const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\-.\s\d]{7,20}$/;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateLead(body) {
  const errors = {};

  const firstName = cleanString(body.firstName);
  const lastName = cleanString(body.lastName);
  const email = cleanString(body.email).toLowerCase();
  const phone = cleanString(body.phone);
  const clubName = cleanString(body.clubName);
  const message = cleanString(body.message);

  if (!firstName) errors.firstName = "First name is required.";
  else if (firstName.length > 100) errors.firstName = "First name must be under 100 characters.";

  if (!lastName) errors.lastName = "Last name is required.";
  else if (lastName.length > 100) errors.lastName = "Last name must be under 100 characters.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE_REGEX.test(phone)) errors.phone = "Please enter a valid phone number.";

  if (!clubName) errors.clubName = "Club / organization name is required.";
  else if (clubName.length > 200) errors.clubName = "Club name must be under 200 characters.";

  if (message.length > 2000) errors.message = "Message must be under 2000 characters.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { firstName, lastName, email, phone, clubName, message },
  };
}

export { validateLead };
