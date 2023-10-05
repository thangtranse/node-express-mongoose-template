/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */

module.exports = function softDeletePlugin(schema, _options) {
  schema.add({
    deletedAt: {
      type: Date,
      default: null,
    },
  });

  schema.index({ deletedAt: 1 });

  schema.pre(/^(find|count).*/, function (next) {
    if (this.getFilter().deletedAt) {
      return next();
    }
    this.setQuery({ ...this.getFilter(), deletedAt: null });
    next();
  });

  schema.pre("count", function (next) {
    if (this.getFilter().deletedAt) {
      return next();
    }
    this.setQuery({ ...this.getFilter(), deletedAt: null });
    next();
  });

  schema.pre("remove", function () {
    this.update({}, { deletedAt: Date.now() });
  });

  schema.static("findDeleted", async function () {
    return this.find({ deletedAt: { $ne: null } });
  });

  schema.static("restore", async function (query) {
    const updatedQuery = {
      ...query,
      deletedAt: true,
    };
    const deletedTemplates = await this.find(updatedQuery);
    if (!deletedTemplates) {
      return Error("Not found");
    }

    let restored = 0;

    for (const deletedTemplate of deletedTemplates) {
      if (deletedTemplate.deletedAt) {
        deletedTemplate.deletedAt = null;
        await deletedTemplate
          .save()
          .then(() => restored++)
          .catch((error) => {
            throw new Error(`${error.name} ${error.message}`);
          });
      }
    }

    return { restored };
  });

  schema.static("softDelete", async function (query, options) {
    const templates = await this.find(query);
    if (!templates || templates.length === 0) {
      throw Error("Element not found");
    }
    let deleted = 0;

    for (const template of templates) {
      if (!template.isDeleted) {
        template.$isDeleted(true);
        template.isDeleted = true;
        template.deletedAt = new Date();
        await template
          .save(options)
          .then(() => deleted++)
          .catch((error) => {
            throw new Error(`${error.name} ${error.message}`);
          });
      }
    }
    return { deleted };
  });
};
