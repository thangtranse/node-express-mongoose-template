const RoleModel = require("../models/role.model");
const _rolesMock = require("../_mock/roles");

module.exports = {
  initalData: async (req, res, next) => {
    const session = await RoleModel.startSession();
    session.startTransaction();
    try {
      const opts = { session };
      for (let i = 0; i < _rolesMock.length; i++) {
        await RoleModel.findOneAndUpdate(
          { scope: _rolesMock[i].scope },
          _rolesMock[i],
          { upsert: true, new: true, setDefaultsOnInsert: true , ...opts}
        );
        // await RoleModel(_rolesMock[i]).save(opts);
      }
      await session.commitTransaction();
      session.endSession();
      return res.json({
        status: true,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error);
    }
  },
};
