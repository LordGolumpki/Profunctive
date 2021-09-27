const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error("string.escapeHTML", { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.boardNameSchema = Joi.object({
    newBoardName: Joi.string().escapeHTML().allow("")
});

module.exports.noteSchema = Joi.object({
    note: Joi.string().escapeHTML().allow(""),
    snippets: Joi.array().items(Joi.string().escapeHTML().allow(""))
});