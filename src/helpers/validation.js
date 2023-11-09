const Joi = require("joi");

const paginationValidate = (data) => {
  const schemaValidate = Joi.object({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).required(),
    sort: Joi.string(),
  });
  return schemaValidate.validate(data);
};

const userValidate = (data) => {
  const schemaValidate = Joi.object({
    email: Joi.string()
      .pattern(/gmail.com/)
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return schemaValidate.validate(data);
};

const loginWithGoogleValidate = (data) => {
  const schemaValidate = Joi.object({
    clientId: Joi.string().equal(process.env.GOOGLE_CLIENT_ID).required(),
    credential: Joi.string().required(),
    select_by: Joi.string().required(),
  });
  return schemaValidate.validate(data);
};

const crmCustomerValidate = (data) => {
  const schemaValidate = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    name: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^(0|\+84)(3[2-9]|5[689]|7[0|6-9]|8[1-9]|9[0-9])(\d{7})$/)
      .required(),
    email: Joi.string().required(),
    address: Joi.string(),
    note: Joi.string(),
    channel: Joi.string(),
  });
  return schemaValidate.validate(data);
};

const postValidate = (data) => {
  const schemaValidate = Joi.object({
    title: Joi.string().required().max(100).trim(),
    description: Joi.string().trim(),
    content: Joi.object(),
    draft: Joi.boolean(),
    tags: Joi.array().items(Joi.string().trim()),
  });
  return schemaValidate.validate(data);
};

module.exports = {
  postValidate,
  crmCustomerValidate,
  userValidate,
  loginWithGoogleValidate,
  paginationValidate,
};
