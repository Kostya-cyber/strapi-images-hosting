"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  findImagesAuthUser: async (ctx) => {
    const id = ctx.state.user._id;
    let entities = await strapi
      .query("image")
      .find({ users_permissions_user: id });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.image })
    );
  },
  delete: async (ctx) => {
    const userId = ctx.state.user._id;
    const imageId = ctx.params.id;
    const {
      users_permissions_user: { _id: authorId },
    } = await strapi.query("image").findOne({ id: imageId });
    if (JSON.stringify(userId) === JSON.stringify(authorId)) {
      const entity = await strapi.query("image").delete({ id: imageId });
      return entity;
    }
    ctx.response.status = 403;
  },
};
