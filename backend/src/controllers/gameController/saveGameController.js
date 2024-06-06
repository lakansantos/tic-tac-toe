const saveGameController = (req, res) => {
  const { test } = req.body;

  return res.status(200).json({
    message: test,
  });
};

export default saveGameController;
